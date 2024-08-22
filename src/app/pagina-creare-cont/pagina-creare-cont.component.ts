import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-creare-cont',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pagina-creare-cont.component.html',
  styleUrls: ['./pagina-creare-cont.component.scss']
})
export class PaginaCreareContComponent {

  form: any = {
    username: '',
    email: '',
    password: ''
  };

  succesLogare = false;

  constructor(private authService: AuthService, private router: Router) {}

  mesajUsername: string = '';
  mesajEmail: string = '';
  mesajParola: string = '';
  eroare: boolean = false;

  onSubmit(): void {
    if(this.form.username.length == 0){
      this.mesajUsername = 'Username-ul nu poate fi gol!';
      this.eroare = true;
    }
    else
     this.mesajUsername = '';

    if(this.form.email.length == 0){
      this.mesajEmail = 'Email-ul nu poate fi gol!';
      this.eroare = true;
    }
    else
      this.mesajEmail = '';

    if(this.form.password.length < 5){
      this.mesajParola = 'Parola trebuie sa aiba cel putin 5 caractere!';
      this.eroare = true;
    }
    else
       this.mesajParola = '';

    if(this.eroare)
      return;

    this.authService.creareCont(this.form).subscribe({
      next: (data: any) => {
        console.log('Succes:', data);
        this.succesLogare = true;
        this.router.navigate(['/cautareBilete']);
      }
    });
  }
}
