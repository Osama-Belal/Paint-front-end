import { Injectable } from '@angular/core';
import { Stage } from 'konva/lib/Stage';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  stage!:Stage;

  constructor() { }

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
