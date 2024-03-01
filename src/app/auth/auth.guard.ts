import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map, take} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
    
    /*const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthenticated()) {
        return true;
    } else {
        authService.logout();
        router.navigate(['auth']).then();
        return false;
    }*/
    
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.user.pipe(
        take(1),
        map(user => {
            const isAuth = authService.isAuthenticated();
            if (isAuth) {
                return true;
            }
            return router.createUrlTree(['auth'])
        })
    )
};
