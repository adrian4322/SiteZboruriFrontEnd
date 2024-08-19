import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../pagina-creare-cont/auth.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pagina-logare',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './pagina-logare.component.html',
  styleUrl: './pagina-logare.component.scss'
})
export class PaginaLogareComponent {

  form: any = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.logare(this.form).subscribe( {
      next: data => {
        console.log("Succes:", data);
        this.router.navigate(['']);
      }
    });
  }



}
