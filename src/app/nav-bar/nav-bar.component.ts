import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import {Transformer} from "konva/lib/shapes/Transformer";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {KonvaService} from "../Service/konva.service";
import {ShapesService} from "../Service/shapes.service";
import {DtoAdapterService} from "../Service/dto-adapter.service";
import {Dto} from "../drawing-space/dto";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

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

  helpActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  save(){

  }

  load(){

  }

  toggleGuide(){
    const help = document.getElementById('help');
    // const w = String(window.innerWidth / 2);
    // const h = String(window.innerHeight / 2);

    if(this.helpActive && help) {
      help.style.visibility = 'hidden';
    }

    if(!this.helpActive && help) {
      help.style.visibility = 'visible';
    }

    this.helpActive = !this.helpActive
  }

}
