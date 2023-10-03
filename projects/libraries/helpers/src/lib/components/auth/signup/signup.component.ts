import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  appName = 'Legoft';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Data submitted :', this.signupForm.value);
    }
  }
}
