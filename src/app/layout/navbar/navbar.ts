import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  userService = inject(UserService);
  router = inject(Router);

  async logout() {
    try {
      await this.userService.logout();

      this.router.navigate(['']);
    } catch(error) {
      console.error(error);
    }
  }
}
