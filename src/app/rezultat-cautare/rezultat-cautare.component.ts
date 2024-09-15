import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rezultat-cautare',
  standalone: true,
  templateUrl: './rezultat-cautare.component.html',
  styleUrls: ['./rezultat-cautare.component.scss'],
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    FormsModule
  ]
})
export class RezultatCautareComponent implements OnInit {

  data: any = [];
  dataFiltrata: any = [];
  aeroportDus: string = '';
  aeroportAterizare: string = '';
  dataDus: string = '';
  dataIntors: string = '';
  seIncarcaPagina: boolean = true;
  adulti: number = 0;
  copii: number = 0;

  //optiuni filtre
  zborDirect: boolean = false;
  zborCuEscala: boolean = false;
  zborCuMinimDouaEscale: boolean = false;

  aplicaFiltru() {
    this.dataFiltrata = this.data.filter((zbor: any) => {
      const numarEscale = zbor.legs[0].segments.length - 1;
      if(this.zborDirect && numarEscale == 0)
        return true;
      if (this.zborCuEscala && numarEscale == 1) {
        return true;
      }
      if (this.zborCuMinimDouaEscale && numarEscale >= 2) {
        return true;
      }
        return false;
    });

    if (!this.zborDirect && !this.zborCuEscala && !this.zborCuMinimDouaEscale) {
      this.dataFiltrata = this.data; 
    }
  }


  private headers = new HttpHeaders({
    'x-rapidapi-key': '2ddb2ae3efmsh396fe59739382a7p1e24c1jsn39c9223568fc',
    'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.aeroportDus = params['aeroportDus'];
      this.aeroportAterizare = params['aeroportAterizare'];
      this.dataDus = params['dataDus'];
      this.dataIntors = params['dataIntors'];
      this.adulti = params['adulti'];
      this.copii = params['copii'];

      if (!this.aeroportDus || !this.aeroportAterizare || !this.dataDus || this.adulti === null || this.adulti === undefined) 
        this.router.navigate(['/cautareBilete']);
      else 
        this.preluareDateZbor();
      

    });
  }


  sortareDupaPret(): void {
    this.data = this.data.itineraries.sort(
      (a: any, b: any) => a.price.raw - b.price.raw
    );
  }

  formatareOraZbor(): void {
    for (const index in this.data) {
      let datePlecare = new Date(this.data[index].legs[0].arrival);
      let dateSosire = new Date(this.data[index].legs[0].departure);

      let oraPlecare = datePlecare.getHours().toString().padStart(2, '0');
      let minutPlecare = datePlecare.getMinutes().toString().padStart(2, '0');
      let oraSosire = dateSosire.getHours().toString().padStart(2, '0');
      let minutSosire = dateSosire.getMinutes().toString().padStart(2, '0');

      this.data[index].legs[0].arrival = `${oraPlecare}:${minutPlecare}`;
      this.data[index].legs[0].departure = `${oraSosire}:${minutSosire}`;
    }
  }

  preluareDateZbor(): void {
    if (this.dataIntors == null) {
      const inceputUrlNumaiDus = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/search-one-way?fromId=';
      const urlNumaiDus = `${inceputUrlNumaiDus}${this.aeroportDus}&toId=${this.aeroportAterizare}&departDate=${this.dataDus}&adults=${this.adulti}&children=${this.copii}&cabinClass=economy&currency=RON`;

      this.http.get<any>(urlNumaiDus, { headers: this.headers }).subscribe(
        (response) => {
          this.data = response.data;
          this.sortareDupaPret();
          this.formatareOraZbor();
          this.aplicaFiltru(); 
          console.log(this.data);
          this.seIncarcaPagina = false;
        }
      );
    } else {
      const dataFormatataDus = this.datePipe.transform(this.dataDus, 'yyyy-MM-dd');
      const dataFormatataIntors = this.datePipe.transform(this.dataIntors, 'yyyy-MM-dd');

      const inceputUrlDusIntors = 'https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip?fromId=';
      const urlDusIntors = `${inceputUrlDusIntors}${this.aeroportDus}&toId=${this.aeroportAterizare}&departDate=${dataFormatataDus}&returnDate=${dataFormatataIntors}&adults=${this.adulti}&children=${this.copii}&cabinClass=economy&currency=RON`;

      this.http.get<any>(urlDusIntors, { headers: this.headers }).subscribe(
        (response) => {
          this.data = response.data;
          this.sortareDupaPret();
          this.formatareOraZbor();
          console.log(this.data);
          this.seIncarcaPagina = false;
        }
      );
    }
  }
}
