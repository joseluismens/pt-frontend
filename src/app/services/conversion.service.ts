import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  api = environment.base_url

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
