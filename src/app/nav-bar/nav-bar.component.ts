import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DragHandlerService } from '../services/drag-handler.service';
import {MatDialog} from "@angular/material/dialog";
import { Circle } from '../components/shapes/circle/circle';
import { RequestsService } from '../services/requests.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NavBarComponent implements OnInit {

  constructor(public  myService: DragHandlerService, private myReqService: RequestsService) { }

  ngOnInit(): void {
  }
  
  // openDialog() {
  //   const dialogRef = this.dialog.open();
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  drawCircle(){
    let circle = new Circle('1', 100, 100, 50, 'green');
    this.myReqService.drawCircle(circle);
  }
}
