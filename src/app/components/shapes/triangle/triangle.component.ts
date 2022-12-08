import { Component, OnInit } from '@angular/core';
import { Triangle } from './triangle';

@Component({
  selector: '[app-triangle]',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css']
})
export class TriangleComponent implements OnInit {
  aString: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  triangles: Triangle[] =[
    new Triangle(0, 50, 50, {x:250, y:60}, {x:100, y: 400}, {x:400, y:400}, 'red')
  ]


}
