import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

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

  constructor() {}

  ngOnInit(): void {
  }

  // one: boolean = true
  // toggle_one(){
  //   this.one = !this.one;
  //   this.two = this.three = this.four = this.five = false
  // }
  // two: boolean = false
  // toggle_two(){
  //   this.two = !this.two;
  //   this.one = this.three = this.four = this.five = false
  // }
  // three: boolean = false
  // toggle_three(){
  //   this.three = !this.three;
  //   this.two = this.one = this.four = this.five = false
  // }
  // four: boolean = false
  // toggle_four(){
  //   this.four = !this.four;
  //   this.two = this.three = this.one = this.five = false
  // }
  // five: boolean = false
  // toggle_five(){
  //   this.five = !this.five;
  //   this.two = this.three = this.four = this.one = false
  // }


  active: boolean = false
  toggleClass(){
    this.active = !this.active;
  }
}
