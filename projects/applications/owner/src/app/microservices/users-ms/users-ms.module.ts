import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LicenseComponent } from './licenses/extra/license/license.component';



@NgModule({
  declarations: [
    UsersComponent,
    LicensesComponent,
    LicenseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersMsModule { }
