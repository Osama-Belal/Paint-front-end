import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';

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
import { EventsService } from '../Service/events.service';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.css'],
})

export class DrawingSpaceComponent implements OnInit{
  stage!: Stage;
  layer!: Layer;
  transformer!: Transformer;
  shapes: any = [];
  selectedID: string = 's';

  fillColor: string = '#1792e0';
  strokeColor: string = '#e1c019';

  strokeWidth = 5;
  brushWidth = 10;
  brushOp = 1;
  eraserWidth = 10;

  x1: any; y1: any
  x2: any; y2: any

  oldContainer: {
    oldX: number,
    oldY: number
  } = {oldX: 2, oldY: 2}

  selectedButton: any = {
    'circle': false,
    'rect': false,
    'square': false,
    'triangle': false,
    'ellipse': false,
    'line': false,
    'brush': false,
    'eraser': false
  }

  constructor(
    private _bottomSheet: MatBottomSheet,
    private konvaService: KonvaService,
    private reqService: ShapesService,
    private dtoAdapter: DtoAdapterService,
    private shapeFactory: ShapeFactoryService,
    private eventService: EventsService
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
    this.eventService.stage = this.stage
    this.addLineListeners();
  }

  // ----------------------------------------- Main Actions -----------------------------
  save(){
    let myObj = {
      stage: this.stage,
      path: 'saved.json',
      fileType: 'json',
    }
    this.reqService.postSave(this.stage, myObj);
  }

  load(){
    this.reqService.getLoad('saved.json').subscribe((data => {
      this.stage.destroy()
      this.layer.destroy()
      this.shapes = [];

      this.stage = new Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
      });

      this.stage = Konva.Node.create(data, 'container');
      console.log('before', this.stage);
      this.layer = new Layer();
      this.transformer = new Transformer();
      this.layer.add(this.transformer);
      this.stage.add(this.layer);
      this.addLineListeners();

      this.stage?.children?.forEach(element => {
        this.layer = element
        element.children?.forEach(shapes => {
          if(!(shapes instanceof Transformer)){
            this.setShapeEvent(shapes);

            this.layer.add(this.transformer);
            this.transformer.nodes([shapes]);

            this.shapes.push(shapes);
            this.layer.add(shapes);
            /* console.log(shapes); */
            this.stage.add(this.layer);
          }
        });
      });

    }))
  }

  download(){

          /* let blob:any = new Blob([data], { type: 'text/json; charset=utf-8' });
          const url =window.URL.createObjectURL(data);
          console.log('load called ', this.stage);
        }));; */

  }

  // ----------------------------------------- Shapes Actions -----------------------------
  setSelection(type: string) {
    this.clearSelection();
    this.selectedButton[type] = true;
    console.log(this.selectedButton)
  }

  clearSelection(){
    this.selectedButton = {
      'circle': false,
      'rect': false,
      'square': false,
      'triangle': false,
      'ellipse': false,
      'line': false,
      'brush': false,
      'eraser': false
    }
  }

  createShape(shape: string){
    this.Update();
    let newShape = this.shapeFactory.createShape(shape);

    // send post request
    this.dtoAdapter.drawShape(newShape.toObject().attrs, newShape.toObject().className).subscribe(data => {
      newShape.attrs.id = data.id;
      this.selectedID = <string>data.id;
    });

    this.setShapeEvent(newShape);

    this.layer.add(this.transformer);
    this.transformer.nodes([newShape]);

    this.shapes.push(newShape);
    this.layer.add(newShape);
    this.stage.add(this.layer);
    console.log(this.stage);
  }

  undo(){
    this.reqService.undo().subscribe((data => {
      this.setUndo(data);
    }))
  }

  redo(){
    this.reqService.redo().subscribe((data => {
      this.setRedo(data);
    }))
  }

  setUndo(data: Dto){
    if(data == null) return;

    if(data.commandType == 'draw'){
      this.layer.find('#' + data.id)[0].destroy();
      this.transformer.nodes([]);
    }else if(data.commandType == 'move'){
      this.stage.find('#'+ data.id)[0]._setAttr('x', data.x);
      this.stage.find('#'+ data.id)[0]._setAttr('y', data.y);
    }else if(data.commandType == 'delete'){
      /*  console.log('undo Delete' + data); */
      let myShape = this.dtoAdapter.fromDtoToKonva(data);
      console.log(data);
      console.log('delete undo shape', myShape);
      this.setShapeEvent(myShape);
      this.layer.add(myShape);
    }else if(data.commandType == 'resize'){
      this.layer.find('#' + data.id)[0]._setAttr('scaleX', data.scaleX)
      this.layer.find('#' + data.id)[0]._setAttr('scaleY', data.scaleY)
      this.layer.find('#' + data.id)[0]._setAttr('x', data.x)
      this.layer.find('#' + data.id)[0]._setAttr('y', data.y)
      this.layer.find('#' + data.id)[0]._setAttr('rotation', data.rotation)
      /* console.log(this.layer.find('#' + data.id)[0]) */
    }else if(data.commandType == 'recolor'){
      this.layer.find('#' + data.id)[0]._setAttr('fill', data.fill);
      this.layer.find('#' + data.id)[0]._setAttr('stroke', data.stroke);
    }else if(data.commandType == 'clone'){
      this.layer.find('#' + data.id)[0].destroy();
      this.transformer.nodes([]);

    }
  }

  setRedo(data: Dto){
    if(data == null) return;

    if(data.commandType == 'draw'){
      let myShape = this.dtoAdapter.fromDtoToKonva(data);
      this.setShapeEvent(myShape);
      this.layer.add(myShape);
    }else if(data.commandType == 'move'){
      this.stage.find('#'+ data.id)[0]._setAttr('x', data.x);
      this.stage.find('#'+ data.id)[0]._setAttr('y', data.y);
    }else if(data.commandType == 'delete'){
      this.layer.find('#' + data.id)[0].destroy();
      this.transformer.nodes([]);
    }else if(data.commandType == 'resize'){
      this.layer.find('#' + data.id)[0]._setAttr('scaleX', data.scaleX)
      this.layer.find('#' + data.id)[0]._setAttr('scaleY', data.scaleY)
      this.layer.find('#' + data.id)[0]._setAttr('x', data.x)
      this.layer.find('#' + data.id)[0]._setAttr('y', data.y)
      this.layer.find('#' + data.id)[0]._setAttr('rotation', data.rotation)
    }else if(data.commandType == 'recolor'){
      this.layer.find('#' + data.id)[0]._setAttr('fill', data.fill);
      this.layer.find('#' + data.id)[0]._setAttr('stroke', data.stroke);
    }else if(data.commandType == 'clone'){
      let myShape = this.dtoAdapter.fromDtoToKonva(data);
      this.layer.add(myShape);
      this.setShapeEvent(myShape)
    }
  }

  @HostListener('keydown.delete')
  delete(){
    let myShape = this.layer.find('#' + this.selectedID)[0];
    console.log("delete called");
    if(myShape == null)
    return;

    myShape.destroy();
    this.transformer.nodes([]);
    let dto = new Dto();
    dto.id = this.selectedID;
    this.reqService.putDelete(dto).subscribe((data => {}))
  }

  recolor(){
    let myShape = this.stage.find('#'+ this.selectedID)[0];
    myShape._setAttr('fill', this.fillColor);
    myShape._setAttr('stroke', this.strokeColor);
    myShape._setAttr('strokeWidth', this.strokeWidth);
    this.dtoAdapter.putRecolor(myShape.toObject().attrs, myShape.className);
  }

  clone(){
    console.log(this.selectedID);
    this.reqService.getClone(this.selectedID).subscribe((data => {
      let dto:Dto = data;
      let myShape = this.shapeFactory.createShape(<string>dto.className);
      myShape.attrs = dto;
      myShape.className = <string>dto.className;
      this.selectedID = <string>data.id;
      this.setShapeEvent(myShape);
      this.layer.add(myShape)
    }));
  }

  addLineListeners(): void {
    const component = this;
    let freeHand: any;
    let isFreeHand: boolean = false;

    this.stage.on('mousedown touchstart', (e: any) => {
      let position = component.stage.getPointerPosition();
      isFreeHand = this.selectedButton['brush']
                   || this.selectedButton['eraser'];
      this.hidePalette();

      if(e.target.name === 'shape'){
        isFreeHand = false;
        this.transformer.nodes([e.target])
      }

      if(e.target === this.stage) {
        this.transformer.nodes([])

        this.konvaService.x1 = this.x1 = position?.x
        this.konvaService.y1 = this.y1 = position?.y
        console.log("started at x: " + this.x1 + "and y: " + this.y1)

        this.Update();

        // Free Hand Concerns
        // Return if it's false to brush or eraser
        if(!isFreeHand) return;

        freeHand = component.selectedButton['eraser'] ?
          component.konvaService.erase(position) : component.konvaService.brush(position);
        component.shapes.push(freeHand);
        component.layer.add(freeHand);
      }
    });

    this.stage.on('mousemove touchmove',  (e:any) => {
      if (isFreeHand) {
        e.evt.preventDefault();
        const position: any = component.stage.getPointerPosition();
        const newPoints = freeHand.points().concat([position.x, position.y]);
        freeHand.points(newPoints);
        component.layer.batchDraw();
      }
    });

    this.stage.on('mouseup touchend', (e: any) => {
      let position = this.stage.getPointerPosition()
      this.konvaService.x2 = this.x2 = position?.x
      this.konvaService.y2 = this.y2 = position?.y

      // TODO creating shape when mouseup

      console.log("ended at x: " + this.x2 + "and y: " + this.y2)
      isFreeHand = false;
      this.showPalette();
    });

  }

  Update() {
    this.konvaService.fillColor = this.fillColor;
    this.konvaService.strokeColor = this.strokeColor;
    this.konvaService.strokeWidth = this.strokeWidth > 100 ? '100' : String(this.strokeWidth);
    this.konvaService.brushWidth = this.brushWidth > 100 ? '100' : String(this.brushWidth);
    this.konvaService.brushOp = this.brushOp > 100 ? '100' : String(this.brushOp);
    this.konvaService.eraserWidth = this.eraserWidth > 100 ? '100' : String(this.eraserWidth);
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

  setShapeEvent(newShape : any){
    newShape.on('mouseup', (e: any) => {
      this.dtoAdapter.putMove(newShape.toObject().attrs, newShape.getClassName());
    });

    newShape.on('mousedown', (e: any) => {
      this.selectedID = newShape.attrs.id;
      console.log('id set: ', this.selectedID);
    });

    newShape.on('transformstart', (e: any) => {
      this.oldContainer.oldX = newShape.toObject().attrs.x;
      this.oldContainer.oldY = newShape.toObject().attrs.y;
    })

    newShape.on('transformend', (e: any) =>{
      this.dtoAdapter.putResize(newShape.toObject().attrs, newShape.getClassName());
    })

    newShape.on('')

    newShape.name = 'shape';
    this.transformer.nodes([newShape])
    console.log('setShape', newShape);
  }

}
