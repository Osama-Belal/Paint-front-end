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
      if(dto.className == 'Line' && dto.closed == true)
        dto.className = 'Triangle'
      dto.commandType = 'draw';
      let myShape = this.myService.drawShape(dto); 
      return myShape
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
  
  fromDtoToKonva(dto: Dto){
    let myShape = this.shapeFactory.createShape(<string>dto.className);
    console.log(myShape);
    myShape.attrs = dto;
    myShape.className = dto.className;
    if(myShape.className == 'Triangle')
      myShape.className = 'Line'
    myShape.name = 'shape';
    return myShape;
  }

  
}
