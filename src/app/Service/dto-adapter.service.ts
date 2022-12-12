import { Injectable } from '@angular/core';
import { MATERIAL_SANITY_CHECKS_FACTORY } from '@angular/material/core/common-behaviors/common-module';
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

  
  putRecolor(shape: any, className: string){
    let dto: Dto = new Dto();
    dto = shape;
    dto.className = className;
    this.myService.putRecolor(dto);
  }
  
  undoDelete(dto: Dto){
    let myShape = this.shapeFactory.createShape(<string>dto.className);
    console.log(myShape);
    console.log(dto);
    myShape.attrs = dto;
    myShape.className = dto.className;
    return myShape;
  }

  getClone(id: string){
    let dto: any;
    this.myService.getClone(id).subscribe((data => {
      dto = data;
    }));
    let myShape = this.shapeFactory.createShape(<string>dto.className);
    myShape.attrs = dto;
    myShape.className = dto.className;
    return myShape;
  }
  
}
