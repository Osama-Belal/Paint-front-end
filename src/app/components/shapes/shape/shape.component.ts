import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input() mouseX!:number;
  @Input() mouseY!:number;
  @Input() isMouseDown!:boolean;
  @Input() dragFlag!:boolean;
  @Input() resizeFlag!: boolean;
  selectedID: number = 0;
  isSelected: boolean = false;

  constructor(public reqService: RequestsService) { }

  ngOnInit(): void {
  }

  selectObject(index: number){
    this.isSelected = true;
  /*   console.log("isSelected: " + this.isSelected); */
    this.selectedID = index;
  /*   console.log('select called with index ' + index); */
  }
  deSelect(){
    this.isSelected = false;
   /*  console.log("isSelected: " + this.isSelected); */
  }

}
