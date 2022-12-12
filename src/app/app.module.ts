import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawingSpaceComponent } from './drawing-space/drawing-space.component';
import { HttpClientModule } from '@angular/common/http';

import { KonvaService } from './Service/konva.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { ColorPickerComponent } from '@syncfusion/ej2-angular-inputs';

import { enableRipple } from '@syncfusion/ej2-base';
import { NavBarComponent } from './nav-bar/nav-bar.component';
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
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatBottomSheetModule,
    HttpClientModule,
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
