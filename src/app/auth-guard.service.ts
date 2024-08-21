import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import { AuthService } from './pagina-creare-cont/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const esteConectat = this.authService.esteConectat();
    if(esteConectat)
      return true;
    else{
      this.router.navigate(['/logare']);
      return false;
    } 
  }
      
}
