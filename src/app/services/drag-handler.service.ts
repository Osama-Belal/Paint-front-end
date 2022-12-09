import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragHandlerService {
  dragFlag: boolean = false;
  resizeFlag: boolean = false;
  mouseX!: number;
  mouseY!: number;
  isMouseDown: boolean = false;
  constructor() { }

  toggleDrag(){
    this.dragFlag = (this.dragFlag == true ? false : true)
  }
  
  toggleResize(){
    this.resizeFlag = (this.resizeFlag == true ? false : true);
  }

  setCoor(x: number, y: number, isClick: boolean){
    this.mouseX = x;
    this.mouseY = y;
    this.isMouseDown = isClick;
  }
}
