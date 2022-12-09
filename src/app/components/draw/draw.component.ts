import { Component, HostListener, OnInit, ViewChildren,QueryList,OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Input } from '@syncfusion/ej2-angular-inputs';
import getStroke from 'perfect-freehand';
import { DragHandlerService } from 'src/app/services/drag-handler.service';
import { CircleComponent } from '../shapes/circle/circle.component';

import {Subscription,fromEvent} from 'rxjs'
import {tap,filter} from 'rxjs/operators'
import { ResizeBorderComponent } from '../resize-border/resize-border.component';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit {
  mouseX!: number;
  mouseY!: number;
  isMouseDown: boolean = false;
  points: {x:number, y:number}[] = [];
  pathData: string = '';
  sheetCoors = {x: 0, y: 300};
  container!:any;
  constructor(public myService: DragHandlerService) { 
  }

  ngAfterViewInit(): void {
  }

  @HostListener('mousemove', ['$event'])
  recordMouse(e: MouseEvent){
    this.mouseX = this.myService.mouseX;
    this.mouseY = this.myService.mouseY;
    /* console.log('x: ', this.mouseX, ' y: ', this.mouseY) */
    if(this.myService.isMouseDown){
    /*   console.log(this.points); */
      this.points.push({x: this.myService.mouseX, y: this.myService.mouseY - this.sheetCoors.y});
      const outlinePoints = getStroke(this.points)
      this.pathData = this.getSvgPathFromStroke(outlinePoints)
    }
  }
  @HostListener('mousedown', ['$event'])
  recordMouseDown(){
    this.isMouseDown = this.myService.isMouseDown;
  }
  @HostListener('mouseup', ['$event'])
  recordMouseup(){
    this.isMouseDown = this.myService.isMouseDown;
  }


  average(a: number, b: number){
    return (a + b) / 2;
  }

  getSvgPathFromStroke(points: any[], closed = true) {
    //console.log(points);
    const len = points.length

    if (len < 4) {
      return ``
    }

    let a = points[0]
    let b = points[1]
    const c = points[2]

    let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(2)},${b[1].toFixed(2)}
     ${this.average(b[0], c[0]).toFixed(2)},${this.average(b[1], c[1]).toFixed(2)} T`

    for (let i = 2, max = len - 1; i < max; i++) {
      a = points[i]
      b = points[i + 1]
      result += `${this.average(a[0], b[0]).toFixed(2)},${this.average(a[1], b[1]).toFixed(2)} `
    }

    if (closed) {
      result += 'Z'
    }

    return result 
  }

}