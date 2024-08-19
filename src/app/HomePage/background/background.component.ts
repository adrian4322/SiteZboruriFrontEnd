import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, Router, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {

  constructor(private router : Router) { }

  creareContPagina() {
    this.router.navigateByUrl('/creareCont');
  }

}
