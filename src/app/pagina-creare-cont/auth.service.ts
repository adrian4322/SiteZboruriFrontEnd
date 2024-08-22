import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';
  private isBrowser: boolean;

constructor(private http: HttpClient,@Inject(PLATFORM_ID) platfromId: Object) {
  this.isBrowser = isPlatformBrowser(platfromId);
}

logare(logareRequest: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/logare`, logareRequest);
}

creareCont(creareContRequest: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/creareCont`, creareContRequest);
}

salvareToken(token: string): void {
  if(this.isBrowser){
    localStorage.setItem('authToken', token);
  }
}

getToken(): string | null {
  return this.isBrowser ? localStorage.getItem('authToken') : null;
}

stergeToken(): void {
  if(this.isBrowser)
    localStorage.removeItem('authToken');
}

esteConectat(): boolean {
  return this.getToken() !== null;
}

}
