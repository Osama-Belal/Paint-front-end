import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {KonvaService} from "./Service/konva.service";

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ColorPickerComponent } from '@syncfusion/ej2-angular-inputs';

import { enableRipple } from '@syncfusion/ej2-base';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DrawingSpaceComponent } from './drawing-space/drawing-space.component';
import {ReactiveFormsModule} from "@angular/forms";
// import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { SideBarComponent } from './side-bar/side-bar.component';


enableRipple(true);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DrawingSpaceComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatRippleModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatBottomSheetModule,
    ColorPickerModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [KonvaService],
  bootstrap: [AppComponent]
})

export class AppModule { }
