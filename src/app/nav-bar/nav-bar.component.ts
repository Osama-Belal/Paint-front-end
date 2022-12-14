import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {Stage} from "konva/lib/Stage";
import { AppComponent } from '../app.component';
import { EventsService } from '../Service/events.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NavBarComponent implements OnInit {
  @Input() stage!:Stage;
  @Output() stageChange = new EventEmitter<any>();
  helpActive: boolean = false;

  constructor(private appComp: AppComponent, private eventService: EventsService) { }

  ngOnInit(): void {
  }



  saveXML(){
    let obj ={
      stage: this.stage,
      path: 'saved.xml',
      fileType: 'xml'
    }
    this.eventService.saveXML(obj);
  }
  saveJSON(){
    let obj ={
      stage: this.stage,
      path: 'saved.json',
      fileType: 'json'
    }
    console.log(this.stage);
    this.eventService.saveJSON(obj);
  }

  saveAsImage(): void {
    this.eventService.saveAsImage(this.stage);
  }

  loadXML(){
    this.eventService.load('saved.xml').subscribe((data => {
      console.log('data in nav component ', data);
      this.stageChange.emit(data);
    }));
  };

  loadJSON(){
    this.eventService.load('saved.json').subscribe((data => {
      console.log('data in nav component ', data);
      this.stageChange.emit(data);
    }));
  };


  toggleGuide(){
    const help = document.getElementById('help');

    if(this.helpActive && help) {
      help.style.visibility = 'hidden';
    }

    if(!this.helpActive && help) {
      help.style.visibility = 'visible';
    }

    this.helpActive = !this.helpActive
  }

  hide(){
    const help = document.getElementById('help');
    if(help)
      help.style.visibility = 'hidden';
    this.helpActive = false;
  }

}
