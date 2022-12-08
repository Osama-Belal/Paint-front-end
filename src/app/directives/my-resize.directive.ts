import { NumberSymbol } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Directive({
  selector: '[appMyResize]'
})
export class MyResizeDirective implements OnChanges{
  @Input() r!:number;
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!: boolean;
  @Output() rChange =  new EventEmitter<number>();
  mouse!: {x:number, y:number};
  resizeTool: boolean = false;
  status: string = "";
  object!: {left:number, top:number};
  
  constructor(private el: ElementRef) {
   }

   ngOnChanges(changes: SimpleChanges): void {
    if(changes['isMouseDown']){
      if(changes['isMouseDown'].currentValue == true)
        this.setStatus();
      else
        this.removeStatus();
    }
  }


  setStatus(){
    const {left, top} = this.el.nativeElement.getBoundingClientRect();
    this.object = {left, top};
    if(Math.abs(this.mouse.x - (left + this.r*2)) <= 0.1 * this.r){
      this.status = 'resize';
      console.log("status set")
    }
  }

  removeStatus(){
    this.status = "";
    console.log('status removed')
  }
  

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = {
      x: this.mouseX,
      y: this.mouseY
    }
    if(this.status == 'resize')
    this.resize();
  }
  
  resize(){
    if(this.resizeConditions()){
      console.log("resize called")
      const {left, top} = this.object
      console.log("currx: " + this.mouse.x + " left: " + left);
      this.el.nativeElement.style.r = this.mouse.x - left;
      this.rChange.emit(this.el.nativeElement.style.r);
    }
  }

  resizeConditions(){
    const {left, top} = this.el.nativeElement.getBoundingClientRect();
    return left >= 0;
  }
}
