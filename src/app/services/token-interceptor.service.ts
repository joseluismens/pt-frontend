import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { AuthService } from './auth.service';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { ToastService } from './message.service';
import { LoaderService } from './loader.service';
import { TOKEN_ERRORS } from '../constantes/const';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
    private toastService: ToastService,
    private loaderService:LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.setLoading(true, req.url);
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq).pipe(
      catchError((errorObject: HttpErrorResponse) => {

        //Errores de token
        if(errorObject?.error?.token_error_code !== undefined){
          let token_error_code =errorObject?.error?.token_error_code

          if (token_error_code === TOKEN_ERRORS.TOKEN_NOT_FOUND) {
            this.toastService.showError(`Hubo un problema con su sesión, por favor inicie sesión nuevamente (${TOKEN_ERRORS.TOKEN_NOT_FOUND})`);
          } else if (token_error_code === TOKEN_ERRORS.TOKEN_EMPTY) {
            this.toastService.showError(`Hubo un problema con su sesión, por favor inicie sesión nuevamente (${TOKEN_ERRORS.TOKEN_EMPTY})`);
          }else if (token_error_code === TOKEN_ERRORS.TOKEN_EXPIRED) {
            this.toastService.showError(`Su sesión ha expirado, porfavor inicie sesión nuevamente (${TOKEN_ERRORS.TOKEN_EXPIRED})`);
          }else if (token_error_code === TOKEN_ERRORS.TOKEN_ERR) {
            this.toastService.showError(`Hubo un problema con su sesión, por favor inicie sesión nuevamente (${TOKEN_ERRORS.TOKEN_ERR})`);
          }else if (token_error_code === TOKEN_ERRORS.TOKEN_INVALID) {
            this.toastService.showError(`Su sesión es inválida, por favor inicie sesión nuevamente (${TOKEN_ERRORS.TOKEN_INVALID})`);
          }else{
            this.toastService.showError(`Ocurrió un problema con su sesión, inicie sesión nuevamente (${token_error_code})`);
          }
          /* En caso de cualquier error con token, cerrar sesión */
          this.authService.logout();

        }else{
          /*Otros errores
            errorObject.error.message -> (string) Mensaje en palabras humanas (Ej. No se pudo guardar el elemento)
            errorObject.error.error -> (string) Mensaje capturado de una Excepción/Error (Ej. Could not find file or directory)
          */
          let human_readable_message = errorObject.error?.message;
          let exception_message = errorObject.error?.error
          if(typeof human_readable_message === 'string' && human_readable_message.trim() !== ""){
            this.toastService.showError(human_readable_message)
          }else if(typeof exception_message === 'string' && exception_message.trim() !== ""){
            this.toastService.showError(`Ha ocurrido un error (${exception_message})`)
          }else{
            this.toastService.showError('Ha ocurrido un error desconocido, intente nuevamente más tarde.')
          }

        }
        //Retorna el mismo error interceptado, por si se necesita usar en el suscribe
        return throwError(() => errorObject)
        //return throwError(error);
      }),
      finalize(() => {
        this.loaderService.setLoading(false, req.url);
      }),
    );  
  }
}
