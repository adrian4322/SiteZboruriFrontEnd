import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {

  constructor(private router: Router) { }

trimiterePaginaCreareCont(): void {
  this.router.navigate(['/creareCont']);
}

trimiterePaginaLogare(): void {
    this.router.navigate(['/logare']);
}

}
