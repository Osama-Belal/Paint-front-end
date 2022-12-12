import { Injectable } from '@angular/core';
import { Line } from 'konva/lib/shapes/Line';
import Konva from "konva";

@Injectable({
  providedIn: 'root'
})


export class KonvaService {
  brushSize!: number;
  brushOpacity!: number;
  fillColor: string = 'red'
  strokeColor: string = 'green'

  circle(){
    return new Konva.Circle({
      radius: 50 * Math.random() + 40,
      stroke: this.strokeColor,
      strokeWidth: 5,
      fill: this.fillColor,
      x: window.innerHeight / 2,
      y: window.innerHeight / 2,
      draggable: true,
      id:'s'
    });
  }

  rect(){
    return new Konva.Rect({
      width: 50 * Math.random() + 40,
      height: 50 * Math.random() + 40,
      stroke: this.strokeColor,
      fill: this.fillColor,
      x: window.innerHeight / 2,
      y: window.innerHeight / 2,
      draggable: true
    });
  }

  square(){
    let w = Math.random();
    return new Konva.Rect({
      width: 50 * w + 40,
      height: 50 * w + 40,
      stroke: this.strokeColor,
      fill: this.fillColor,
      x: window.innerHeight / 2,
      y: window.innerHeight / 2,
      draggable: true
    });
  }

  triangle(){
    return new Konva.Line({
      points: [0, 0, -50 * Math.sqrt(3),100, 50 * Math.sqrt(3), 100],
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: 5,
      closed: true,
      x: window.innerHeight / 2,
      y: window.innerHeight / 2,
      draggable: true
    });
  }

  ellipse(){
    return new Konva.Ellipse({
      radiusX: 100,
      radiusY: 50,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: 4,
      x: window.innerHeight / 2,
      y: window.innerHeight / 2,
      draggable: true
    });
  }

  text(){
    return new Konva.Text({
      text: 'Write Here !',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: this.fillColor,
      x: window.innerHeight / 2,
      y: window.innerHeight / 2,
      draggable: true
    });
  }

  brush(pos: any, size: any, color: string, opacity: number) {
    this.brushSize = size;
    this.brushOpacity = opacity;
    return new Line({
      stroke: color,
      strokeWidth: size,
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      lineJoin: 'round',
      opacity: opacity,
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
      lineJoin: 'round'
    });
  }

}
