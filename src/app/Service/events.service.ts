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

  constructor(private shapeService: ShapesService, private drawingComp: DrawingSpaceComponent) {
   }

  saveXML(){
    let myObj = {
      stage: this.drawingComp.stage,
      path: 'saved.xml',
      fileType: 'xml',
    }
    this.shapeService.postSave(this.drawingComp.stage, myObj)
  }
  
  saveJSON(){
    let myObj = {
      stage: this.drawingComp.stage,
      path: 'saved.json',
      fileType: 'json',
    }
    console.log(this.drawingComp.stage);
    this.shapeService.postSave(this.drawingComp.stage, myObj);
  }

  load(){
    this.shapeService.getLoad('saved.json').subscribe((data => {
      this.drawingComp.stage = <Stage>data;
      console.log('load called ', this.drawingComp.stage);
    }));;
  }

  saveAsImage(): void {
    console.log('saveAsImage called')
    const dataUrl: string = this.drawingComp.stage.toDataURL({
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
