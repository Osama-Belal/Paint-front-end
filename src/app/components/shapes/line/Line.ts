export class Line {
    id: string;
    x1: number;
    y1: number;
    x2:number;
    y2: number;
    color: string
    constructor(id: string, x1: number, y1: number, x2: number, y2: number, color: string){
        this.id = id;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
    }
}