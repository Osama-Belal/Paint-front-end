import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawComponent } from './components/draw/draw.component';
import { AddSvgDirective } from './directives/add-svg.directive';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    AddSvgDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
