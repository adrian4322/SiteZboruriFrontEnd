import { Component, ViewChild, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AeropoarteComponent } from '../aeropoarte/aeropoarte.component';
import {HttpHeaders, HttpClient} from "@angular/common/http"

@Component({
  selector: 'app-cautare-bilete-avion',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    AeropoarteComponent,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './cautare-bilete-avion.component.html',
  styleUrls: ['./cautare-bilete-avion.component.scss']
})
export class CautareBileteAvionComponent {

constructor(private router: Router, private http: HttpClient){}


  adulti: number = 0;
  tineri: number = 0;
  copii: number = 0;
  total: number = 0;
  afisare: boolean = false;
  dusIntors: boolean = false;
  aeroportDus: string = '';
  aeroportIntors: string = '';
  aeroportIdDus : any = '';
  aeroportIdAterizare : any = '';

  @ViewChild('dropdown') dropdown: any;

  plusareAdulti(): void { 
    if (this.adulti < 8) {
       this.adulti++, this.total++;
    }
  }
  plusareTineri(): void { 
    if (this.tineri < 5) {
        this.tineri++, this.total++;
    }
  }
  plusareCopii(): void {
     if (this.copii < 5) {
        this.copii++, this.total++;
     }
  }

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

  aeroportDusSelectat(airport: string): void {
    this.aeroportDus = airport;
  }

  aeroportIntorsSelectat(airport: string): void {
    this.aeroportIntors = airport;
  }

  @HostListener('document:click', ['$event.target'])
  clickAfara(targetElement: HTMLElement): void {
    if (!this.dropdown.nativeElement.contains(targetElement)) {
      this.afisare = false;
    }
  }

  onSubmit() : void {
    const urlDus = `${this.apiUrlIdAeroport}${this.aeroportDus}`;
    const urlAterizare = `${this.apiUrlIdAeroport}${this.aeroportIntors}`;

    this.aeroportIdDus = this.http.get<any>(urlDus, { headers: this.headers}).subscribe(
      response => {
        this.aeroportIdDus = response.data[0].id;
      }
    );

    this.aeroportIdAterizare = this.http.get<any>(urlAterizare, { headers : this.headers}).subscribe(
      response => {
        this.aeroportIdAterizare = response.data[0].id;
      }
    )

    this.router.navigate(['/rezultateCautare']);
  }

  private apiUrlIdAeroport = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '2ddb2ae3efmsh396fe59739382a7p1e24c1jsn39c9223568fc',
    'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
  })



}
