import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';
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
import { DrawComponent } from './components/draw/draw.component';
import { CircleComponent } from './components/shapes/circle/circle.component';
import { EllipseComponent } from './components/shapes/ellipse/ellipse.component';
import { RectangleComponent } from './components/shapes/rectangle/rectangle.component';
import { SquareComponent } from './components/shapes/square/square.component';
import { BoxResizeDirective } from './directives/box-resize.directive';
import { MyResizeDirective } from './directives/my-resize.directive';
import { TriangleComponent } from './components/shapes/triangle/triangle.component';
import { ResizeBorderComponent } from './components/resize-border/resize-border.component';
import { ShapeComponent } from './components/shapes/shape/shape.component';
import { LineComponent } from './components/shapes/line/line.component';
import { KonvaModule } from "ng2-konva";

enableRipple(true);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DrawingSpaceComponent,
    SideBarComponent,
    DrawComponent,
    CircleComponent,
    SquareComponent,
    RectangleComponent,
    EllipseComponent,
    MyResizeDirective,
    BoxResizeDirective,
    TriangleComponent,
    ResizeBorderComponent,
    ShapeComponent,
    LineComponent,
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
    FormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
