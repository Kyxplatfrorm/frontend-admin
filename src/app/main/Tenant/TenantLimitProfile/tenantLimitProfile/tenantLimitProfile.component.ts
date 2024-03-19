import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Subject } from "rxjs";
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
import TenantLimitProfileDataSource from "./tenantLimitProfile.datasource";
import { TenantLimit } from "../tenantLimitProfiles/tenantLimitProfiles.model";
import {
    LimitCurrencyEntity,
    TenantDefinitionEntity,
} from "app/ui/tenantLimitProfile";
import { TenantLimitProfileService } from "./tenantLimitProfile.service";
import UpdateAlertTenantLimitProfile from "./updateTenantLimitProfileAlert";
import { TenantLimitProfilesService } from "../tenantLimitProfiles/tenantLimitProfiles.service";
import { TenantLimitProfileFormDialogComponent } from "./tenantLimitProfileForm/tenantLimitProfileForm.component";

@Component({
    selector: "tenantLimitProfile",
    templateUrl: "./tenantLimitProfile.component.html",
    styleUrls: ["./tenantLimitProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TenantLimitProfileComponent {
    tenantLimitProfileDataSource: TenantLimitProfileDataSource | null;
    dialogRef: any;
    selectedRow: any;
    tenantLimit: TenantLimit;
    pageType: string;
    tenantLimitProfileForm: FormGroup;
    displayedColumns = [
        "TransactionGroupName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    tenantLimitProfilePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantLimitProfileSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    routeParams: any;
    limitCurrency: LimitCurrencyEntity[];
    tenantDefinitionList: TenantDefinitionEntity[];

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
        private tenantLimitProfilesService: TenantLimitProfilesService,
        private tenantLimitProfileService: TenantLimitProfileService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private updateAlertTenantLimitProfile: UpdateAlertTenantLimitProfile,
        private cdr: ChangeDetectorRef,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.tenantLimit = new TenantLimit();
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantLimitProfilesService
            .GetCurrencyList(this.routeParams.id)
            .then(() => {
                this.limitCurrency =
                    this.tenantLimitProfilesService.limitCurrencyListApiResponse.ParameterList;
            });
        this.tenantLimitProfilesService.GetTenants().then(() => {
            this.tenantDefinitionList =
                this.tenantLimitProfilesService.tenantApiResponse.TenantDefinitionList;
        });
        this.tenantLimitProfileDataSource = new TenantLimitProfileDataSource(
            this.tenantLimitProfileService,
            this.tenantLimitProfilePaginator,
            this.tenantLimitProfileSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantLimitProfileDataSource) {
                    return;
                }
                this.tenantLimitProfileDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.tenantLimitProfileService.onTenantLimitProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tenantLimit) => {
                if (tenantLimit) {
                    this.tenantLimit = new TenantLimit(tenantLimit);
                    this.pageType = "edit";
                    this.tenantLimitProfileService.tenantLimitProfileDetailList =
                        tenantLimit.TenantLimitProfileDetailList;
                } else {
                    this.pageType = "new";
                    this.tenantLimitProfileService.tenantLimitProfileDetailList =
                        tenantLimit.TenantLimitProfileDetailList;
                }
                this.tenantLimitProfileForm =
                    this.createTenantLimitProfileForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshTenantLimitProfileDataSource(): void {
        this.tenantLimitProfileDataSource = new TenantLimitProfileDataSource(
            this.tenantLimitProfileService,
            this.tenantLimitProfilePaginator,
            this.tenantLimitProfileSort
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createTenantLimitProfileForm
     *
     * @returns {FormGroup}
     */
    createTenantLimitProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantLimit.Id],
            TenantId: [this.tenantLimit.TenantId],
            CurrencyId: [this.tenantLimit.CurrencyId],
        });
    }

    /**
     * UpdateTenantLimitProfile
     */
    UpdateTenantLimitProfile(): void {
        const data = this.tenantLimitProfileForm.getRawValue();
        this.tenantLimitProfileService
            .UpdateTenantLimitProfile(data)
            .then(() => {
                this.tenantLimitProfileService.onTenantLimitProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "Tenants/TenantLimitProfile/tenantLimitProfiles",
                ]);
                this.updateAlertTenantLimitProfile.UpdateAlertTenantLimitProfileShow();
            });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(
            TenantLimitProfileFormDialogComponent,
            {
                panelClass: "tenantLimitProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var tenantLimitRequest = response.getRawValue();
            tenantLimitRequest.ProfileId = this.tenantLimit.Id;
            this.tenantLimitProfileService
                .CreateTenantLimitProfileDetail(tenantLimitRequest)
                .then(() => {
                    this.tenantLimitProfileService
                        .GetTenantLimitProfile()
                        .then(() => {
                            this.refreshTenantLimitProfileDataSource();
                        });
                });
        });
    }

    /**
     * EditTenantLimitProfile
     *
     * @param tenantLimit
     */
    EditTenantLimitProfile(tenantLimit): void {
        this.dialogRef = this._matDialog.open(
            TenantLimitProfileFormDialogComponent,
            {
                panelClass: "tenantLimitProfileForm-dialog",
                data: {
                    tenantLimit: tenantLimit,
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
            var tenantLimitRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.tenantLimitProfileService
                        .UpdateTenantLimitProfileDetail(tenantLimitRequest)
                        .then(() => {
                            this.tenantLimitProfileService
                                .GetTenantLimitProfile()
                                .then(() => {
                                    this.refreshTenantLimitProfileDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteTenantLimitProfileDetail
                 */
                case "delete":
                    this.DeleteTenantLimitProfileDetail(tenantLimit);
                    break;
            }
        });
    }

    /**
     * DeleteTenantLimitProfileDetail
     */
    DeleteTenantLimitProfileDetail(tenantLimit): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantLimitProfileService
                    .DeleteTenantLimitProfileDetail(tenantLimit)
                    .then(() => {
                        this.tenantLimitProfileService
                            .GetTenantLimitProfile()
                            .then(() => {
                                this.refreshTenantLimitProfileDataSource();
                            });
                    });
            }
        });
    }
}
