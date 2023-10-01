import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LicenseComponent } from './licenses/extra/license/license.component';
import {USER_ROUTES} from "./users-ms.routes";



@NgModule({
  declarations: [
    UsersComponent,
    LicensesComponent,
    LicenseComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES
  ]
})
export class UsersMsModule { }
