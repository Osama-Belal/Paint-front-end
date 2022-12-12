import { Injectable } from '@angular/core';
import { Dto } from '../draw-sheet/dto';
import { DtoAdapterService } from './dto-adapter.service';
import { KonvaService } from './konva.service';
import { ShapesService } from './shapes.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeFactoryService {

  constructor(private myKonvaService: KonvaService, private reqService: ShapesService){}

  createShape(shape: string){
      let created: any;
      switch (shape){
        case 'circle':
          created = this.myKonvaService.circle();
          break;
          case 'rect': 
          created = this.myKonvaService.rect();
          break;
          case 'triangle': 
          created = this.myKonvaService.triangle();
          break;
          case 'ellipse': 
          created = this.myKonvaService.ellipse();
          break;
          case 'wedge': 
          created = this.myKonvaService.wedge();
          break;
          case 'text': created = this.myKonvaService.text();
          break;
      }

      return created;
    }
}
