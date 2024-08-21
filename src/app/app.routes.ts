import { Routes } from '@angular/router';
import { PaginaCreareContComponent } from "./pagina-creare-cont/pagina-creare-cont.component";
import {PaginaLogareComponent} from "./pagina-logare/pagina-logare.component";
import {CautareBileteAvionComponent} from "./cautare-bilete-avion/cautare-bilete-avion.component";
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
  {
    path: 'creareCont',
    component: PaginaCreareContComponent
  },
  {
    path: 'logare',
    component: PaginaLogareComponent
  },
  {
    path: 'cautareBilete',
    component: CautareBileteAvionComponent,
    canActivate: [AuthGuardService]
  }
];
