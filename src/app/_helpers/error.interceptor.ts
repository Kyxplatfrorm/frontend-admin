import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from "@angular/common/http";
import { Observable, ReplaySubject, throwError } from "rxjs";
import { catchError, filter, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as alertifyjs from "alertifyjs";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private translate: TranslateService,
        private _matSnackBar: MatSnackBar
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 403) {
                    this.router.navigate(["auth/login"]);
                } else {
                    alertifyjs.error(err.error.ErrorDescription);
                }

                return throwError(err);
            })
        );
    }
}
