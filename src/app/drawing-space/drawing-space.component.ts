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
  testSave!: string;

  fillColor: string = '#1792e0';
  strokeColor: string = '#e1c019';

  public strokeWidth = 5;
  public brushWidth = 10;

  oldContainer: {
    oldX: number,
    oldY: number
  } = {oldX: 2, oldY: 2}

  selectedButton: any = {
    'line': false,
    'eraser': false
  }
  eraser: boolean = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private konvaService: KonvaService,
    private reqService: ShapesService,
    private dtoAdapter: DtoAdapterService,
    private shapeFactory: ShapeFactoryService,
   /*  private eventService: EventsService */
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
    /*   this.eventService.stage = this.stage; */
    this.addLineListeners();
  }
  
  save(){
    /* let myObj = {
      stage: this.stage,
      path: 'saved.json',
      fileType: 'json',
    }
    console.log(this.stage);
    this.reqService.postSave(this.stage, myObj); */
    this.testSave = this.stage.toJSON();
  }
  load(){
    this.stage.destroy()
    this.layer.destroy()
    this.shapes = [];
    
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

    this.stage = Konva.Node.create(this.testSave, 'container');
    console.log('before', this.stage);
    this.stage?.children?.forEach(element => {
      element.children?.forEach(shapes => {
        if(!(shapes instanceof Transformer)){
         /*  let newShape = this.shapeFactory.createShape(<string>shapes.toObject().className);
          newShape.attrs = shapes.toObject().attrs; */
          this.setShapeEvent(shapes);
          
          this.layer.add(this.transformer);
          this.transformer.nodes([shapes]);
          
          this.shapes.push(shapes);
          this.layer.add(shapes);
          console.log(shapes);
          this.stage.add(this.layer);
        }
      });
    });
    this.layer.batchDraw();
    this.stage.batchDraw();
    console.log(this.stage);
    /* this.reqService.getLoad('saved.json').subscribe((data => {
      this.stage.destroy();
      this.stage = new Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      this.stage = Konva.Node.create(data, 'container');
      this.addLineListeners();
      console.log(this.stage);

      /* let i = this.stage.children
      if(i != null && this.stage.children != null){
        for( i of this.stage?.children){

        }

      } */
      /* let blob:any = new Blob([data], { type: 'text/json; charset=utf-8' });
      const url =window.URL.createObjectURL(data);
      console.log('load called ', this.stage);
    }));; */
  }
  download(){
    
  }

  
  
  createShape(shape: string){
    this.setColors();
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
    }else if(data.commandType == 'recolor'){
      this.layer.find('#' + data.id)[0]._setAttr('fill', data.fill);
      this.layer.find('#' + data.id)[0]._setAttr('stroke', data.stroke);
    }else if(data.commandType == 'clone'){
      let myShape = this.dtoAdapter.fromDtoToKonva(data);
      this.layer.add(myShape);
      this.setShapeEvent(myShape)
    }
  }
  
  delete(){
    let myShape = this.layer.find('#' + this.selectedID)[0];
    /*  console.log(myShape); */
    if(myShape == null)
    return;
    
    myShape.destroy();
    this.transformer.nodes([]);
    let dto = new Dto();
    dto.id = this.selectedID;
    this.reqService.putDelete(dto).subscribe((data => {
    }))
  }
  
  recolor(){
    let myShape = this.stage.find('#'+ this.selectedID)[0];
    myShape._setAttr('fill', this.fillColor);
    myShape._setAttr('stroke', this.strokeColor);
    this.dtoAdapter.putRecolor(myShape.toObject().attrs, myShape.className);
  }
  
  clone(){
    console.log(this.selectedID);
    this.dtoAdapter.getClone(this.selectedID).subscribe((data => {
      let dto:Dto = data;
      let myShape = this.shapeFactory.createShape(<string>dto.className);
      myShape.attrs = dto;
      myShape.className = <string>dto.className;
      this.selectedID = <string>data.id;
      this.setShapeEvent(myShape);
      this.layer.add(myShape)
    })); 
  }
  
  clearSelection(): void {
    this.selectedButton = {
      'brush': false,
      'eraser': false
    }
  }
  
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
    let freeHand: any;
    let isFreeHand: boolean = false;

    this.stage.on('mousedown touchstart', (e: any) => {
      let pos = component.stage.getPointerPosition();
      this.hidePalette();

      if(e.target === this.stage) {
        this.transformer.nodes([])

        isFreeHand = true
        this.setColors();
        freeHand = component.eraser ? component.konvaService.erase(pos, 30) :
          component.konvaService.brush(pos);
        component.shapes.push(freeHand);
        component.layer.add(freeHand);
        this.hidePalette();
      }
      if(e.target.name === 'shape'){
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
      const newPoints = freeHand.points().concat([position.x, position.y]);
      freeHand.points(newPoints);
      component.layer.batchDraw();
    });

    //TODO handle with delete
    this.stage.on('keydown.delete', (e:any) => {
      if(e.evt.deleteKey){
       this.stage.find(this.selectedID)[0].destroy();
      }
    })
  }

  setColors() {
    this.konvaService.fillColor = this.fillColor;
    this.konvaService.strokeColor = this.strokeColor;
    this.konvaService.strokeWidth = this.strokeWidth > 100 ? '100' : String(this.strokeWidth);
    this.konvaService.brushWidth = this.brushWidth > 100 ? '100' : String(this.brushWidth);
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

  getCursorClass(): string {
    if (this.selectedButton['brush'] || this.selectedButton['eraser']) {
      return 'pointer_cursor';
    } else {
      return 'default';
    }
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
      this.dtoAdapter.putResize(newShape.toObject().attrs, newShape.getClassName(), this.oldContainer);
    })
    newShape.name = 'shape';
    this.transformer.nodes([newShape])
    console.log('setShape', newShape);
  }


}
