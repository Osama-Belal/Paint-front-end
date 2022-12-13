import { Injectable } from '@angular/core';
import { Shape } from 'konva/lib/Shape';
import { Stage } from 'konva/lib/Stage';
import { DrawingSpaceComponent } from '../drawing-space/drawing-space.component';
import { ShapesService } from './shapes.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  stage!:Stage;

  constructor(private shapeService: ShapesService) {
   }

  saveXML(obj: any){
    this.shapeService.postSave(obj.stage, obj)
  }
  
  saveJSON(obj: any){
    this.shapeService.postSave(obj.stage, obj);
  }

  load(){
    return this.shapeService.getLoad('saved.json')
  }

  saveAsImage(stage: Stage): void {
    console.log('saveAsImage called')
    const dataUrl: string = stage.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 1
    });

    const link = document.createElement('a');
    link.download = 'board_image.png';
    link.href = dataUrl;
    link.click();
  }
}
