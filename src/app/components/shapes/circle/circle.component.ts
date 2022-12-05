import { Component, HostListener, OnInit } from '@angular/core';
import { Circle } from './circle';

@Component({
  selector: '[app-circle]',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'] 
})
export class CircleComponent implements OnInit {

  isPressed = false;
  selectedID = 1;

  constructor() { }

  ngOnInit(): void {
  }

  circles: Circle[] = [
    {id:0, x: 50, y: 50, r: 40, color: 'red'},
    {id:1, x: 100, y: 200, r: 50, color: 'green'},
    {id:2, x: 200, y: 300, r: 60, color: 'blue'}
  ];

  selectObject(index: number){
    this.selectedID = index;
    console.log('select called with index ' + index);
  }

  deleteObject(index:number){
    this.circles.splice(index, 1);
  }

  createObject(){
    this.circles.push(new Circle(this.circles.length, 100,  200, 30, 'blue'));
  }


}
