import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

// imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
