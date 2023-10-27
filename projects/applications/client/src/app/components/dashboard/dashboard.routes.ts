import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ClassicComponent } from './extras/classic/classic.component';

const DashboardRoutes: Routes = [
  {
    path: 'client/:user/:user_id',
    title: 'Legoft',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../microservices/user-ms/user-ms.module').then(
            (m) => m.UserMsModule
          ),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('../microservices/app-ms/app-ms.module').then(
            (m) => m.AppMsModule
          ),
      },
      {
        path: 'schemaentity',
        loadChildren: () =>
          import('../microservices/entity-ms/entity-ms.module').then(
            (m) => m.EntityMsModule
          ),
      },
    ],
  },
];

export const DASHBOARD_ROUTES = RouterModule.forChild(DashboardRoutes);
