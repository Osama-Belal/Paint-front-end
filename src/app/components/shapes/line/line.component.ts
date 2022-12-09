import { Component, OnInit } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';
import { Line } from './Line';

@Component({
  selector: '[app-line]',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent extends ShapeComponent implements OnInit {

  lines: Line[] = [
    {id: '0', x1:150, y1: 100, x2: 200, y2: 600, color: 'green'}
  ]

  deleteObject(index:number){
    this.lines.splice(index, 1);
  }

  createObject(){
    
  }

}
