import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { DragHandlerService } from './services/drag-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Paint-front-end';
  mouseX!: number;
  mouseY!: number;
  isMouseDown: boolean = false;
  ngOnInit() {
  }
  constructor(public myService: DragHandlerService){ }

  ngAfterViewInit(): void {
  }

  @HostListener('mousemove', ['$event'])
  recordMouse(e: MouseEvent){
    this.mouseX = e.screenX;
    this.mouseY = e.screenY;
    this.myService.setCoor(this.mouseX, this.mouseY, this.isMouseDown);
  }
  @HostListener('mousedown', ['$event'])
  recordMouseDown(){
    this.isMouseDown = true;
    this.myService.setCoor(this.mouseX, this.mouseY, this.isMouseDown);
  }
  @HostListener('mouseup', ['$event'])
  recordMouseup(){
    this.isMouseDown = false;
    this.myService.setCoor(this.mouseX, this.mouseY, this.isMouseDown);
  }

}
