import { Component, ViewChild, HostListener, EventEmitter, Output  } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AeropoarteComponent } from '../../aeropoarte/aeropoarte.component';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-tabel-cautare-zboruri',
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
  templateUrl: './tabel-cautare-zboruri.component.html',
  styleUrls: ['./tabel-cautare-zboruri.component.scss']
})
export class TabelCautareZboruri {

  adulti: number = 0;
  tineri: number = 0;
  copii: number = 0;
  total: number = 0;
  afisare: boolean = false;
  dusIntors: boolean = true;
  aeroportDus: string = '';
  aeroportAterizare: string = '';
  dataDus: any = '';
  dataIntors: any = '';
  aeroportIdDus: any = '';
  aeroportIdAterizare: any = '';

  @ViewChild('dropdown') dropdown: any;

@Output() cautareZboruri : EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private http: HttpClient, private datePipe: DatePipe) { }

  private apiUrlIdAeroport = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '5261d28f31mshd3dd0c81ef9067ep1b8f36jsn94c2dc077390',
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
    if (!this.dusIntors) {
      if (!this.dataDus || this.adulti < 1 || !this.aeroportDus || !this.aeroportAterizare) {
        alert("Nu ai introdus toate datele pentru un zbor dus!");
        return;
      }
    } 
    else {
      if (!this.dataDus || !this.dataIntors || this.adulti < 1 || !this.aeroportDus || !this.aeroportAterizare) {
        alert("Nu ai introdus toate datele pentru un zbor dus-întors!");
        return;
      }
    }
  
    const dataFormatataDus = this.datePipe.transform(this.dataDus, 'yyyy-MM-dd');
    const dataFormatataIntors = this.datePipe.transform(this.dataIntors, 'yyyy-MM-dd');
    const dataCurenta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  
    if (dataFormatataDus && dataCurenta && dataFormatataDus < dataCurenta) {
      alert('Data de plecare nu poate fi mai mică decât data curentă');
      return;
    }
  
    if (this.dusIntors && dataFormatataDus && dataFormatataIntors && dataFormatataDus > dataFormatataIntors) {
      alert("Data de plecare nu poate fi mai mare decat data de intoarcere");
      return;
    }
  
    const urlDus = `${this.apiUrlIdAeroport}${this.aeroportDus}`;
    const urlAterizare = `${this.apiUrlIdAeroport}${this.aeroportAterizare}`;
  
    forkJoin({
      aeroportDus: this.http.get<any>(urlDus, { headers: this.headers }),
      aeroportAterizare: this.http.get<any>(urlAterizare, { headers: this.headers })
    }).subscribe(results => {
      if (!results.aeroportDus.data.length || !results.aeroportAterizare.data.length) {
        alert('Aeroporturile introduse nu au fost găsite!');
        return;
      }
  
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
  
      this.cautareZboruri.emit();
      this.router.navigate(['/rezultateCautare'], { queryParams });
    });
  }
  
}
