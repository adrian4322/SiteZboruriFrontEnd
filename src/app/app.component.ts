import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from "./HomePage/navigation-bar/navigation-bar.component";
import {BackgroundComponent} from "./HomePage/background/background.component"
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, BackgroundComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
  isHomePage: boolean = false; 

}

