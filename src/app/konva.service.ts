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
  borderColor: string = 'green'

  circle(){
    return new Konva.Circle({
      radius: 50 * Math.random() + 40,
      stroke: this.borderColor,
      fill: this.fillColor,
      x: 300 * Math.random() + 200,
      y: 500 * Math.random() + 300
    });
  }

  rect(){
    return new Konva.Rect({
      width: 50 * Math.random() + 40,
      height: 50 * Math.random() + 40,
      stroke: this.borderColor,
      fill: this.fillColor,
      x: 300 * Math.random() + 200 * Math.random(),
      y: 500 * Math.random() + 300 * Math.random()
    });
  }

  square(){
    return new Konva.Line({
      points: [10, 10, 100, 100, 500, 0],
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 5,
      closed: true,
      x: 300 * Math.random() + 200 * Math.random(),
      y: 500 * Math.random() + 300 * Math.random()
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
