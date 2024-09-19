import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TabelCautareZboruri } from "../cautare-bilete-avion/tabel-cautare-zboruri/tabel-cautare-zboruri.component";
import { AuthService } from '../pagina-creare-cont/auth.service';
import {  RouterOutlet } from "@angular/router";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-rezultat-cautare',
  standalone: true,
  templateUrl: './rezultat-cautare.component.html',
  styleUrls: ['./rezultat-cautare.component.scss'],
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
    TabelCautareZboruri,
    RouterOutlet,
    LoaderComponent
]
})
export class RezultatCautareComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService
  ) {}


  username: string | null = '';
  data: any = [];
  dataFiltrata: any = [];
  aeroportDus: string = '';
  aeroportAterizare: string = '';
  dataDus: string = '';
  seIncarcaPagina: boolean = true;
  adulti: number = 0;
  copii: number = 0;
  afisareOptiuni: boolean = false;
  private headers = new HttpHeaders({
    'x-rapidapi-key': '5261d28f31mshd3dd0c81ef9067ep1b8f36jsn94c2dc077390',
    'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
  });
  dataIntors: string = '';
  zborDusIntors: boolean = false;

  zborDirect: boolean = false;
  zborCuEscala: boolean = false;
  zborCuMinimDouaEscale: boolean = false;


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.aeroportDus = params['aeroportDus'];
      this.aeroportAterizare = params['aeroportAterizare'];
      this.dataDus = params['dataDus'];
      this.dataIntors = params['dataIntors'] || null;
      this.adulti = params['adulti'];
      this.copii = params['copii'];
      this.username = this.authService.getUsername();
      console.log(this.dataIntors);

      if(this.dataIntors != null)
        this.zborDusIntors = true;

      if (!this.aeroportDus || !this.aeroportAterizare || !this.dataDus || this.adulti === null || this.adulti === undefined) 
        this.router.navigate(['/cautareBilete']);
      else 
        this.preluareDateZbor();

    });
  }

  afiseazaLoader(): void {this.seIncarcaPagina = true;}

  afisareOptiuniSortare(): void {
    this.afisareOptiuni = !this.afisareOptiuni;
  }

  aplicaFiltru() {
    this.dataFiltrata = this.data.filter((zbor: any) => {
      const numarEscaleDus = zbor.legs[0].segments.length - 1;
      if(this.zborDirect && numarEscaleDus == 0)
        return true;
      if (this.zborCuEscala && numarEscaleDus == 1) {
        return true;
      }
      if (this.zborCuMinimDouaEscale && numarEscaleDus >= 2) {
        return true;
      }
        return false;
      });

    if (!this.zborDirect && !this.zborCuEscala && !this.zborCuMinimDouaEscale) {
      this.dataFiltrata = this.data;
    }

  }


  sortareDupaPret(): void {
    this.dataFiltrata = this.dataFiltrata.sort(
      (a: any, b: any) => a.price.raw - b.price.raw
    );
  }

  sortareDupaTimp(): void {
      this.dataFiltrata.sort((a: any, b: any) => {
        return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;
      });
    }

sortareDupaOraDePlecare(): void {
  this.dataFiltrata.sort((a: any, b: any) => {
    const [oraA, minutA] = a.legs[0].departure.split(':').map(Number);
    const [oraB, minutB] = b.legs[0].departure.split(':').map(Number);  
  return (oraA * 60 + minutA) - (oraB * 60 + minutB)
});
}

  formatareOraZbor(): void {
    for (const index in this.data) {
      let datePlecareDus = new Date(this.data[index].legs[0].arrival);
      let dateSosireDus = new Date(this.data[index].legs[0].departure);

      if(this.zborDusIntors){
        let datePlecareIntors = new Date(this.data[index].legs[1].arrival);
        let dateSosireIntors = new Date(this.data[index].legs[1].departure);

        let oraPlecareIntors = datePlecareIntors.getHours().toString().padStart(2, '0');
        let minutPlecareIntors = datePlecareIntors.getMinutes().toString().padStart(2, '0');
        let oraSosireIntors = dateSosireIntors.getHours().toString().padStart(2, '0');
        let minutSosireIntors = dateSosireIntors.getMinutes().toString().padStart(2, '0');
  
        this.data[index].legs[1].arrival = `${oraPlecareIntors}:${minutPlecareIntors}`;
        this.data[index].legs[1].departure = `${oraSosireIntors}:${minutSosireIntors}`;
      }

      let oraPlecareDus = datePlecareDus.getHours().toString().padStart(2, '0');
      let minutPlecareDus = datePlecareDus.getMinutes().toString().padStart(2, '0');
      let oraSosireDus = dateSosireDus.getHours().toString().padStart(2, '0');
      let minutSosireDus = dateSosireDus.getMinutes().toString().padStart(2, '0');

      this.data[index].legs[0].arrival = `${oraPlecareDus}:${minutPlecareDus}`;
      this.data[index].legs[0].departure = `${oraSosireDus}:${minutSosireDus}`;
    }
  }

  preluareDateZbor(): void {
    if (!this.zborDusIntors) {
      const inceputUrlNumaiDus = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/search-one-way?fromId=';
      const urlNumaiDus = `${inceputUrlNumaiDus}${this.aeroportDus}&toId=${this.aeroportAterizare}&departDate=${this.dataDus}&adults=${this.adulti}&children=${this.copii}&cabinClass=economy&currency=RON`;

      console.log(urlNumaiDus);
      this.http.get<any>(urlNumaiDus, { headers: this.headers }).subscribe(
        (response) => {
          try{
            console.log(response);
            this.data = response.data.itineraries.sort(
              (a: any, b: any) => a.price.raw - b.price.raw
            );
            console.log(this.data);
            this.formatareOraZbor();
            this.aplicaFiltru(); 
            console.log(this.data);
            this.seIncarcaPagina = false;
          }
            catch(TypeError){
              alert("Nu sunt zboruri pentru aceasta ruta.")
              return;
            }
        }
      );
    } 
    else {
      const dataFormatataDus = this.datePipe.transform(this.dataDus, 'yyyy-MM-dd');
      const dataFormatataIntors = this.datePipe.transform(this.dataIntors, 'yyyy-MM-dd');

      const inceputUrlDusIntors = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip?fromId=';
      const urlDusIntors = `${inceputUrlDusIntors}${this.aeroportDus}&toId=${this.aeroportAterizare}&departDate=${dataFormatataDus}&returnDate=${dataFormatataIntors}&adults=${this.adulti}&children=${this.copii}&cabinClass=economy&currency=RON`;

      this.http.get<any>(urlDusIntors, { headers: this.headers }).subscribe(
        (response) => {
          try{
          this.data = response.data.itineraries.sort(
            (a: any, b: any) => a.price.raw - b.price.raw
          );
          this.formatareOraZbor();
          this.aplicaFiltru(); 
          console.log(this.data);
          this.seIncarcaPagina = false;
        }
          catch(TypeError){
            alert("Nu sunt zboruri pentru aceasta ruta.")
            return;
          }
        }
      );
    }
  }

  deconectare(): void{
    this.authService.stergeToken();
    this.router.navigate(['/']);
  }
}