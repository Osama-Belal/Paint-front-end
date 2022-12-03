import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
/*   @ViewChild('test') myRef!:ElementRef;
  @ViewChild('viewcontainer', {'read': ViewContainerRef}) viewcontainer;
  
  constructor(private elRef:ElementRef, private renderer: Renderer2) { } */

  ngOnInit(): void {
   /*  let mySvg = this.elRef.nativeElement.querySelector('test');
    console.log(mySvg);

    let mySvg = this.renderer.createElement('p');
    this.renderer.setAttribute(this.elRef.nativeElement, )
    this.renderer.appendChild(this.myRef, mySvg); */
  }



}
