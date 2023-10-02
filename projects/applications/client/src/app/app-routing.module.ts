import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';


const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../../../libraries/helpers/src/lib/components/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]

})
export class AppRoutingModule {}
