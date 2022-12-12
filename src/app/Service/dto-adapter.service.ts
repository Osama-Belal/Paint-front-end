import { Injectable } from '@angular/core';
import { ShapesService } from './shapes.service';
import {Dto} from "../drawing-space/dto";

@Injectable({
  providedIn: 'root'
})
export class DtoAdapterService {

  constructor(private myService: ShapesService){}

  drawShape(shape: Object, className: string){
      let dto:Dto = new Dto();
      dto = shape;
      dto.className = className;
      dto.commandType = 'draw';
      this.myService.drawShape(dto);
  }

  postMove(shape: Object, className:string){
    let dto:Dto = new Dto();
    dto = shape;
    console.log('jo', dto);
    dto.className = className;
    dto.commandType = 'move';
    this.myService.postUpdate(dto);
  }
}
