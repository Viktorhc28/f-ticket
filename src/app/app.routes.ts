import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'ciudad', loadChildren: () => import('./components/ciudad/ciudad.module').then(m => m.CiudadModule) },
    { path: 'autobus', loadChildren: () => import('./components/autobus/autobus.module').then(m => m.AutobusModule) }
];
