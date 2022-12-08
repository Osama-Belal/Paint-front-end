import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, Input, OnInit } from '@angular/core';
import { DragHandlerService } from 'src/app/services/drag-handler.service';
import { Rectangle } from './rectangle';

@Component({
  selector: '[app-rectangle]',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!:boolean;
  @Input() dragFlag!:boolean;
  selectedID: number = 0;
  isSelected: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  rectangles: Rectangle[] = [
    {id:0, x: 50, y: 50, width: 40, height:50, color: 'grey', flag: true},
    {id:1, x: 100, y: 200, width: 90, height:60, color: 'grey', flag: true},
    {id:2, x: 200, y: 300, width: 100, height:200, color: 'grey', flag: false}
  ];

  selectObject(index: number){
    this.isSelected = true;
    console.log("isSelected: " + this.isSelected);
    this.selectedID = index;
    console.log('select called with index ' + index);
  }
  deSelect(){
    this.isSelected = false;
    console.log("isSelected: " + this.isSelected);
  }

  deleteObject(index:number){
    this.rectangles.splice(index, 1);
  }

  createObject(){
    this.rectangles.push(new Rectangle(this.rectangles.length, 100,  300, 400, 30, 'blue'));
  }

  func(){
    return false;
  }

}
