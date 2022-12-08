import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { Circle } from './circle';

@Component({
  selector: '[app-circle]',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'] 
})
export class CircleComponent implements OnInit {
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!:boolean;
  isPressed = false;
  selectedID = 1;

  constructor() { }

  ngOnInit(): void {
  }

  circles: Circle[] = [
    {id:0, x: 500, y: 500, r: 40, color: 'red'},
/*     {id:1, x: 100, y: 200, r: 50, color: 'green'},
    {id:2, x: 200, y: 300, r: 60, color: 'blue'} */
  ];

  selectObject(index: number){
    this.selectedID = index;
    console.log('select called with index ' + index);
  }

  deleteObject(index:number){
    this.circles.splice(index, 1);
  }

  createObject(){
    console.log("circle created!!!")
    this.circles.push(new Circle(this.circles.length, 100,  200, 30, 'blue'));
    console.log(this.circles);
  }

 


}
