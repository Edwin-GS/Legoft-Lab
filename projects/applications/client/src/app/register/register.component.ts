import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      user: [
        '', // Initial value for user
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      email: [
        '', // Initial value for email
        [
          Validators.required,
          Validators.email,
          Validators.minLength(1),
          Validators.maxLength(150),
        ],
      ],
      password: [
        '', // Initial value for password
        [Validators.required],
      ],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Form submission logic here
      console.log('Formulario enviado:', this.registrationForm.value);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Getter functions for form controls
  get user() {
    return this.registrationForm.get('user');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
}
