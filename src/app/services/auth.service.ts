import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';
import jwt_decode from "jwt-decode";

import { ToastService } from './message.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url = environment.base_url
  redirectUrl:string;

  
  constructor(private http: HttpClient, 
    private router:Router,  
    private toastService:ToastService) {
      this.redirectUrl = "";
     }

  login(data: {}) {
    return this.http.post(`${this.base_url}/login`, data).pipe(
      tap((res: any) => {
          console.log(res);
          localStorage.setItem('rol', res.rol)
          localStorage.setItem('fullname', res.nombre_completo)

          localStorage.setItem('token', res.token)
      })
    );
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
 

  logout(message:any = false, messageType:string = "info") {
    localStorage.clear();
    if(typeof(message)==="string" && message.trim() !== ""){
      switch(messageType){
        case "info":
          this.toastService.showInfo(message);
          break;
        case "success":
          this.toastService.showSuccess(message);
          break;
        case "error":
          this.toastService.showError(message);
          break;
        default:
          break;
      }
      
    }    
    this.router.navigate(['/login']);
  }

  obtenerInformacionToken(){

    let token = localStorage.getItem('token');
    if(token === undefined || token === null){
      this.toastService.showError("Ocurrió un problema con la sesión, por favor ingrese nuevamente")
      localStorage.clear();
      this.router.navigate(['/login'])
    }else{
      try{
        return jwt_decode(token);
      }catch(err){
        this.toastService.showError("Ocurrió un problema con la sesión, por favor ingrese nuevamente")
        localStorage.clear();
        this.router.navigate(['/login'])
      }
    }
  }
  
}
