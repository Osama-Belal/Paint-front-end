import { Component, HostListener, OnInit, ViewChildren,QueryList,OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Input } from '@syncfusion/ej2-angular-inputs';
import getStroke from 'perfect-freehand';
import { DragHandlerService } from 'src/app/services/drag-handler.service';
import { CircleComponent } from '../shapes/circle/circle.component';

import {Subscription,fromEvent} from 'rxjs'
import {tap,filter} from 'rxjs/operators'
import { ResizeBorderComponent } from '../resize-border/resize-border.component';
import Konva from 'konva';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  mouseX!: number;
  mouseY!: number;
  isMouseDown: boolean = false;

  constructor(private elRef: ElementRef) { }
  stage!:Konva.Stage;
  layer!:Konva.Layer;
  circle!:Konva.Circle;

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      container:"container",
      width:this.elRef.nativeElement.offsetWidth,
      height:800
    })
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
    let transformer = new Konva.Transformer()
    this.layer.add(transformer)
    let circle = new Konva.Circle({
        x:50,
        y:50,
        radius:20,
        fill: "green",
        draggable:true,
        id:"s2"
    })
    transformer.nodes([circle])
    this.layer.add(circle)
    console.log(circle.toObject())
    this.circle = circle
  }
  onclick(){
    //this.http.post("http://localhost:8080/get",this.circle.toObject()).subscribe()
  }

  @HostListener('mousemove', ['$event'])
  recordMouse(e: MouseEvent){
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

  }
  @HostListener('mousedown', ['$event'])
  recordMouseDown(){
    this.isMouseDown = true;
  }
  @HostListener('mouseup', ['$event'])
  recordMouseup(){
    this.isMouseDown = false;
  }

}