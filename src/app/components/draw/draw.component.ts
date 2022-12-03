import { Component, HostListener, OnInit } from '@angular/core';
import { ShapeDataService } from 'src/app/services/shape-data.service';
import { CircleComponent } from 'src/app/shapes/circle/circle.component';
import { Circle } from './circle';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  isPressed: boolean = false;
  selectedID = 1;
  constructor() { 
  }

  ngOnInit(): void {
  }

  circles: Circle[] = [
    {id:0, x: 50, y: 50, r: 40},
    {id:1, x: 100, y: 200, r: 50},
    {id:2, x: 200, y: 300, r: 60}
  ];



  @HostListener('mousedown', ['$event'])
  move(e:MouseEvent){
    this.isPressed = true;
  }
  
  @HostListener('mouseover', ['$event'])
  onover(e:MouseEvent){
    if(this.isPressed === false) return;
    this.circles[this.selectedID].x = e.clientX;
    this.circles[this.selectedID].y = e.clientY;
  }

  @HostListener('mouseup', ['$event'])
  onup(e:MouseEvent){
    this.isPressed = false;
    console.log("on up called");
  }

  selectObject(index: number){
    this.selectedID = index;
    console.log('select called with index ' + index);
  }

  deleteObject(index:number){
    this.circles.splice(index, 1);
  }

}
