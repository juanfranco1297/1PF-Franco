import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.email),
      password: this.fb.control('')
    })
  }
  onSubmit(): void{
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.value).subscribe();
    }  
  }
}
