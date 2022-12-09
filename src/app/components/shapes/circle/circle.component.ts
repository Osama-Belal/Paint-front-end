import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { inputs } from '@syncfusion/ej2-angular-inputs/src/textbox/textbox.component';
import { ShapeComponent } from '../shape/shape.component';
import { Circle } from './circle';

@Component({
  selector: '[app-circle]',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'] 
})
export class CircleComponent extends ShapeComponent implements OnInit {

  circles: Circle[] = [
    {id:0, x: 500, y: 500, r: 40, color: 'red'},
    {id:1, x: 100, y: 200, r: 50, color: 'green'},
    {id:2, x: 200, y: 300, r: 60, color: 'blue'}
  ];

  deleteObject(index:number){
    this.circles.splice(index, 1);
  }

  createObject(){
    this.circles.push(new Circle(this.circles.length, 100,  200, 30, 'blue'));
  }

}
