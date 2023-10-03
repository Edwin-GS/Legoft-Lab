import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";

const AuthRoutes: Routes = [

  {
    path: '',
    title: 'Legoft',
    component: LoginComponent
  },
  {
    path: 'signup',
    title: 'Legoft',
    component: SignupComponent
  },
  {
    path: 'not-found',
    title: 'Legoft',
    component: NotFoundComponent
  },
  {
    path: 'legoft-lab',
    loadChildren: () =>
      import('../../../../../../applications/client/src/app/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'verify-email/:confirm',
    title: 'Legoft',
    component: VerifyEmailComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

export const AUTH_ROUTES = RouterModule.forChild(AuthRoutes);
