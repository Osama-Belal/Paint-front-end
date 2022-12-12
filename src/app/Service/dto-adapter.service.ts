import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Circle } from 'konva/lib/shapes/Circle';
import { Dto } from '../drawing-space/dto';
import { KonvaService } from './konva.service';
import { ShapeFactoryService } from './shape-factory.service';
import { ShapesService } from './shapes.service';


@Injectable({
  providedIn: 'root'
})
export class DtoAdapterService {

  constructor(private myService: ShapesService, private konvaService: KonvaService, private shapeFactory: ShapeFactoryService){}
  
  drawShape(shape: any, className: string){
      let dto:Dto = new Dto();
      dto = shape;
      dto.className = className;
      dto.commandType = 'draw';
      return this.myService.drawShape(dto);
  }

  putMove(shape: any, className:string){
    let dto:Dto = new Dto();
    dto = shape;
    dto.className = className;
    dto.commandType = 'move';
    this.myService.putUpdate(dto);
  }

  putResize(shape: any, className: string, oldContainer: any){
    let dto: Dto = new Dto();
    dto = shape;
    dto.className = className;
    dto.commandType = 'resize';
    dto.x = oldContainer.oldX;
    dto.y = oldContainer.oldY;
    this.myService.putUpdate(dto);
  }

  undoDelete(dto: Dto){
    let myShape = this.shapeFactory.createShape(<string>dto.className);
    console.log(myShape);
    console.log(dto);
    myShape.attrs = dto;
    myShape.className = dto.className;
    return myShape;
  }

}
