import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject, tap} from "rxjs";
import {SignUp, User} from "../shared/user.model";
import {Router} from "@angular/router";

export interface AuthData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _token!: string | null;
    authChanged = new Subject<boolean>();
    user = new BehaviorSubject<SignUp | User | null>(null);
    
    constructor(private http: HttpClient, private router: Router) {
        this.loadToken();
        if (this.token) {
            this.router.navigate(['recipes']).then();
        } else {
            this.user.next(null);
        }
    }
    
    
    register(form: AuthData) {
        return this.http.post<SignUp>("http://localhost:8080/api/v1/auth/register", form)
            .pipe(tap(res => {
                const user = new SignUp(res.token, res.createdAt);
                this.user.next(user);
            }));
    }

    login(form: AuthData) {
        return this.http.post<AuthResponse>("http://localhost:8080/api/v1/auth/login", form);
    }

    setToken(token: string) {
        this._token = token;
        localStorage.setItem('token', token);
    }
    
    addUserToLocalStorage(user: AuthResponse) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    loadToken() {
        this._token = localStorage.getItem('token');
        if (this._token) {
            const user = new User('', '');
            this.user.next(user);
        } else {
            this.user.next(null);
        }
    }
    
    isAuthenticated(): boolean {
        return !!this.token;
    }
    
    get token(): string | null {
        return this._token;
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('token');
    }
}