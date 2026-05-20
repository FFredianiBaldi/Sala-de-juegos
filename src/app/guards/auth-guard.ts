import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const router = inject(Router);

  await userService.loadUser();

  if(userService.currentUser()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
