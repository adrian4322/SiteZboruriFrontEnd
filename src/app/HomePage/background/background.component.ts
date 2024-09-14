import { Component } from '@angular/core';
import {NgOptimizedImage, NgIf} from "@angular/common";
import {RouterLink, Router, RouterOutlet} from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';


@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet,
    NavigationBarComponent
  ],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BackgroundComponent {

  constructor(private router : Router) { }

  creareContPagina() {
    this.router.navigateByUrl('/creareCont');
  }

}
