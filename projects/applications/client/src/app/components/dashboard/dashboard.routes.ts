import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ClassicComponent } from './extras/classic/classic.component';

/**
 * Base route information
 *
 * Dashboard Client App >> /legoft-lab/client/:user/:user_id
 *
 * **/

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
      {
        path: 'entities/:application_id',
        loadChildren: () =>
          import('../microservices/entity-ms/entity-ms.module').then(
            (m) => m.EntityMsModule
          ),
      },
    ],
  },

  // {
  //   path: 'owner/:user/:user_id',
  //   loadChildren: () =>
  //     import(
  //       '../../../../../owner/src/app/components/dashboard/dashboard.module'
  //     ).then((m) => m.DashboardModule),
  // },
];

export const DASHBOARD_ROUTES = RouterModule.forChild(DashboardRoutes);
