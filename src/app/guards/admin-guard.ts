import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  await userService.loadUser();

  const user = userService.currentUser();

  if(user?.es_admin) {
    return true;
  }

  router.navigate(['']);
  return false
};
