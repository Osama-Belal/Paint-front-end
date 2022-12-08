import { Component, Input, OnInit } from '@angular/core';
import { Ellipse } from './ellipse';

@Component({
  selector: '[app-ellipse]',
  templateUrl: './ellipse.component.html',
  styleUrls: ['./ellipse.component.css']
})
export class EllipseComponent implements OnInit {
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!:boolean;
  
  selectedID: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ellipses: Ellipse[] = [
    {id:0, cx: 50, cy: 50, rx: 40, ry:50, color: 'red'},
    {id:1, cx: 100, cy: 200, rx: 90, ry:60, color: 'green'},
    {id:2, cx: 200, cy: 300, rx: 100, ry:200, color: 'yellow'}
  ];

  selectObject(index: number){
    this.selectedID = index;
    console.log('select called with index ' + index);
  }

  deleteObject(index:number){
    this.ellipses.splice(index, 1);
  }

  createObject(){
    this.ellipses.push(new Ellipse(this.ellipses.length, 100,  300, 400, 30, 'blue'));
  }
}
