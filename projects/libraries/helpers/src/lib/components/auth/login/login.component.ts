import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from '../../../services/handler.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  appName = 'Legoft';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';
  dashboard = 'legoft-lab/client/:user/:user_id';
  @Input() isAdmin = false;

  loginForm: FormGroup;
  isLoggedin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hs: HandlerService
  ) {
    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.group({
        userOrEmail: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(150),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$'
            ),
          ],
        ],
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      localStorage.setItem('LEGOFT_SID_SITE', '');

      const user = this.loginForm.value.user;
      const userId = this.loginForm.value.user_id;

      this.hs.post(user, `users/login`).subscribe(
        (resp) => {
          if (resp['success'] === false) {
            console.log('Error creating user');
          } else {
            console.log(resp, 'Esto es la respuesta');
            this.isLoggedin = true;
            const updatedDashboard = this.dashboard
              .replace(':user', user)
              .replace(':user_id', userId);
            this.router.navigate([updatedDashboard, { user, userId }]);
          }
        },
        (err) => {
          console.error('Error creating user: ' + err);
        }
      );
    }
  }
}
