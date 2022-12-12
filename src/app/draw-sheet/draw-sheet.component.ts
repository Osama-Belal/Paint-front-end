import {Component, HostListener, OnInit} from '@angular/core';

import { KonvaService } from '../services/konva.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Dto } from './dto';
import { ShapesService } from '../services/shapes.service';
import { Circle } from 'konva/lib/shapes/Circle';
import { DtoAdapterService } from '../services/dto-adapter.service';
import Konva from "konva";
import { ThisReceiver } from '@angular/compiler';
import { ShapeFactoryService } from '../services/shape-factory.service';

@Component({
  selector: 'app-draw-sheet',
  templateUrl: './draw-sheet.component.html',
  styleUrls: ['./draw-sheet.component.css']
})




export class DrawSheetComponent implements OnInit{
  stage!: any;
  layer!: any;
  transformer : any;
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

    this.stage.on('mousedown touchstart', (e:any) => {
      if(e.target === this.stage) {
        this.transformer.nodes([])
      }
      if(e.target.hasName('shape')){
        this.transformer.nodes([e.target])
      }
    });
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
    let lastLine: any;
    let isPaint: boolean = false;
    const control_container = document.getElementById('control_container');

    this.stage.on('mousedown touchstart', function () {
      if (!component.selectedButton['brush'] && !component.eraser) {
        return;
      }
      isPaint = true;
      let pos = component.stage.getPointerPosition();
      lastLine = component.eraser ? component.konvaService.erase(pos, 30) : component.konvaService.brush(pos, component.brushSize, component.fillColor, component.brushOpacity);
      component.shapes.push(lastLine);
      component.layer.add(lastLine);
      control_container?.classList.add('hide_palette');
    });

    this.stage.on('mouseup touchend', function () {
      isPaint = false;
      control_container?.classList.remove('hide_palette');
    });

    this.stage.on('mousemove touchmove', function (e:any) {
      if (!isPaint) {
        return;
      }
      e.evt.preventDefault();
      const position: any = component.stage.getPointerPosition();
      const newPoints = lastLine.points().concat([position.x, position.y]);
      lastLine.points(newPoints);
      component.layer.batchDraw();
    });

    //TODO handle with delete
    this.stage.on('keydown.delete', (e:any) => {
      if(e.evt.deleteKey){
       this.stage.find(this.selectedID)[0].destroy();
      }
    })
  }

 /*  undo(): void {
    const removedShape = this.shapes.pop();

    this.transformers.forEach(t => {
      t.detach();
    });

    if (removedShape) {
      removedShape.remove();
    }

    this.layer.draw();
  } */

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

}
