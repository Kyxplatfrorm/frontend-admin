import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "@fuse/services";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private translateService: TranslateService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let headers;
        var lang = localStorage.getItem("currentLanguage");
        if (lang == "" || lang == null) {
            lang = "en";
        }

        headers = {
            Language: lang,
        };

        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.Token) {
            headers = {
                Authorization: `Bearer ${currentUser.Token}`,
                Language: lang,
            };
        }

        request = request.clone({
            setHeaders: headers,
        });

        return next.handle(request);
    }
}
