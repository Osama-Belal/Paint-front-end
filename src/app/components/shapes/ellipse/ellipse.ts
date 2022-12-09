import { Shape } from "../shape/shape";

export class Ellipse extends Shape{
    rx: number;
    ry: number;
    constructor(id:string ,x: number, y: number, rx:number, ry:number, color: string)
    {
        super(id, x, y, color);
        this.rx = rx;
        this.ry = ry;
    }
}
