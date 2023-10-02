import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AUTH_ROUTES} from "./auth.routes";
import {HelpersModule} from "../../helpers.module";



@NgModule({
  declarations: [
    NotFoundComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    AUTH_ROUTES
  ]
})
export class AuthModule { }
