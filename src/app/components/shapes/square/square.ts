export class Square {
    id: number;
    sideLength: number;
    x: number;
    y: number;
    color: string;
    constructor(id:number ,x: number, y: number, sideLength:number, color: string)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.sideLength = sideLength;
        this.color = color;
    }
}