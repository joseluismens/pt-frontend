import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  api ='https://app-c2944116-5499-49d1-b19c-3b501556cfa1.cleverapps.io/api/'
  constructor( private http:HttpClient) {

   }

  convertirUf(data:{}){
    return this.http.post(`${this.api}/conversion`,data);
  }
  misConversiones(){
    return this.http.get(`${this.api}/mis-conversiones`)
  }
  getHistorial(){
    return this.http.get(`${this.api}/historial`);
  }
}
