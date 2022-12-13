import { Stage } from "konva/lib/Stage"

export class Dto {
    public id?:  string
    public x?: number
    public y?: number
    public points?: number[]
    public closed: boolean = false;
    public scaleX: number = 1
    public scaleY: number = 1
    public name = "shape"
    public radius?: number
    public radiusX?: number
    public radiusY?: number
    public stroke: string = 'yellow'
    public strokeWidth: number = 5;
    public rotation: number = 0
    public fill?: string
    public stage?: Stage
    public className?: string
    public commandType?: string
    public path?: string
    constructor(){}
}
