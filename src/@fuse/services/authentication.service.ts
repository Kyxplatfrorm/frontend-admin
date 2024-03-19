import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "environments/environment";
import { User } from "app/ui";
import { UserService } from "app/main/UserProfiles/User/user/user.service";
import { FuseNavigation } from "@fuse/types";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { ServiceApiResponse } from "app/ui/authentication";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    [x: string]: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    menuTreeAuth: FuseNavigation[];
    verifySessionApiResponse: ServiceApiResponse;
    logoutApiResponse: ServiceApiResponse;
    onVerifySessionChanged: BehaviorSubject<any>;
    onLogoutApiChanged: BehaviorSubject<any>;

    private userMenuSubject: BehaviorSubject<FuseNavigation[]>;
    public userMenu: Observable<FuseNavigation[]>;
    public tenantId : number;
    
    constructor(
        private http: HttpClient,
        private userService: UserService,
        private _fuseNavigationService: FuseNavigationService
    ) {
        this.onVerifySessionChanged = new BehaviorSubject({});
        this.onLogoutApiChanged = new BehaviorSubject({});
        const user = localStorage.getItem("currentUser");
        const menuTreeAuth = localStorage.getItem("userMenu");
        if (user) {
            this.currentUserSubject = new BehaviorSubject<User>(
                JSON.parse(localStorage.getItem("currentUser"))
            );
            this.currentUser = this.currentUserSubject.asObservable();
        }
        if (menuTreeAuth) {
            this.userMenuSubject = new BehaviorSubject<FuseNavigation[]>(
                JSON.parse(localStorage.getItem("userMenu"))
            );
            this.userMenu = this.userMenuSubject.asObservable();
        }
    }

    public get currentUserValue(): User {
        var guestUser = new User();
        guestUser.Email = "guest";
        guestUser.UserFullName = "Guest";
        guestUser.IsSucceeded = false;

        if (this.currentUserSubject == undefined) {
            return undefined;
        }
        if (this.currentUserSubject.value == undefined) {
            return undefined;
        }
        return this.currentUserSubject.value;
    }

    public get userMenuValue(): FuseNavigation[] {
        return this.userMenuSubject.value;
    }

    public GetSelectedTenantId() {
        if (this.tenantId == undefined) {
            var localId = localStorage.getItem("selectedTenantId");
            if (localId != undefined) {
                this.tenantId = parseInt(localId);
            }
        }
        return this.tenantId;
    }

    public SetSelectedTenantId(tenantId: number) {
        localStorage.setItem("selectedTenantId", tenantId.toString());
    }

    login(Email: string, password: string) {
        var lang = localStorage.getItem("currentLanguage");
        if (lang == "" || lang == null) {
            lang = "en";
        }

        const headers = {
            Language: lang,
        };

        return this.http
            .post<any>(
                `${environment.apiUrl}/core/coreapi/v1.0/Authentication/Login`,
                {
                    Username: Email,
                    Password: password,
                },
                { headers }
            )
            .pipe(
                map((user) => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    this.currentUserSubject = new BehaviorSubject<User>(user);

                    this.currentUserSubject.next(user);
                    this.userService.GetUserMenuTree().then(() => {
                        this.menuTreeAuth =
                            this.userService.menuTreeAuthenticationResponse.MenuTree;
                        localStorage.setItem(
                            "userMenu",
                            JSON.stringify(this.menuTreeAuth)
                        );

                        this._fuseNavigationService.unregister("main");

                        this._fuseNavigationService.register(
                            "main",
                            this.menuTreeAuth
                        );

                        this._fuseNavigationService.setCurrentNavigation(
                            "main"
                        );
                    });
                    return user;
                })
            );
    }

    /**
     * Logout
     *
     * @returns {Promise<any>}
     */
    Logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ServiceApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Authentication/Logout`
                )
                .subscribe((response: ServiceApiResponse) => {
                    this.logoutApiResponse = response;
                    this.onLogoutApiChanged.next(this.logoutApiResponse);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * GetVerifySession
     *
     * @returns {Promise<any>}
     */
    GetVerifySession(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get<ServiceApiResponse>(
                    `${environment.apiUrl}/core/coreapi/v1.0/Authentication/VerifySession`
                )
                .subscribe((response: ServiceApiResponse) => {
                    this.verifySessionApiResponse = response;
                    this.onVerifySessionChanged.next(
                        this.verifySessionApiResponse
                    );
                    resolve(response);
                }, reject);
        });
    }
}
