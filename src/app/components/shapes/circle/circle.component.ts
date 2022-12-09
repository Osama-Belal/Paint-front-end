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



  deleteObject(index:number){
    this.reqService.circles.splice(index, 1);
  }

  createObject(){
  /*   this.circles.push(new Circle(this.circles.length, 100,  200, 30, 'blue')); */
  }

}
