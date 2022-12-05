import { Component, HostListener, OnInit } from '@angular/core';
import { Circle } from '../shapes/circle/circle';
import { Square } from '../shapes/square/square';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {


  constructor() { 
  }

  ngOnInit(): void {
  }

}