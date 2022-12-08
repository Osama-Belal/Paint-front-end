import { Point } from "@angular/cdk/drag-drop";

export class Triangle {
    id: number;
    x: number;
    y: number;
    p1: {x: number, y: number};
    p2: {x: number, y: number};
    p3: {x: number, y: number};
    pointsToString: string
    color: string;
    constructor(id:number ,x: number, y: number, p1:{x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}, color: string)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.color = color;
        this.pointsToString = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
    }
}