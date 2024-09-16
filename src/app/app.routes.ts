import { Routes } from '@angular/router';
import { PaginaCreareContComponent } from "./pagina-creare-cont/pagina-creare-cont.component";
import {PaginaLogareComponent} from "./pagina-logare/pagina-logare.component";
import {CautareBileteAvionComponent} from "./cautare-bilete-avion/cautare-bilete-avion.component";
import { AuthGuardService } from './auth-guard.service';
import { RezultatCautareComponent } from './rezultat-cautare/rezultat-cautare.component';
import { BackgroundComponent } from './HomePage/background/background.component';

export const routes: Routes = [
  {
    path: '',
    component: BackgroundComponent,
  },
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
  },
  {
  path: 'rezultateCautare',
  component: RezultatCautareComponent,
  canActivate: [AuthGuardService]
  },
  { path: '**', 
    redirectTo: 'logare', 
    pathMatch: 'full' }

];
