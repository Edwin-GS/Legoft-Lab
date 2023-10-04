import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AUTH_ROUTES } from './auth.routes';
import { HelpersModule } from '../../helpers.module';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
  ],

  imports: [
    CommonModule,
    HelpersModule,
    AUTH_ROUTES,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
