import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { templateCompiler } from '@syncfusion/ej2-angular-grids';
import { Circle } from '../components/shapes/circle/circle';
import { CircleComponent } from '../components/shapes/circle/circle.component';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  configUrl = 'http://localhost:8080';
  constructor(private http:HttpClient) { }

  circles: Circle[] = [
    {id:'0', x: 500, y: 500, radius: 40, color: 'red'},
    {id:'1', x: 100, y: 200, radius: 50, color: 'green'},
    {id:'2', x: 200, y: 300, radius: 60, color: 'blue'}
  ];

  drawCircle(circle: Circle){
    console.log('draw circle called');
    let test = {
      "x":100,
      "y":400,
      "radius": 200,
      "color":"black",
      "shapeType":"circle",
      "commandType":"draw",
      "id":"s4"
    };

    let temp:Circle = new Circle(circle.id, circle.x, circle.y, circle.radius, circle.color);
    this.circles.push(temp);
    this.http.post<Circle>(`${this.configUrl}/draw`, test).subscribe((data => {
      console.log("data: ", data);
      console.log(this.circles);
    }))
  }
}
