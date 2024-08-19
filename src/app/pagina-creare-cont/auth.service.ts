import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient) { }

  logare(logareRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, logareRequest);
  }

  signup(signUpRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/creareCont`, signUpRequest);
  }

}
