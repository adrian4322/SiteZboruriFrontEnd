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

  onSubmit(): void {
    this.authService.signup(this.form).subscribe({
      next: data => {
        console.log('Succes:', data);
        this.succesLogare = true;
        this.router.navigate(['']);
      }
    });

  }

}
