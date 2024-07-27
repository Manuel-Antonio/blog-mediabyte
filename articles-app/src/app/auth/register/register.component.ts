import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;

      this.usersService.registerUser({ username, password }).subscribe({
        next: (response) => {
          this.alertService.showAlert('Registration successful! You can now log in.', 'success');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); 
          
         
          this.registerForm.reset();
        },
        error: (error) => {
          console.error('Registration error:', error);

          const errorMessage = error.status === 409
            ? 'Username already exists. Please choose another one.'
            : error.error?.message || 'Registration failed. Please try again.';

          this.alertService.showAlert(errorMessage, 'error');
        }
      });
    }
  }
}
