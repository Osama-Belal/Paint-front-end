import { Component, HostListener, OnInit } from '@angular/core';
import { CircleComponent } from '../shapes/circle/circle.component';


@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  mouseX!: number;
  mouseY!: number;
  isMouseDown: boolean = false;
  constructor() { 
  }

  ngOnInit(): void {
  }


  @HostListener('mousemove', ['$event'])
  recordMouse(e: MouseEvent){
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
  @HostListener('mousedown', ['$event'])
  recordMouseDown(){
    this.isMouseDown = true;
  }
  @HostListener('mouseup', ['$event'])
  recordMouseup(){
    this.isMouseDown = false;
  }

}