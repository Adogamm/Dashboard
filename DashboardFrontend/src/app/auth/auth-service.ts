import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
  constructor(private http: HttpClient) {}

  login(payLoad: AuthCredentials) {
    return this.http.post<LoginResponse>(this.loginUrl, payLoad);
  }

}
