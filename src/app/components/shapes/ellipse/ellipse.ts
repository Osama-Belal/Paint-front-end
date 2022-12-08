export class Ellipse{
    id: number;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    color: string;
    constructor(id:number ,cx: number, cy: number, rx:number, ry:number, color: string)
    {
        this.id = id;
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
        this.color = color;
    }
}
