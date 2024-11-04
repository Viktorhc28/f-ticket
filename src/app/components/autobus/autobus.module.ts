import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutobusIndexComponent } from './autobus-index/autobus-index.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'index', component: AutobusIndexComponent },
  { path: '**', redirectTo: 'index' }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AutobusModule { }
