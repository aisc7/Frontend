import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      this.securityService.register(this.registerForm.value).subscribe({
        next: (data) => {
          this.securityService.saveSession(data);
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          Swal.fire(
            'Invalid Registration',
            'Could not create account',
            'error'
          );
        }
      });
    }
  }
}