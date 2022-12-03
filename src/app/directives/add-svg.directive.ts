import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';

@Directive({
  selector: '[appAddSvg]'
})
export class AddSvgDirective implements OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    /* this.renderer.addClass(this.elRef.nativeElement, 'directiveClass'); */
    /* this.renderer.addClass(svg.nativeElement, 'anotherSvg'); */

/*     // this is how you dynamically create an svg element in Angular :)
    const svg = this.renderer.createElement('svg');
    let myCircle: ElementRef = this.renderer.createElement('circle');
    this.renderer.appendChild(this.elRef.nativeElement, myCircle);
    this.renderer.setAttribute(this.renderer.createElement('circle'), 'cx', '100');
    this.renderer.setAttribute(this.renderer.createElement('circle'), 'cy', '100');
    console.log(myCircle);
    this.renderer.setAttribute(myCircle.nativeElement, 'cx', '100');
    console.log(myCircle);
    this.renderer.setAttribute(myCircle.nativeElement, 'cy', '100');
    this.renderer.appendChild(this.elRef.nativeElement, myCircle);
    this.renderer.appendChild(this.elRef.nativeElement, svg); */
    let tag = document.createElement("p");
    let text = document.createTextNode("my test is not working and im tired :(");
    tag.appendChild(text);
    let element = document.getElementById('mySvg');
    element?.appendChild(tag);

  }

}
