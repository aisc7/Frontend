import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroupValidator: FormGroup;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.formBuilding()
  }
  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }
  userData(): User {
    let theUser = new User();
    theUser.email = this.formGroupValidatorData.email.value;
    theUser.password = this.formGroupValidatorData.password.value;
    return theUser;
  }
  login() {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    let theUser = this.userData()
    this.securityService.login(theUser).subscribe({
      next: (data) => {
        console.log("llamando")
        console.log("resultado del login " + data)
        this.getUserFromToken(data)
        
        this.router.navigate(['pages/dashboard']);
        
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña inválido',
          icon: 'error',
          timer: 5000
        });
      }
    }
    );
  }
  getUserFromToken(token: string) {
    this.securityService.getUserFromToken(token).subscribe({
      next:dataUser=>{
        console.log(dataUser)
        let theUser:User={
          "_id":dataUser["_id"],
          "name":dataUser["name"],
          "email":dataUser["email"],
          "password": '', // Add a default or fetched password here
          "token":token,
          "role":dataUser["role"]
        }
        this.securityService.saveSession(theUser);
      }
    })
  }

  ngOnDestroy() {
  }

}