import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, Input, OnInit } from '@angular/core';
import { DragHandlerService } from 'src/app/services/drag-handler.service';
import { ShapeComponent } from '../shape/shape.component';
import { Rectangle } from './rectangle';

@Component({
  selector: '[app-rectangle]',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent extends ShapeComponent implements OnInit  {

  rectangles: Rectangle[] = [
    {id:0, x: 50, y: 50, width: 40, height:50, color: 'grey' },
    {id:1, x: 100, y: 200, width: 90, height:60, color: 'grey'},
    {id:2, x: 200, y: 300, width: 100, height:200, color: 'grey'}
  ];

  deleteObject(index:number){
    this.rectangles.splice(index, 1);
  }

  createObject(){
    this.rectangles.push(new Rectangle(this.rectangles.length, 100,  300, 400, 30, 'blue'));
  }



}
