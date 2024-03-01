import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() featureSelected = new EventEmitter<string>();
    isAuthenticated = false;
    private userSub!: Subscription;

    constructor(private authService: AuthService, private router: Router) {
    }
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe({
            next: res => {
                this.isAuthenticated = !!res;
            }
        });
    }

    onLogout() {
        this.authService.logout();
        this.isAuthenticated = false;
        this.authService.authChanged.next(this.isAuthenticated);
        this.router.navigate(['auth']).then();
    }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}