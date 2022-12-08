export class Rectangle{
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    flag: boolean;
    constructor(id:number ,x: number, y: number, width:number, height:number, color: string)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.flag = false;
    }
}
