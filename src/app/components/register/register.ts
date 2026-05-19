import { Component, signal } from '@angular/core';
import { UserRegister } from '../../interfaces/interfaces';
import { form, required, email, minLength, FormField } from '@angular/forms/signals'

@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  submitted = signal(false);

  userModel = signal<UserRegister>({
    email: '',
    nombre: '',
    apellido: '',
    edad: 0,
    password: ''
  })

  registerForm = form(this.userModel, (path) => {
    required(path.email);
    email(path.email);

    required(path.nombre);

    required(path.apellido);

    required(path.edad);

    required(path.password);
    minLength(path.password, 6);
  })

  submit() {
    this.submitted.set(true);

    if(this.registerForm().invalid()) {
      return;
    }

    console.log(this.userModel());
  }

}
