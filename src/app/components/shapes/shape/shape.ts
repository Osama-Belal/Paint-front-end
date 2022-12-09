export abstract class Shape{
    id: number;
    x: number;
    y: number;
    color: string;
    constructor(id: number, x: number, y: number, color: string){
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
    }
}