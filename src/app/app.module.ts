import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawSheetComponent } from './draw-sheet/draw-sheet.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KonvaService } from './konva.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    DrawSheetComponent,
  ],
  imports: [
    BrowserModule,
        AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatBottomSheetModule,
    HttpClientModule
  ],
  providers: [KonvaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
