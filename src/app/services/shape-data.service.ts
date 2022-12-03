import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeDataService {

  circles!: {id:number, x:number, y:number, r:number}[];

  constructor() { }
  
  myCircles= [
    {id:1, x: 50, y: 50, r: 40},
    {id:2, x: 100, y: 2000, r: 50}
  ];
}
