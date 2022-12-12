import { Stage } from "konva/lib/Stage"

export class Dto {
    public id?:  string
    public x?: number
    public y?: number
    public scaleX: number = 1
    public scaleY: number = 1
    public radius?: number
    public radiusX?: number
    public radiusY?: number
    public stroke?: string
    public strokeWidth?: number;
    public fill?: string
    public stage?: Stage
    public className?: string
    public commandType?: string
    public path?: string
    constructor(){}
}
