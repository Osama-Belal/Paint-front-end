import { Shape } from "../shape/shape";

export class Square extends Shape {
    sideLength: number;
    constructor(id:string ,x: number, y: number, sideLength:number, color: string)
    {
        super(id, x, y, color);
        this.sideLength = sideLength;
    }
}