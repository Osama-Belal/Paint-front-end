import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { DrawComponent } from './components/draw/draw.component';
import { CircleComponent } from "./components/shapes/circle/circle.component";
import { SquareComponent } from './components/shapes/square/square.component';
import { RectangleComponent } from './components/shapes/rectangle/rectangle.component';
import { EllipseComponent } from './components/shapes/ellipse/ellipse.component';
import { MyResizeDirective } from './directives/my-resize.directive';
import { Circle } from './components/shapes/circle/circle';
import { BoxResizeDirective } from './directives/box-resize.directive';

@NgModule({
    declarations: [
        AppComponent,
        DrawComponent,
        CircleComponent,
        SquareComponent,
        RectangleComponent,
        EllipseComponent,
        MyResizeDirective,
        BoxResizeDirective
    ],
    providers: [CircleComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        DragDropModule
    ]
})
export class AppModule { }
