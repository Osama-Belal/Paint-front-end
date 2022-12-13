import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dto } from '../drawing-space/dto';
import { Layer } from 'konva/lib/Layer';
import { Stage, stages } from 'konva/lib/Stage';

@Injectable({
  providedIn: 'root'
})

export class ShapesService {
  configUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  drawShape(dto: Dto){
    dto.commandType = 'draw';
    console.log(dto);
    return this.http.post<Dto>(`${this.configUrl}/draw`, dto);
  }
  
  undo(){
    return this.http.get<Dto>(`${this.configUrl}/undo`);
  }
  redo(){
    return this.http.get<Dto>(`${this.configUrl}/redo`);
  }
  
  putUpdate(dto: Dto){
    console.log(dto);
    this.http.put<Dto>(`${this.configUrl}/update`, dto).subscribe((data => {
      console.log("data: ", data);
    }))
  }
  
  postSave(myStage: Stage, myObj: Object){
    this.http.post<any>(`${this.configUrl}/save`, myObj).subscribe((data => {
      console.log("data: ", data);
    }))
  }  
  
  getLoad(fileLocation: string){
    return this.http.get<Stage>(`${this.configUrl}/load/${fileLocation}`)
  }
  
  putDelete(dto: Dto){
    dto.commandType = 'delete';
    return this.http.put<Dto>(`${this.configUrl}/update`, dto);
  }
  
  putRecolor(dto: Dto){
    dto.commandType = 'recolor'
    this.http.put<Dto>(`${this.configUrl}/update`, dto).subscribe((data => {
      console.log("data: ", data);
    }))
  }
  
  getClone(id: string){
    return this.http.get<Dto>(`${this.configUrl}/clone/${id}`);
  }
  
}
