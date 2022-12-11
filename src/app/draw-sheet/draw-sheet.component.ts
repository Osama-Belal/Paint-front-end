import {Component, HostListener, OnInit} from '@angular/core';

import { KonvaService } from '../konva.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Transformer } from 'konva/lib/shapes/Transformer';
import Konva from "konva";

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

  selectedButton: any = {
    'line': false,
    'eraser': false
  }
  eraser: boolean = false;
  brushSize: number = 3;
  brushOpacity: number = 1.0;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private konvaService: KonvaService
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
    let created: any;
    this.konvaService.fillColor = this.fillColor;
    this.konvaService.strokeColor = this.strokeColor;
    switch (shape){
      case 'circle': created = this.konvaService.circle();break;
      case 'rect': created = this.konvaService.rect();break;
      case 'triangle': created = this.konvaService.triangle();break;
      case 'ellipse': created = this.konvaService.ellipse();break;
      case 'wedge': created = this.konvaService.wedge();break;
      case 'text': created = this.konvaService.text();break;
    }
    created.name('shape')
    this.shapes.push(created);
    this.transformer.nodes([created]);
    this.layer.add(created);
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
    const control_container = document.getElementById('control_container');

    this.stage.on('mousedown touchstart', (e: any) => {
      isFreeHand = true;
      let pos = component.stage.getPointerPosition();


      // select this shape
      if(e.target === this.stage) {
        this.transformer.nodes([])
      }
      if(e.target.hasName('shape')){
        isFreeHand = false;
        this.transformer.nodes([e.target])

      }
      if (!component.selectedButton['brush'] && !component.eraser) {
        return;
      }

      freeHnad = component.eraser ? component.konvaService.erase(pos, 30) :
        component.konvaService.brush(pos, component.brushSize, component.fillColor, component.brushOpacity);
      component.shapes.push(freeHnad);
      component.layer.add(freeHnad);
      control_container?.classList.add('hide_palette');
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

  undo(): void {
    const removedShape = this.shapes.pop();

    this.transformers.forEach(t => {
      t.detach();
    });

    if (removedShape) {
      removedShape.remove();
    }

    this.layer.draw();
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

}
