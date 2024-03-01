import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(`http://localhost:8080/api/v1/auth/login`)) {
            return next.handle(req);
        }
        if (req.url.includes(`http://localhost:8080/api/v1/auth/register`)) {
            return next.handle(req);
        }
        this.authService.loadToken();
        const token = this.authService.token;
        const request = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        return next.handle(request);
    }
}