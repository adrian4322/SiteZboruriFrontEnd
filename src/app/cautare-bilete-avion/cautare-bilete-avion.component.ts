import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AeropoarteComponent } from '../aeropoarte/aeropoarte.component';


@Component({
  selector: 'app-cautare-bilete-avion',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    AeropoarteComponent
  ],
  templateUrl: './cautare-bilete-avion.component.html',
  styleUrls: ['./cautare-bilete-avion.component.scss']
})
export class CautareBileteAvionComponent {

  adulti: number = 0;
  tineri: number = 0;
  copii: number = 0;
  total: number = 0;
  afisare: boolean = false;
  dusIntors: boolean = false;
  selectedDepartureAirport: string = '';
  selectedArrivalAirport: string = '';

  plusareAdulti(): void { this.adulti++; this.total++; }
  plusareTineri(): void { this.tineri++; this.total++; }
  plusareCopii(): void { this.copii++; this.total++; }

  scadereAdulti(): void {
    if (this.adulti > 0) {
      this.adulti--; this.total--;
    }
  }

  scadereTineri(): void {
    if (this.tineri > 0) {
      this.tineri--; this.total--;
    }
  }

  scadereCopii(): void {
    if (this.copii > 0) {
      this.copii--; this.total--;
    }
  }

  afisareMeniuPasageri(): void {
    this.afisare = !this.afisare;
  }

  schimbaValoareIntors(): void {
    this.dusIntors = false;
  }

  schimbaValoareDusIntors(): void {
    this.dusIntors = true;
  }

  onDepartureAirportSelected(airport: string): void {
    this.selectedDepartureAirport = airport;
  }

  onArrivalAirportSelected(airport: string): void {
    this.selectedArrivalAirport = airport;
  }

}
