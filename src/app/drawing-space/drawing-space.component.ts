import {Component, HostListener, OnInit} from '@angular/core';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {KonvaService} from "../Service/konva.service";
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Circle } from 'konva/lib/shapes/Circle';
import Konva from "konva";
import {ShapesService} from "../Service/shapes.service";
import {DtoAdapterService} from "../Service/dto-adapter.service";
import {ShapeFactory} from "./ShapeFactory";
import {Dto} from "./dto";

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

  fillColor: string = '#000000';
  strokeColor: string = '#000000';
  selectedID: string = 's';

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
    private dtoAdapter: DtoAdapterService
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

    let shapeFactory: ShapeFactory = new ShapeFactory(this.konvaService, this.reqService, this.dtoAdapter);
    let newShape = shapeFactory.createShape(shape);

    newShape.on('mouseup', (e: any) => {
      this.dtoAdapter.postMove(newShape.toObject(), newShape.getClassName());
      console.log(newShape);
    });

    newShape.on('mousedown', (e: any) => {
      this.selectedID = newShape.id;
    });

    newShape.name('shape')

    this.layer.add(this.transformer);
    this.transformer.nodes([newShape]);
    let dto:Dto = new Dto;
    this.shapes.push(newShape);
    this.layer.add(newShape);
    this.stage.add(this.layer);

  }

  undo(){
    this.reqService.undo().subscribe((data => {
      if(data.commandType == 'draw'){
        this.stage.find(data.id)[0].destroy();
        this.transformer.nodes([]);
      }else if(data.commandType == 'move'){
        this.stage.find(data.id)[0]._setAttr('x', data.x);
        this.stage.find(data.id)[0]._setAttr('y', data.y);
      }

      console.log("data: ", data);
    }))
  }

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
    const control_container = document.getElementById('control_container');

    this.stage.on('mousedown touchstart', (e: any) => {
      // isFreeHand = true;
      let pos = component.stage.getPointerPosition();


      // select this shape
      if(e.target === this.stage) {
        this.transformer.nodes([])

        isFreeHand = true
        freeHnad = component.eraser ? component.konvaService.erase(pos, 30) :
          component.konvaService.brush(pos, component.brushSize, component.fillColor, component.brushOpacity);
        component.shapes.push(freeHnad);
        component.layer.add(freeHnad);
        control_container?.classList.add('hide_palette');
      }
      if(e.target.hasName('shape')){
        console.log(this.selectedID);
        isFreeHand = false;
        this.transformer.nodes([e.target])
      }
      if (!component.selectedButton['brush'] && !component.eraser) {
        return;
      }
    });

    this.stage.on('mouseup touchend', function () {
      isFreeHand = false;
      control_container?.classList.remove('hide_palette');
    });

    this.stage.on('mousemove touchmove', function (e:any) {
      if (!isFreeHand) {
        return;
      }
      e.evt.preventDefault();
      const position: any = component.stage.getPointerPosition();
      const newPoints = freeHnad.points().concat([position.x, position.y]);
      freeHnad.points(newPoints);
      component.layer.batchDraw();
    });
  }

  clearBoard(): void {
    this.layer.destroyChildren();
    this.layer.draw();
  }

  saveAsImage(): void {
    const dataUrl: string = this.stage.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 1,
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
