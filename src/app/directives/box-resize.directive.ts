import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBoxResize]'
})
export class BoxResizeDirective implements OnChanges{
  @Input() width!:number;
  @Input() height!:number;
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!: boolean;
  @Output() widthChange =  new EventEmitter<number>();
  @Output() heightChange =  new EventEmitter<number>();

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
    let temp = this.width;
    let newWidth:number;
    if(typeof temp === 'string'){
      let temp2 = (temp as string).replace('px', '');
      newWidth = <number><unknown>temp2;
      console.log("curr x: " + typeof this.mouse.x + " left: " + typeof left + " widthnew: " + typeof newWidth + ' calc: ' + Math.abs(this.mouse.x - (left + newWidth)))
      if(Math.abs(this.mouse.x - (left + (newWidth) )) <= 10){
        this.status = 'resize';
      }
    }else{
      console.log("curr x: " + this.mouse.x + " left: " + left + " width: " + this.width + ' calc: ' + Math.abs(this.mouse.x - (left + this.width)))

      if(Math.abs(this.mouse.x - (left + (this.width) )) <= 10){
        this.status = 'resize';
      }
    }
  }


  removeStatus(){
    this.status = "";
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
      const {left, top} = this.object
     /*  console.log("currx: " + this.mouse.x + " left: " + left); */
      this.el.nativeElement.style.width = this.mouse.x - left;
      this.el.nativeElement.style.height = this.mouse.y - top;
      this.widthChange.emit(this.el.nativeElement.style.width);
      this.heightChange.emit(this.el.nativeElement.style.height);
    }
  }

  resizeConditions(){
    const {left, top} = this.el.nativeElement.getBoundingClientRect();
    return left >= 0;
  }
}
