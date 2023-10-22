import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandlerService } from '../../../services/handler.service';
import { environment } from '../../../../../../../applications/client/src/environments/environment';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  appName = 'Legoft';
  viche = 'assets/img/viche.png';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';

  signupForm: FormGroup;
  notifier: boolean = false;
  errornotifier: boolean = false;
  larespuesta: string = '';

  constructor(private formBuilder: FormBuilder, private hs: HandlerService) {
    this.signupForm = this.formBuilder.group({
      user: this.formBuilder.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25),
          ],
        ],
        email: [
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
      screen: this.formBuilder.group({
        header: [1, [Validators.required]],
      }),
      notifier: [false],
      errornotifier: [false],
    });
  }

  onSubmit() {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      const sendEmail = {
        to: this.signupForm.value.user.email,
        subject: 'Check your Email',
        url: `${environment.LEGOFT_BACKEND_URL}`,
        msg: {
          title: 'Check your Email',
          text: 'To verify your email click on the link.',
          reply: 'This is an automated email, please do not reply.',
        },
        user: {
          user: this.signupForm.value.user.username,
          email: this.signupForm.value.user.email,
          password: this.signupForm.value.user.password,
          screen: {
            header: 1,
          },
        },
      };

      this.hs.post(sendEmail, `notifier`).subscribe(
        (resp) => {
          if (resp['success'] === false) {
            this.errornotifier = true;
            this.larespuesta = resp['message'];
          } else {
            this.notifier = true;
          }
        },
        (err) => {
          this.errornotifier = true;
          this.larespuesta = err['message'];
        }
      );
      (err: string) => {
        this.errornotifier = true;
        this.larespuesta = err;
      };
    }
  }

  closeDialog() {
    this.signupForm.reset();
    this.notifier = false;
  }

  closeDialog2() {
    this.errornotifier = false;
  }
}
