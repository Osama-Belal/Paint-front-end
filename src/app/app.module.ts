import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';

import { FormsModule } from '@angular/forms';
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
    ColorPickerModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
