import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const DashboardRoutes: Routes = [
  {
    path: 'dashboard/:user/:user_id',
    title: 'Legoft',
    component: DashboardComponent,
  },
  {
    path: 'users/:user/:user_id',
    loadChildren: () =>
      import('../../../../../../applications/client/src/app/microservices/user-ms/user-ms.module').then(m => m.UserMsModule)
  },
  {
    path: 'applications/:user/:user_id',
    loadChildren: () =>
      import('../../../../../../applications/client/src/app/microservices/app-ms/app-ms.module').then(m => m.AppMsModule)
  },
  {
    path: 'entities/:user/:user_id',
    loadChildren: () =>
      import('../../../../../../applications/client/src/app/microservices/entity-ms/entity-ms.module').then(m => m.EntityMsModule)
  }
];

export const DASHBOARD_ROUTES = RouterModule.forChild(DashboardRoutes);
