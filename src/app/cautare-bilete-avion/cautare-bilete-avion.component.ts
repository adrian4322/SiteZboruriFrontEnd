import { Component, ViewChild, HostListener  } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { TabelCautareZboruri } from "./tabel-cautare-zboruri/tabel-cautare-zboruri.component"; 

@Component({
  selector: 'app-cautare-bilete-avion',
  standalone: true,
  imports: [
    RouterOutlet,
    TabelCautareZboruri
],
  templateUrl: './cautare-bilete-avion.component.html',
  styleUrls: ['./cautare-bilete-avion.component.scss']
})
export class CautareBileteAvionComponent {

}
