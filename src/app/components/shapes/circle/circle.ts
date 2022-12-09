import { Shape } from "../shape/shape";

export class Circle extends Shape{
    radius:number;
    constructor(id:string ,x: number, y: number, r:number, color: string)
    {
        super(id, x, y, color);
        this.radius = r;
    }
}