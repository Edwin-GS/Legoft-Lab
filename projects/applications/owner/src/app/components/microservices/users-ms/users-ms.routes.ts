import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {LicensesComponent} from "./licenses/licenses.component";
import {LicenseComponent} from "./licenses/extra/license/license.component";

/**
 * Base route information
 *
 * users >> /legoft-lab/owner/:user/user_id/users
 *
 * licenses >> /legoft-lab/owner/:user/user_id/users/license
 *
 * license >> /legoft-lab/owner/:user/user_id/users/license
 * **/

const UserRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    title: 'Users'
  },
  {
    path: 'licenses',
    component: LicensesComponent,
    title: 'Licenses'
  },
  {
    path: 'license',
    component: LicenseComponent,
    title: 'License'
  }
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);

