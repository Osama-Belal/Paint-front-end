export abstract class Shape{
    id: string;
    x: number;
    y: number;
    color: string;
    constructor(id: string, x: number, y: number, color: string){
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
    }
}