import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  @Input() x!: number;
  @Input() y!: number;
  @Input() r!: number;
  constructor() { 
  }

  ngOnInit(): void {
  }

}
