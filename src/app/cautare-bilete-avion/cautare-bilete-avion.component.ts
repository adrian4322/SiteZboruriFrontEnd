import { Component, ViewChild, HostListener  } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AeropoarteComponent } from '../aeropoarte/aeropoarte.component';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import { forkJoin } from 'rxjs'; 

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
    FormsModule,
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
  aeroportDus: string = '';
  aeroportAterizare: string = '';
  dataDus: any = '';
  dataIntors: any = '';
  aeroportIdDus: any = '';
  aeroportIdAterizare: any = '';

  @ViewChild('dropdown') dropdown: any;

  constructor(private router: Router, private http: HttpClient, private datePipe: DatePipe) { }

  private apiUrlIdAeroport = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '2ddb2ae3efmsh396fe59739382a7p1e24c1jsn39c9223568fc',
    'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
  });

  plusareAdulti() { if (this.adulti < 8) this.adulti++, this.total++; }
  plusareTineri() { if (this.tineri < 5) this.tineri++, this.total++; }
  plusareCopii() { if (this.copii < 5) this.copii++, this.total++; }

  scadereAdulti() { if (this.adulti > 0) this.adulti--, this.total--; }
  scadereTineri() { if (this.tineri > 0) this.tineri--, this.total--; }
  scadereCopii() { if (this.copii > 0) this.copii--, this.total--; }

  afisareMeniuPasageri() { this.afisare = !this.afisare; }

  schimbaValoareIntors() { this.dusIntors = false; }
  schimbaValoareDusIntors() { this.dusIntors = true; }

  aeroportDusSelectat(airport: string) { this.aeroportDus = airport; }
  aeroportAterizareSelectat(airport: string) { this.aeroportAterizare = airport; } 

  @HostListener('document:click', ['$event.target'])
  clickAfara(targetElement: HTMLElement): void {
    if (this.dropdown && this.dropdown.nativeElement && !this.dropdown.nativeElement.contains(targetElement)) {
      this.afisare = false;
    }
  }

  onSubmit(): void {
    const dataFormatataDus = this.datePipe.transform(this.dataDus, 'yyyy-MM-dd');
    const dataFormatataIntors = this.dataIntors ? this.datePipe.transform(this.dataIntors, 'yyyy-MM-dd') : null;
    let dataCurenta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if(dataFormatataDus != null && dataCurenta != null && dataFormatataDus < dataCurenta) {
      alert('Data de plecare nu poate fi mai mică decât data curentă');
      return;
    }

    if (dataFormatataDus && dataFormatataIntors && dataFormatataDus > dataFormatataIntors) {
      alert("Data de plecare nu poate fi mai mare decat data de intoarcere");
      return;
    }

    const urlDus = `${this.apiUrlIdAeroport}${this.aeroportDus}`;
    const urlAterizare = `${this.apiUrlIdAeroport}${this.aeroportAterizare}`;

    forkJoin({
      aeroportDus: this.http.get<any>(urlDus, { headers: this.headers }),
      aeroportAterizare: this.http.get<any>(urlAterizare, { headers: this.headers })
    }).subscribe(results => {
      this.aeroportIdDus = results.aeroportDus.data[0].id;
      this.aeroportIdAterizare = results.aeroportAterizare.data[0].id;

      const queryParams = {
        aeroportDus: this.aeroportIdDus,
        aeroportAterizare: this.aeroportIdAterizare,
        dataDus: dataFormatataDus,
        dataIntors: dataFormatataIntors,
        adulti: this.adulti,
        copii: this.copii
      };

      this.router.navigate(['/rezultateCautare'], { queryParams });
    });
  }
}
