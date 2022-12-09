import { Shape } from "../shape/shape";

export class Rectangle extends Shape{
    width: number;
    height: number;

    constructor(id:number ,x: number, y: number, width:number, height:number, color: string)
    {
        super(id, x, y, color);
        this.width = width;
        this.height = height;
    }
}
