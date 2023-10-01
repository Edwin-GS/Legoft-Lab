import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DASHBOARD_ROUTES} from "./dashboard.routes";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DASHBOARD_ROUTES
  ]
})
export class DashboardModule { }
