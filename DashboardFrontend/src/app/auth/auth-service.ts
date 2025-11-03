import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private loginUrl = 'http://localhost:5000/login';
  private validateTokenUrl = 'http://localhost:5000/tokenValidate';
  
  constructor(private http: HttpClient) {}

  // CONSUMO LOGIN API
  login(payLoad: AuthCredentials) {
    return this.http.post<LoginResponse>(this.loginUrl, payLoad);
  }

  // VALIDACION TOKEN API
  validateToken(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.validateTokenUrl, { headers, observe: 'response' })
    .pipe(
      map(response => {
        console.log(response.body, response.status);
        return response.status === 200;
      }),
      catchError(error => {
        console.error("Error al validar el token:", error);
        return of(false);
      })
    );
  }


}
