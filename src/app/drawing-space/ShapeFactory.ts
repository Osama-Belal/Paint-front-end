import { TestBed } from "@angular/core/testing";
import { Dto } from "./dto";
import {KonvaService} from "../Service/konva.service";
import {ShapesService} from "../Service/shapes.service";
import {DtoAdapterService} from "../Service/dto-adapter.service";

export class ShapeFactory {
    constructor(private myKonvaService: KonvaService, private reqService: ShapesService, private dtoAdapter: DtoAdapterService){}

    createShape(shape: string){
        let created: any;
        let test: Dto = new Dto();
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
            case 'square':
            created = this.myKonvaService.square();
            break;
            case 'text': created = this.myKonvaService.text();
            break;
        }
        this.dtoAdapter.drawShape(created.toObject().attrs, created.toObject().className);

        return created;
      }
}
