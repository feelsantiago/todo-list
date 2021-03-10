import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private readonly router: Router, private readonly authenticationService: AuthService) {}

    public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.authenticationService.isAuthenticated();

        if (isAuthenticated) {
            return true;
        }

        void this.router.navigate(['/auth']);
        return false;
    }
}
