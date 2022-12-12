import {Component, HostListener, OnInit} from '@angular/core';

import { KonvaService } from '../Service/konva.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Dto } from './dto';
import { ShapesService } from '../Service/shapes.service';
import { Circle } from 'konva/lib/shapes/Circle';
import { DtoAdapterService } from '../Service/dto-adapter.service';
import Konva from "konva";
import { ThisReceiver } from '@angular/compiler';
import { ShapeFactoryService } from '../Service/shape-factory.service';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.css']
})

export class DrawingSpaceComponent implements OnInit{
  stage!: Stage;
  layer!: Layer;
  transformer!: Transformer;
  shapes: any = [];
  transformers: Transformer[] = [];
  fillColor: string = '#000000';
  strokeColor: string = '#000000';
  selectedID: string = 's';
  oldContainer: {
    oldX: number,
    oldY: number
  } = {oldX: 2, oldY: 2}

  selectedButton: any = {
    'line': false,
    'eraser': false
  }
  eraser: boolean = false;
  brushSize: number = 3;
  brushOpacity: number = 1.0;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private konvaService: KonvaService,
    private reqService: ShapesService,
    private dtoAdapter: DtoAdapterService,
    private shapeFactory: ShapeFactoryService
  ) { }

  ngOnInit(): void {
    this.setSelection('brush');
    this.stage = new Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.layer = new Layer();
    this.transformer = new Transformer();
    this.layer.add(this.transformer);
    this.stage.add(this.layer);
    this.addLineListeners();
  }

  createShape(shape: string){
    this.konvaService.fillColor = this.fillColor;
    this.konvaService.strokeColor = this.strokeColor;

    let newShape = this.shapeFactory.createShape(shape);
    // send post request
    this.dtoAdapter.drawShape(newShape.toObject().attrs, newShape.toObject().className).subscribe(data => {
      newShape.attrs.id = data.id;
    });

    newShape.on('mouseup', (e: any) => {
      this.dtoAdapter.putMove(newShape.toObject().attrs, newShape.getClassName());
    });

    newShape.on('mousedown', (e: any) => {
      this.selectedID = newShape.attrs.id;
    });

    newShape.on('transformstart', (e: any) => {
      this.oldContainer.oldX = newShape.toObject().attrs.x;
      this.oldContainer.oldY = newShape.toObject().attrs.y;
    })

    newShape.on('transformend', (e: any) =>{
      this.dtoAdapter.putResize(newShape.toObject().attrs, newShape.getClassName(), this.oldContainer);
    })
    newShape.name('shape')

    this.layer.add(this.transformer);
    this.transformer.nodes([newShape]);

    this.shapes.push(newShape);
    this.layer.add(newShape);
    this.stage.add(this.layer);

  }

  // CONTINUE UNDO
  undo(){
    this.reqService.undo().subscribe((data => {
      this.setUndo(data);
    }))
  }
  // TODO HANDLE REDO
  redo(){
    this.reqService.redo().subscribe((data => {
      this.setRedo(data);
    }))
  }

  setUndo(data: Dto){
    if(data.commandType == 'draw'){
      this.layer.find('#' + data.id)[0].destroy();
      this.transformer.nodes([]);
    }else if(data.commandType == 'move'){
      this.stage.find('#'+ data.id)[0]._setAttr('x', data.x);
      this.stage.find('#'+ data.id)[0]._setAttr('y', data.y);
    }else if(data.commandType == 'delete'){
      this.layer.add(this.dtoAdapter.undoDelete(data));
    }else if(data.commandType == 'resize'){
      this.layer.find('#' + data.id)[0]._setAttr('scaleX', data.scaleX)
      this.layer.find('#' + data.id)[0]._setAttr('scaleY', data.scaleY)
      this.layer.find('#' + data.id)[0]._setAttr('x', data.x)
      this.layer.find('#' + data.id)[0]._setAttr('y', data.y)
      console.log(this.layer.find('#' + data.id)[0])
    }
  }

  setRedo(data: Dto){
    if(data.commandType == 'draw'){
      this.layer.find('#' + data.id)[0].destroy();
      this.transformer.nodes([]);
    }else if(data.commandType == 'move'){
      this.stage.find('#'+ data.id)[0]._setAttr('x', data.x);
      this.stage.find('#'+ data.id)[0]._setAttr('y', data.y);
    }else if(data.commandType == 'delete'){
      //TODO test it
      this.layer.add(this.dtoAdapter.undoDelete(data));
    }else if(data.commandType == 'resize'){

    }
  }

  delete(){
    this.layer.find('#' + this.selectedID)[0].destroy();
    this.transformer.nodes([]);
    let dto = new Dto();
    dto.id = this.selectedID;
    this.reqService.putDelete(dto).subscribe((data => {
    }))
  }
  save(){
    this.reqService.postSave(this.stage);
  }
  load(){
    this.reqService.getLoad().subscribe(data => {
      this.stage = Konva.Node.create(data, 'container');
    })
  }

  // transform
  selectionRectangle: any = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });

  clearSelection(): void {
    this.selectedButton = {
      'brush': false,
      'eraser': false
    }
  }
  // openBottomSheet(): void {
  //   const bottomSheetRef = this._bottomSheet.open(BottomSheet);
  //   bottomSheetRef.afterDismissed().subscribe((result: any) => {
  //     if (result) {
  //       this.brushSize = result.brushSize;
  //       this.brushOpacity = result.brushOpacity;
  //     }
  //   });

  // }

  setSelection(type: string) {
    this.clearSelection();
    this.selectedButton[type] = true;
    if (!(type === 'brush')) this.selectedButton['brush'] = false;
    switch (type) {
      case "eraser":
        this.eraser = true;
        break;
      case "brush":
        this.eraser = false;
        this.selectedButton['brush'] = true;
        break;
      default:
        this.eraser = false;
        break;
    }
  }

  addLineListeners(): void {
    const component = this;
    let freeHnad: any;
    let isFreeHand: boolean = false;

    this.stage.on('mousedown touchstart', (e: any) => {
      let pos = component.stage.getPointerPosition();
      this.hidePalette();
      // select this shape
      if(e.target === this.stage) {
        this.transformer.nodes([])

        isFreeHand = true
        freeHnad = component.eraser ? component.konvaService.erase(pos, 30) :
          component.konvaService.brush(pos, component.brushSize, component.fillColor, component.brushOpacity);
        component.shapes.push(freeHnad);
        component.layer.add(freeHnad);
        this.hidePalette();
      }
      if(e.target.hasName('shape')){
        isFreeHand = false;
        this.transformer.nodes([e.target])
      }
    });

    this.stage.on('mouseup touchend', (e: any) => {
      isFreeHand = false;
      this.showPalette();
    });

    this.stage.on('mousemove touchmove',  (e:any) => {
      if (!isFreeHand) {
        return;
      }
      e.evt.preventDefault();
      const position: any = component.stage.getPointerPosition();
      const newPoints = freeHnad.points().concat([position.x, position.y]);
      freeHnad.points(newPoints);
      component.layer.batchDraw();
    });

    //TODO handle with delete
    this.stage.on('keydown.delete', (e:any) => {
      if(e.evt.deleteKey){
       this.stage.find(this.selectedID)[0].destroy();
      }
    })
  }

  hidePalette(){
    const control_container_R = document.getElementById('control_container_R');
    const control_container_L = document.getElementById('control_container_L');

    control_container_R?.classList.add('hide_palette');
    control_container_L?.classList.add('hide_palette');
  }

  showPalette(){
    const control_container_R = document.getElementById('control_container_R');
    const control_container_L = document.getElementById('control_container_L');

    control_container_R?.classList.remove('hide_palette');
    control_container_L?.classList.remove('hide_palette');
  }

  clearBoard(): void {
    this.layer.destroyChildren();
    this.layer.draw();
  }

  saveAsImage(): void {
    const dataUrl: string = this.stage.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 1
    });

    const link = document.createElement('a');
    link.download = 'board_image.png';
    link.href = dataUrl;
    link.click();
  }

  getCursorClass(): string {
    if (this.selectedButton['brush'] || this.selectedButton['eraser']) {
      return 'pointer_cursor';
    } else {
      return 'default';
    }
  }

  recolor(){
    let shape = this.shapes.find();
    shape.fillColor(this.fillColor);
    shape.strokeColor(this.strokeColor)
  }

}
