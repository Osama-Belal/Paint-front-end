import { Circle } from "../components/shapes/circle/circle";
import { Ellipse } from "../components/shapes/ellipse/ellipse";
import { Line } from "../components/shapes/line/Line";
import { Rectangle } from "../components/shapes/rectangle/rectangle";
import { Shape } from "../components/shapes/shape/shape";
import { Square } from "../components/shapes/square/square";
import { Triangle } from "../components/shapes/triangle/triangle";

export class ShapeFactory {
    createShape (shapeType: string){
        switch(shapeType){
            case 'circle': return new Circle('s0',500, 200, 40, 'green');
            case 'ellipse': return new Ellipse('s1', 100, 200, 100, 200, 'red');
            case 'line': return new Line('s2', 300, 400, 500, 700, 'orange');
            case 'rectangle': return new Rectangle('s3', 300, 400, 100, 300, 'magenta');
            case 'square': return new Square('s4', 300, 300, 150, '#333');
            case 'triangle': return new Triangle('s5', 50, 50, {x:100, y:200}, {x: 200, y: 300}, {x:300, y: 500}, 'cyan');
        }

    }
}