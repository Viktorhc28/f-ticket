import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CiudadIndexComponent } from './ciudad-index/ciudad-index.component';


const routes: Routes = [
  { path: 'index', component: CiudadIndexComponent },
  { path: '**', redirectTo: 'index' }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CiudadModule { }
