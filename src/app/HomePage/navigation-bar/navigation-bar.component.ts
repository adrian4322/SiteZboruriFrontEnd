import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../pagina-creare-cont/auth.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {

  constructor(private authService: AuthService, private router: Router) { }

trimiterePaginaCreareCont(): void {
  this.router.navigate(['/creareCont']);
}

trimiterePaginaLogare(): void {
  if(this.authService.esteConectat()){
    this.router.navigate(['/cautareBilete']);
    return;
  }
    this.router.navigate(['/logare']);
}

}
