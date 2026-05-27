import { Component, signal } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { form, required, email, minLength, FormField } from '@angular/forms/signals'
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormField, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  loading = signal(false);

  constructor(private userService: UserService, private router: Router) {}

  submitted = signal(false);

  userModel = signal<User>({
    id: 0,
    email: '',
    nombre: '',
    apellido: '',
    edad: 0,
    password: '',
    es_admin: false
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

  async submit() {
    if(this.loading()) return;

    this.submitted.set(true);

    if(this.registerForm().invalid()) {
      return;
    }

    this.loading.set(true);

    try {

      await this.userService.register(this.userModel());

      await this.userService.login(this.userModel());
      this.router.navigate(['']);
    } catch (error:any) {
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

}
