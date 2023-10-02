import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

/**
 * Base route information
 *
 * Dashboard Owner App >> /legoft-lab/owner/:user/:user_id
 *
 * **/

const DashboardRoutes: Routes = [
  {
    path: '',
    title: 'Legoft',
    component: DashboardComponent,
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../microservices/users-ms/users-ms.module').then(m => m.UsersMsModule)
  }
];

export const DASHBOARD_ROUTES = RouterModule.forChild(DashboardRoutes);
