import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponse, AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {SignUp} from "../shared/user.model";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    authForm!: FormGroup;
    loginMode = false;
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.authForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSwitchMode() {
        this.loginMode = !this.loginMode;
    }

    onSubmit() {
        let authObs: Observable<AuthResponse | SignUp>;
        authObs = this.loginMode ?
            this.authService.login(this.authForm.value) : this.authService.register(this.authForm.value);
        authObs.subscribe({
            next: res => {
                this.router.navigate(['recipes']).then();
                const token = res.token;
                this.authService.setToken(token);
            }, error: err => {
                this.error = err.error.message;
            }
        })
        this.authForm.reset();
    }
    
    onHandleError() {
        this.error = '';
    }
    
    ngOnDestroy(): void {
    }
}