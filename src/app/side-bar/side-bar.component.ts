import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  one: boolean = true
  toggle_one(){
    this.one = true;
    this.two = this.three = this.four = this.five = false
  }
  two: boolean = false
  toggle_two(){
    this.two = true;
    this.one = this.three = this.four = this.five = false
  }
  three: boolean = false
  toggle_three(){
    this.three = true;
    this.two = this.one = this.four = this.five = false
  }
  four: boolean = false
  toggle_four(){
    this.four = true;
    this.two = this.three = this.one = this.five = false
  }
  five: boolean = false
  toggle_five(){
    this.five = true;
    this.two = this.three = this.four = this.one = false
  }
}
