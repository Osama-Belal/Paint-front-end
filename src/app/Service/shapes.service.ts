import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Dto} from "../drawing-space/dto";


@Injectable({
  providedIn: 'root'
})

export class ShapesService {
  configUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  drawShape(dto: Dto){
    dto.commandType = 'draw';
    console.log(dto);
    this.http.post<Dto>(`${this.configUrl}/draw`, dto).subscribe((data => {
      console.log("data: ", data);
    }))
  }

  undo(){
    return this.http.get<Dto>(`${this.configUrl}/undo`);
  }

  postUpdate(dto: Dto){
    this.http.post<Dto>(`${this.configUrl}/update`, dto).subscribe((data => {
      console.log("data: ", data);
    }))
  }

}
