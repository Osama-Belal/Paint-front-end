import { Point } from "@angular/cdk/drag-drop";
import { Shape } from "../shape/shape";

export class Triangle extends Shape {
    p1: {x: number, y: number};
    p2: {x: number, y: number};
    p3: {x: number, y: number};
    pointsToString: string
    constructor(id:string ,x: number, y: number, p1:{x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}, color: string)
    {
        super(id, x, y, color);
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.pointsToString = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
    }
}