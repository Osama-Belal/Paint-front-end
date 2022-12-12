import { Injectable } from '@angular/core';
import { Shape } from 'konva/lib/Shape';
import { Stage } from 'konva/lib/Stage';
import { ShapesService } from './shapes.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  stage!:Stage;

  constructor(private shapeService: ShapesService) { }

  saveXML(){
    let myObj = {
      stage: this.stage,
      path: 'saved.xml',
      fileType: 'xml',
    }
    this.shapeService.postSave(this.stage, myObj)
  }
  
  saveJSON(){
    let myObj = {
      stage: this.stage,
      path: 'saved.json',
      fileType: 'json',
    }
    this.shapeService.postSave(this.stage, myObj);
  }

  load(){
    this.shapeService.getLoad('saved.json').subscribe((data => {
      console.log(data);
    }));;
  }

  saveAsImage(): void {
    console.log('saveAsImage called')
    const dataUrl: string = this.stage.toDataURL({
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
