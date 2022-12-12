import { Injectable } from '@angular/core';
import { Line } from 'konva/lib/shapes/Line';
import Konva from "konva";

@Injectable({
  providedIn: 'root'
})

export class KonvaService {
  brushWidth: number = 5;

  fillColor: string = 'red'
  strokeColor: string = 'green'
  strokeWidth: number = 5;

  circle(){
    return new Konva.Circle({
      radius: 50 * Math.random() + 40,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      fill: this.fillColor,
      x: window.innerHeight * Math.random(),
      y: window.innerHeight * Math.random(),
      draggable: true,
      name: 'shape',
      id:'s'
    });
  }

  rect(){
    return new Konva.Rect({
      width: 50 * Math.random() + 40,
      height: 50 * Math.random() + 40,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      fill: this.fillColor,
      x: window.innerHeight * Math.random(),
      y: window.innerHeight * Math.random(),
      name: 'shape',
      draggable: true
    });
  }

  square(){
    let w = Math.random();
    return new Konva.Rect({
      width: 50 * w + 40,
      height: 50 * w + 40,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      fill: this.fillColor,
      x: window.innerHeight * Math.random(),
      y: window.innerHeight * Math.random(),
      name: 'shape',
      draggable: true
    });
  }

  triangle(){
    return new Konva.Line({
      points: [0, 0, -50 * Math.sqrt(3),100, 50 * Math.sqrt(3), 100],
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      closed: true,
      x: window.innerHeight * Math.random(),
      y: window.innerHeight * Math.random(),
      name: 'shape',
      draggable: true
    });
  }

  ellipse(){
    return new Konva.Ellipse({
      radiusX: 100,
      radiusY: 50,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      x: window.innerHeight * Math.random(),
      y: window.innerHeight * Math.random(),
      name: 'shape',
      draggable: true
    });
  }

  text(){
    return new Konva.Text({
      text: 'Write Here !',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: this.fillColor,
      x: window.innerHeight * Math.random(),
      y: window.innerHeight * Math.random(),
      name: 'shape',
      draggable: true
    });
  }

  brush(pos: any) {
    return new Line({
      stroke: this.fillColor,
      strokeWidth: this.brushWidth,
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      lineJoin: 'round',
      name: 'shape',
      tension: 0
    });
  }

  erase(pos: any, size: any) {
    return new Line({
      stroke: '#ffffff',
      strokeWidth: size,
      globalCompositeOperation: 'destination-out',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      name: 'shape',
      lineJoin: 'round'
    });
  }

}
