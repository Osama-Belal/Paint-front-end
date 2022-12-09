import { Shape } from "../shape/shape";

export class Circle extends Shape{
    r:number;
    constructor(id:number ,x: number, y: number, r:number, color: string)
    {
        super(id, x, y, color);
        this.r = r;
    }
}