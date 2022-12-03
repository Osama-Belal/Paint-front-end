import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawComponent } from './components/draw/draw.component';
import { CircleComponent } from './shapes/circle/circle.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    CircleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
