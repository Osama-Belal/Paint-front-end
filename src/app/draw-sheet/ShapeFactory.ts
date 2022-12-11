import { TestBed } from "@angular/core/testing";
import { DtoAdapterService } from "../dto-adapter.service";
import { KonvaService} from "../konva.service";
import { ShapesService } from "../shapes.service";
import { Dto } from "./dto";

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
            case 'wedge': 
            created = this.myKonvaService.wedge();
            break;
            case 'text': created = this.myKonvaService.text();
            break;
        }
        this.dtoAdapter.drawShape(created.toObject().attrs, created.toObject().className);

        return created;
      }
}