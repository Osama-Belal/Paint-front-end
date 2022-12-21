import { Injectable } from '@angular/core';
import { Line } from 'konva/lib/shapes/Line';
import Konva from "konva";

@Injectable({
  providedIn: 'root'
})

export class KonvaService {
  fillColor: string = 'red'
  strokeColor: string = 'green'

  strokeWidth: string = '5';
  brushWidth: string = '10';
  brushOp: string = '1';
  eraserWidth: string = '10';

  x1: any = window.innerWidth / 4
  y1: any = window.innerHeight / 4
  x2: any = window.innerWidth / 2
  y2: any = window.innerHeight / 2

  circle(){
    return new Konva.Circle({
      radius: Math.sqrt((this.x1 - this.x2)*(this.x1 - this.x2) + (this.y1 - this.y2)*(this.y1 - this.y2)) / 2,
      stroke: this.strokeColor,
      strokeWidth: Number(this.strokeWidth),
      fill: this.fillColor,
      x: (this.x1 + this.x2) / 2,
      y: (this.y1 + this.y2) / 2,
      draggable: true,
      name: 'shape',
      id:'s'
    });
  }

  rect(){
    return new Konva.Rect({
      width: Math.abs(this.x2 - this.x1),
      height: Math.abs(this.y2 - this.y1),
      stroke: this.strokeColor,
      strokeWidth: Number(this.strokeWidth),
      fill: this.fillColor,
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2),
      name: 'shape',
      draggable: true
    });
  }

  square(){
    return new Konva.Rect({
      width: Math.max(Math.abs(this.y1 - this.y2), Math.abs(this.x1 - this.x2)),
      height: Math.max(Math.abs(this.y1 - this.y2), Math.abs(this.x1 - this.x2)),
      stroke: this.strokeColor,
      strokeWidth: Number(this.strokeWidth),
      fill: this.fillColor,
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2),
      name: 'shape',
      draggable: true
    });
  }

  triangle(){
    return new Konva.Line({
      points: [(this.x1 + this.x2) / 2, this.y1, this.x1, this.y2, this.x2, this.y2],
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: Number(this.strokeWidth),
      closed: true,
      x: 0,
      y: 0,
      name: 'shape',
      draggable: true
    });
  }

  ellipse(){
    return new Konva.Ellipse({
      radiusX: Math.abs(this.x1 - this.x2) / 2,
      radiusY: Math.abs(this.y1 - this.y2) / 2,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: Number(this.strokeWidth),
      x: (this.x1 + this.x2) / 2,
      y: (this.y1 + this.y2) / 2,
      name: 'shape',
      draggable: true
    });
  }

  line(){
    return new Konva.Line({
      points: [this.x1, this.y1, this.x2, this.y2],
      stroke: this.strokeColor,
      fill: this.fillColor,
      strokeWidth: Number(this.strokeWidth),
      lineCap: 'round',
      lineJoin: 'round',
      name: 'shape',
      draggable: true
    });
  }

  brush(pos: any) {
    return new Line({
      stroke: this.fillColor,
      strokeWidth: Number(this.brushWidth),
      opacity: Number(this.brushOp),
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      lineJoin: 'round',
      name: 'shape',
      tension: 0
    });
  }

  erase(pos: any) {
    return new Line({
      stroke: '#ffffff',
      strokeWidth: Number(this.eraserWidth),
      globalCompositeOperation: 'destination-out',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      name: 'shape',
      lineJoin: 'round'
    });
  }

}
