import { Component, Input, OnInit } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';
import { Triangle } from './triangle';

@Component({
  selector: '[app-triangle]',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css']
})
export class TriangleComponent extends ShapeComponent implements OnInit {
  aString: string = '';

  triangles: Triangle[] =[
    new Triangle('0', 50, 50, {x:250, y:60}, {x:100, y: 400}, {x:400, y:400}, 'red')
  ]

  deleteObject(index:number){
    this.triangles.splice(index, 1);
  }

  createObject(){
    
  }

}
