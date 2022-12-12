import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import {Transformer} from "konva/lib/shapes/Transformer";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {KonvaService} from "../Service/konva.service";
import {ShapesService} from "../Service/shapes.service";
import {DtoAdapterService} from "../Service/dto-adapter.service";
import {ShapeFactory} from "../drawing-space/ShapeFactory";
import {Dto} from "../drawing-space/dto";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  save(){

  }

  load(){

  }

}
