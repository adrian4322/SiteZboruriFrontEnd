import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, Host  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aeropoarte',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './aeropoarte.component.html',
  styleUrls: ['./aeropoarte.component.scss'] 
})
export class AeropoarteComponent implements OnInit {

  url: string = '../../assets/airports.json';
  aeropoarte: any[] = [];
  aeropoarteFiltrate: any[] = [];
  afisareAeropoarte: boolean = false;
  valoareInput: string = '';

  constructor (private http: HttpClient, private elem: ElementRef) {}

@Output() aeroportSelectat = new EventEmitter<string>();

  ngOnInit(): void {
    this.http.get<any[]>(this.url).subscribe(data =>{
      this.aeropoarte = Object.values(data); 
    });
  }

  inputCautareAeroport(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query) {
      this.aeropoarteFiltrate = this.aeropoarte.filter((aeroport: any) => 
        aeroport.city.toLowerCase().startsWith(query) || 
        aeroport.country.toLowerCase().startsWith(query)
      );
    } else {
      this.aeropoarteFiltrate = []; 
    }
}


  selectAeroport(aeroport: any): void {
    this.valoareInput = `${aeroport.city}, ${aeroport.country}`;
    this.afisareAeropoarte = false;
    this.aeroportSelectat.emit(aeroport.city);
  }
  
  @HostListener('document:click', ['$event'])
  clickAfara(event : any) {
    if (!this.elem.nativeElement.contains(event.target)) {
      this.afisareAeropoarte = false;
    }
  }

}
