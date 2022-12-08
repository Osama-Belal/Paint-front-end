import { Component, Input, OnInit } from '@angular/core';
import { Square } from './square';

@Component({
  selector: '[app-square]',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!:boolean;
  
  selectedID: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  squares: Square[] = [
    {id:0, x: 50, y: 50, sideLength: 40, color: 'red'},
    {id:1, x: 100, y: 200, sideLength: 50, color: 'green'},
    {id:2, x: 200, y: 300, sideLength: 60, color: 'blue'}
  ];

  selectObject(index: number){
    this.selectedID = index;
    console.log('select called with index ' + index);
  }

  deleteObject(index:number){
    this.squares.splice(index, 1);
  }

  createObject(){
    this.squares.push(new Square(this.squares.length, 100,  200, 30, 'blue'));
  }

}