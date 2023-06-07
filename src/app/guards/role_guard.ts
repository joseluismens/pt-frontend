import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/message.service';

@Injectable()
export class RoleGuard implements CanActivate {
  roles: any = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const data :any = this.authService.obtenerInformacionToken();
    let rol = data.rol;
     console.log(next.data['role']);
     
    const estaEnRuta =  (element: any) => next.data['role'];

    let verificar_rol = next.data['role'].filter((el:any)=>el == rol)
    console.log(verificar_rol.length);
    
    if (verificar_rol.length > 0) {
      return true;
    }
    
    this.router.navigate(['/conversion'])
    return false;

    }
}
