import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "../pagina-creare-cont/auth.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { error } from 'console';

@Component({
  selector: 'app-pagina-logare',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './pagina-logare.component.html',
  styleUrls: ['./pagina-logare.component.scss']
})
export class PaginaLogareComponent implements OnInit {

  form: any = {
    username: '',
    password: ''
  };

  mesaj: string  = '';

  constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(){
    if(this.authService.esteConectat())
      this.router.navigate(['/cautareBilete']);
   } 

  onSubmit(): void {
    this.authService.logare(this.form).subscribe({
      next: (data) => {
        const token = data.token;
        if(token) {
          this.authService.salvareToken(token);
          this.router.navigate(['/cautareBilete']);
        }
      },
      error: () => {
        this.mesaj = 'Username sau parola incorecte';
        }
    });
  }
}
