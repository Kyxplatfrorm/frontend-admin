import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, ReplaySubject, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import ApiPermissionProfileDataSource from "./apiPermissionProfile.datasource";
import { ApiPermissionProfile } from "../apiPermissionProfiles/apiPermissionProfiles.model";
import { CompanyRestrictionProfileEntity } from "app/ui/apiPermissionProfile";
import { ApiPermissionProfileService } from "./apiPermissionProfile.service";
import { ApiPermissionProfilesService } from "../apiPermissionProfiles/apiPermissionProfiles.service";
import AddAlertApiPermissionProfile from "./addApiPermissionProfileAlert";
import UpdateAlertApiPermissionProfile from "./updateApiPermissionProfileAlert";
import { ApiPermissionFormFormDialogComponent } from "./apiPermissionProfileForm/apiPermissionProfileForm.component";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { UserTypeEntity } from "app/ui/userDefinition";

@Component({
    selector: "apiPermissionProfile",
    templateUrl: "./apiPermissionProfile.component.html",
    styleUrls: ["./apiPermissionProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApiPermissionProfileComponent {
    apiPermissionProfileDataSource: ApiPermissionProfileDataSource | null;
    dialogRef: any;
    apiPermissionProfile: ApiPermissionProfile;
    pageType: string;
    apiPermissionProfileForm: FormGroup;
    displayedColumns = ["ApiDefinitionName", "ApiLimitProfileName", "Buttons"];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    tenantList: TenantDefinitionEntity[];
    userTypeList: UserTypeEntity[];
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    apiPermissionProfilePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    apiPermissionProfileSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    companyRestrictionProfile: CompanyRestrictionProfileEntity[];
    routeParams: any;
    userTypeId: number;
    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private apiPermissionProfileService: ApiPermissionProfileService,
        private apiPermissionProfilesService: ApiPermissionProfilesService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertApiPermissionProfile: AddAlertApiPermissionProfile,
        private updateAlertApiPermissionProfile: UpdateAlertApiPermissionProfile,
        private cdr: ChangeDetectorRef,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.apiPermissionProfile = new ApiPermissionProfile();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.apiPermissionProfilesService
            .GetCompanyRestrictionProfiles()
            .then(() => {
                this.companyRestrictionProfile =
                    this.apiPermissionProfilesService.companyRestrictionProfileApiResponse.ParameterList;
            });
        this.apiPermissionProfilesService.GetTenants().then(() => {
            this.tenantList =
                this.apiPermissionProfilesService.tenantApiResponse.TenantDefinitionList;
        });
        this.apiPermissionProfilesService.GetUserTypes().then(() => {
            this.userTypeList =
                this.apiPermissionProfilesService.userTypeApiResponse.ParameterList;
        });
        this.apiPermissionProfileDataSource =
            new ApiPermissionProfileDataSource(
                this.apiPermissionProfileService,
                this.apiPermissionProfilePaginator,
                this.apiPermissionProfileSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.apiPermissionProfileDataSource) {
                    return;
                }
                this.apiPermissionProfileDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.apiPermissionProfileService.onApiPermissionProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((apiPermissionProfile) => {
                if (apiPermissionProfile) {
                    this.apiPermissionProfile = new ApiPermissionProfile(
                        apiPermissionProfile
                    );
                    this.apiPermissionProfileService.setSelectedUserTypeId(
                        this.apiPermissionProfile.ApplicationTypeId
                    );
                    this.pageType = "edit";
                    this.apiPermissionProfileService.apiPermissionProfileDetailList =
                        apiPermissionProfile.ApiPermissionProfileDetailList;
                } else {
                    this.pageType = "new";
                    this.apiPermissionProfile = new ApiPermissionProfile();
                    this.apiPermissionProfileService.apiPermissionProfileDetailList =
                        apiPermissionProfile.ApiPermissionProfileDetailList;
                }
                this.apiPermissionProfileForm =
                    this.createApiPermissionProfileForm();
            });
    }

    refreshApiPermissionProfileDataSource(): void {
        this.apiPermissionProfileDataSource =
            new ApiPermissionProfileDataSource(
                this.apiPermissionProfileService,
                this.apiPermissionProfilePaginator,
                this.apiPermissionProfileSort
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     * createApiPermissionProfileForm
     *
     * @returns {FormGroup}
     */
    createApiPermissionProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.apiPermissionProfile.Id],
            ProfileId: [this.apiPermissionProfile.ProfileId],
            ProfileName: [this.apiPermissionProfile.ProfileName],
            PermissionCheckTypeId: [
                this.apiPermissionProfile.PermissionCheckTypeId,
            ],
            TenantId: [this.apiPermissionProfile.TenantId],
            UserTypeId: [this.apiPermissionProfile.UserTypeId],
        });
    }

    /**
     * CreateApiPermissionProfile
     */
    CreateApiPermissionProfile(): void {
        const data = this.apiPermissionProfileForm.getRawValue();
        this.apiPermissionProfileService
            .CreateApiPermissionProfile(data)
            .then(() => {
                this.apiPermissionProfileService.onApiPermissionProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "ApiUser/ApiPermissionProfile/apiPermissionProfiles",
                ]);
                this.addAlertApiPermissionProfile.AddAlertApiPermissionProfileShow();
            });
    }

    /**
     * UpdateApiPermissionProfile
     */
    UpdateApiPermissionProfile(): void {
        const data = this.apiPermissionProfileForm.getRawValue();
        this.apiPermissionProfileService
            .UpdateApiPermissionProfile(data)
            .then(() => {
                this.apiPermissionProfileService.onApiPermissionProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "ApiUser/ApiPermissionProfile/apiPermissionProfiles",
                ]);
                this.updateAlertApiPermissionProfile.UpdateAlertApiPermissionProfileShow();
            });
    }

    /**
     * ApiPermissionProfile
     */
    ApiPermissionProfile(): void {
        this.dialogRef = this._matDialog.open(
            ApiPermissionFormFormDialogComponent,
            {
                panelClass: "apiPermissionProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var apiPermissionProfileRequest = response.getRawValue();
            apiPermissionProfileRequest.ProfileId =
                this.apiPermissionProfileService.apiPermissionProfile.Id;

            this.apiPermissionProfileService
                .CreateApiPermissionProfileDetail(apiPermissionProfileRequest)
                .then(() => {
                    this.apiPermissionProfileService
                        .GetApiPermissionProfile()
                        .then(() => {
                            this.refreshApiPermissionProfileDataSource();
                        });
                });
        });
    }

    /**
     * EditApiPermissionProfile
     *
     * @param apiPermissionProfile
     */
    EditApiPermissionProfile(apiPermissionProfile): void {
        this.dialogRef = this._matDialog.open(
            ApiPermissionFormFormDialogComponent,
            {
                panelClass: "apiPermissionProfileForm-dialog",
                data: {
                    apiPermissionProfile: apiPermissionProfile,
                    action: "edit",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var apiPermissionProfileRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.apiPermissionProfileService
                        .UpdateApiPermissionProfileDetail(
                            apiPermissionProfileRequest
                        )
                        .then(() => {
                            this.apiPermissionProfileService
                                .GetApiPermissionProfile()
                                .then(() => {
                                    this.refreshApiPermissionProfileDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteApiPermissionProfileDetail
                 */
                case "delete":
                    this.DeleteApiPermissionProfileDetail(apiPermissionProfile);
                    break;
            }
        });
    }

    /**
     * DeleteApiPermissionProfileDetail
     */
    DeleteApiPermissionProfileDetail(apiPermissionProfile): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.apiPermissionProfileService
                    .DeleteApiPermissionProfileDetail(apiPermissionProfile)
                    .then(() => {
                        this.apiPermissionProfileService
                            .GetApiPermissionProfile()
                            .then(() => {
                                this.refreshApiPermissionProfileDataSource();
                            });
                    });
            }
        });
    }
}
