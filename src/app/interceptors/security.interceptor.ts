 import { Injectable } from '@angular/core';
 import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
   HttpErrorResponse
 } from '@angular/common/http';
 import { Observable, catchError, throwError } from 'rxjs';
 import { SecurityService } from '../services/security.service';
 import Swal from 'sweetalert2';
 import { Router } from '@angular/router';

 @Injectable()
 export class SecurityInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityService,
        private router: Router) { }


intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
// Si la solicitud es para la ruta de "login", no adjuntes el token
if (request.url.includes('/login') || request.url.includes('/token-validation')) {
console.log("no se pone token")
return next.handle(request);

} else {
let theUser = this.securityService.activeUserSession
const token = theUser["token"];
// Adjunta el token a la solicitud
const authRequest = request.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`,
  },
});

    //Aqui se pondria las alertas a los errores 
return next.handle(authRequest).pipe(
  catchError((err: HttpErrorResponse) => {
    if (err.status === 401) {
      Swal.fire({
        title: 'No está autorizado para esta operación',
        icon: 'error',
        timer: 5000
      });
      this.router.navigateByUrl('/login');

    } else if (err.status === 400) {

      Swal.fire({
        title: 'Existe un error, contacte al administrador',
        icon: 'error',
        timer: 5000
      });
    }
    return new Observable<never>();
  }));

}


// Continúa con la solicitud modificada
    }
 }