import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  isLoading = false;
  _pendingRoutes:Array<string> = [];

  /* Forzar el mostrado u ocultación del loader sin validar si quedan rutas pendientes de respuesta en API*/
  setForceLoading(isLoading: boolean){
    //this.isLoading = isLoading;
    Promise.resolve().then(()=> {
      this.isLoading = isLoading;
    })
  }

  setLoading(isLoading: boolean, route:string) {
    if(isLoading === true){
      this._pendingRoutes.push(route);
    }else{
      for(let i =0; i< this._pendingRoutes.length; i++){
        if(this._pendingRoutes[i] === route){
          this._pendingRoutes.splice(i, 1);
        }
      }
    }
    /* Actualizar el estado sólo si se quiere activar el loader (true), pero si se quiere desactivar, solo hacerlo si no quedan rutas pendientes */
    if(isLoading === true || (isLoading === false && this._pendingRoutes.length === 0)){
      //this.isLoading$$.next(isLoading);
      //this.isLoading = isLoading;
      Promise.resolve().then(()=> {
        this.isLoading = isLoading;
      })
    }
  }
}