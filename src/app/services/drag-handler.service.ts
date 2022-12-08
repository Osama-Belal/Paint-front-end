import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragHandlerService {
  dragFlag: boolean = false;
  constructor() { }

  toggleDrag(){
    this.dragFlag = (this.dragFlag == true ? false : true)
    console.log("draggg: " + this.dragFlag);
  }
}
