import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ClassicComponent } from './extras/classic/classic.component';
import { ModernComponent } from './extras/modern/modern.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Legotf',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Legotf' }]
    },
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ClassicComponent,
    ModernComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ], exports: [
    ModernComponent,
    ClassicComponent
  ]
})
export class DashboardModule { }
