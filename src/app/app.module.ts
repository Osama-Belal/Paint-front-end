import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AppComponent } from './app.component';
import { DrawComponent } from './components/draw/draw.component';
import { CircleComponent } from "./components/shapes/circle/circle.component";
import { SquareComponent } from './components/shapes/square/square.component';

@NgModule({
    declarations: [
        AppComponent,
        DrawComponent,
        CircleComponent,
        SquareComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        DragDropModule
    ]
})
export class AppModule { }
