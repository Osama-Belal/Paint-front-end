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
  @Input() isObjectSelected: boolean = true;
  @Output() widthChange =  new EventEmitter<number>();
  @Output() heightChange =  new EventEmitter<number>();

  mouse!: {x:number, y:number};
  resizeTool: boolean = false;
  status: string = "";
  object!: {left:number, top:number};
  
  constructor(private el: ElementRef) {
   }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.el);
    if(changes['isMouseDown']){
      if(changes['isMouseDown'].currentValue == true)
        this.setStatus();
      else
        this.removeStatus();
    }
    if(changes['isObjectSelected']){
      console.log("changes fired");
      console.log(changes['isObjectSelected']);
    }
  }

  setStatus(){
    const {left, top} = this.el.nativeElement.getBoundingClientRect();
    this.object = {left, top};
    let widthString = this.width;
    let heightString = this.height;


    if(typeof widthString === 'string'){
      let temp2 = (widthString as string).replace('px', '');
      this.width = Number(temp2);
    }
    
    if(typeof heightString === 'string'){
      let temp2 = (heightString as string).replace('px', '');
      this.height = Number(temp2);
    }

    if(Math.abs(this.mouse.x - (left + (this.width))) <= 10 && Math.abs(this.mouse.y - (top + (this.height))) <= 10){
      this.status = 'resize';
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
    console.log('isObject: ' + this.isObjectSelected);
    return left >= 0 && this.isObjectSelected === true;
  }
}
