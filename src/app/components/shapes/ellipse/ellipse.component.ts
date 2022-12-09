import { Component, Input, OnInit } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';
import { Ellipse } from './ellipse';

@Component({
  selector: '[app-ellipse]',
  templateUrl: './ellipse.component.html',
  styleUrls: ['./ellipse.component.css']
})
export class EllipseComponent extends ShapeComponent implements OnInit {

  ellipses: Ellipse[] = [
    {id:0, x: 50, y: 50, rx: 40, ry:50, color: 'red'},
    {id:1, x: 100, y: 200, rx: 90, ry:60, color: 'green'},
    {id:2, x: 200, y: 300, rx: 100, ry:200, color: 'yellow'}
  ];

  deleteObject(index:number){
    this.ellipses.splice(index, 1);
  }

  createObject(){
    this.ellipses.push(new Ellipse(this.ellipses.length, 100,  300, 400, 30, 'blue'));
  }
}
