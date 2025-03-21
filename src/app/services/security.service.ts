import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  //variable reactiva para ser observada por los componentes
  theUser = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient) {
    this.verifyActualSession()
  }

  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param infoUsuario JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(theUser: User):Observable<any>{
    let headers = new HttpHeaders();
    return this.http.post<any>
    (`${environment.url_ms_securityAKJ}/login`, theUser );
  }
  register(theUser: User): Observable<any> {
    let headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.url_ms_securityAKJ}/users`, 
      theUser,
      { headers }
    );
  }
  
  getUserFromToken(token: string):Observable<User>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.url_ms_securityAKJ}/api/public/security/token-validation`, { headers });
  }

  
  /*
  Guardar la información de usuario en el local storage
  */
  saveSession(dataSesion: any) {
    let data: User = {
      _id: dataSesion._id,
      name: dataSesion.name,
      email: dataSesion.email,
      password: "",
      token: dataSesion.token,
      role: dataSesion.role
    };
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUser(data);
  }
  /**
    * Permite actualizar la información del usuario
    * que acabó de validarse correctamente
    * @param user información del usuario logueado
  */
  setUser(user: User) {
    this.theUser.next(user); //notificar a todos los componentes que esten escuchando
  }
  /**
  * Permite obtener la información del usuario
  * con datos tales como el identificador y el token
  * @returns
  */
  getUser() {
    return this.theUser.asObservable();
  }
  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
*//*  */
public get activeUserSession(): User {
  const sessionData = localStorage.getItem('sesion');
  return sessionData ? JSON.parse(sessionData) : new User();
}

  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }
  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }
  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }
  /**
  * Permite obtener los dato de la sesión activa en el
  * local storage
  * @returns
  */
  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }
}