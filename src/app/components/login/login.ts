import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { Error } from '../../modals/error/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormField, FormsModule, Error],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @ViewChild(Error)
  error!: Error;

  loading = signal(false);

  submitted = signal(false);

  constructor (private userService: UserService, private router: Router) {}

  userModel = signal<User>({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    edad: 0
  })

  loginForm = form(this.userModel, (path) => {
    required(path.email);
    email(path.email);

    required(path.password);
    minLength(path.password, 6);
  })

  async submit() {
    if(this.loading()) return;

    this.submitted.set(true);

    if(this.loginForm().invalid()) return;

    this.loading.set(true);

    try {
      await this.userService.login(this.userModel());
      this.router.navigate(['']);
    } catch(err:any) {
      this.error.title = 'Error al iniciar sesión';
      this.error.message = err.message;
      this.error.show();
    } finally {
      this.loading.set(false);
    }
  }
}
