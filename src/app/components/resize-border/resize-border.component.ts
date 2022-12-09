import { Component, OnInit, Input, ElementRef,ViewChild,AfterViewInit,HostBinding } from '@angular/core';
import { fromEvent,merge } from 'rxjs';
import { filter, take, startWith,map } from 'rxjs/operators';
export enum TypeDrag {
  Move,
  Top,
  Bottom,
  Left,
  Right,
  TopRight,
  BottomRight,
  TopLeft,
  BottomLeft
}

@Component({
  selector: 'resize-border',
  templateUrl: './resize-border.component.html',
  styleUrls: ['./resize-border.component.css']
})
export class ResizeBorderComponent {
  rect: any;
  rectInit:any;
  incr: number[] = [0, 0, 0, 0];
  typeDrag!: TypeDrag;
  origin: any;
  moveSubscription: any;
  resizeDiv: any;
  classNames = [
    'cell-top',
    'cell-border-top',
    'cell-border-bottom',
    'cell-border-left',
    'cell-border-right',
    'cell-top-right',
    'cell-bottom-right',
    'cell-top-left',
    'cell-bottom-left'
  ];

  style: any = null;
  index=0;
  selected=false;
  constructor(public elementRef: ElementRef) {}
    

}
