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
import TenantRestrictionProfileDataSource from "./tenantRestrictionProfile.datasource";
import { TenantRestriction } from "../tenantRestrictionProfiles/tenantRestrictionProfiles.model";
import {
    RestrictionCheckTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/tenantRestrictionProfile";
import { TenantRestrictionProfileService } from "./tenantRestrictionProfile.service";
import { TenantRestrictionProfilesService } from "../tenantRestrictionProfiles/tenantRestrictionProfiles.service";
import UpdateAlertTenantRestrictionProfile from "./updateTenantRestrictionProfileAlert";
import { TenantRestrictionProfileFormDialogComponent } from "./tenantRestrictionProfileForm/tenantRestrictionProfileForm.component";

@Component({
    selector: "tenantRestrictionProfile",
    templateUrl: "./tenantRestrictionProfile.component.html",
    styleUrls: ["./tenantRestrictionProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TenantRestrictionProfileComponent {
    tenantRestrictionProfileDataSource: TenantRestrictionProfileDataSource | null;
    dialogRef: any;
    tenantRestriction: TenantRestriction;
    pageType: string;
    tenantRestrictionProfileForm: FormGroup;
    displayedColumns = [
        "RestrictionCheckType",
        "RestrictionType",
        "RestrictionCode",
        "RestrictionCodeDescription",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    tenantRestrictionProfilePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantRestrictionProfileSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    restrictionCheckType: RestrictionCheckTypeEntity[];
    tenantDefinitionList: TenantDefinitionEntity[];
    routeParams: any;

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
        private tenantRestrictionProfileService: TenantRestrictionProfileService,
        private tenantRestrictionProfilesService: TenantRestrictionProfilesService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private updateTenantRestrictionProfileAlert: UpdateAlertTenantRestrictionProfile,
        private cdr: ChangeDetectorRef,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.tenantRestriction = new TenantRestriction();
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantRestrictionProfilesService
            .GetRestrictionCheckType()
            .then(() => {
                this.restrictionCheckType =
                    this.tenantRestrictionProfilesService.restrictionCheckTypeApiResponse.ParameterList;
            });
        this.tenantRestrictionProfilesService.GetTenants().then(() => {
            this.tenantDefinitionList =
                this.tenantRestrictionProfilesService.tenantApiResponse.TenantDefinitionList;
        });
        this.tenantRestrictionProfileDataSource =
            new TenantRestrictionProfileDataSource(
                this.tenantRestrictionProfileService,
                this.tenantRestrictionProfilePaginator,
                this.tenantRestrictionProfileSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantRestrictionProfileDataSource) {
                    return;
                }
                this.tenantRestrictionProfileDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.tenantRestrictionProfileService.onTenantRestrictionProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tenantRestriction) => {
                if (tenantRestriction) {
                    this.tenantRestriction = new TenantRestriction(
                        tenantRestriction
                    );
                    this.pageType = "edit";
                    this.tenantRestrictionProfileService.tenantRestrictionProfileDetail =
                        tenantRestriction.TenantRestrictionProfileDetail;
                } else {
                    this.pageType = "new";
                    this.tenantRestrictionProfileService.tenantRestrictionProfileDetail =
                        tenantRestriction.TenantRestrictionProfileDetail;
                }
                this.tenantRestrictionProfileForm =
                    this.createTenantRestrictionProfileForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshTenantRestrictionProfileDataSource(): void {
        this.tenantRestrictionProfileDataSource =
            new TenantRestrictionProfileDataSource(
                this.tenantRestrictionProfileService,
                this.tenantRestrictionProfilePaginator,
                this.tenantRestrictionProfileSort
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
     * createTenantRestrictionProfileForm
     *
     * @returns {FormGroup}
     */
    createTenantRestrictionProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantRestriction.Id],
            TenantId: [this.tenantRestriction.TenantId],
            HasInternationalUsage: [
                this.tenantRestriction.HasInternationalUsage,
            ],
            HasECommerceUsage: [this.tenantRestriction.HasECommerceUsage],
            HasMotoUsage: [this.tenantRestriction.HasMotoUsage],
            HasAtmUsage: [this.tenantRestriction.HasAtmUsage],
            MerchantRestrictionCheckTypeId: [
                this.tenantRestriction.MerchantRestrictionCheckTypeId,
            ],
            MccRestrictionCheckTypeId: [
                this.tenantRestriction.MccRestrictionCheckTypeId,
            ],
            TransactionRestrictionCheckTypeId: [
                this.tenantRestriction.TransactionRestrictionCheckTypeId,
            ],
            CountryRestrictionCheckTypeId: [
                this.tenantRestriction.CountryRestrictionCheckTypeId,
            ],
            MerchantNameRestrictionCheckTypeId: [
                this.tenantRestriction.MerchantNameRestrictionCheckTypeId,
            ],
            AcquirerRestrictionCheckTypeId: [
                this.tenantRestriction.AcquirerRestrictionCheckTypeId,
            ],
        });
    }

    /**
     * UpdateTenantRestrictionProfile
     */
    UpdateTenantRestrictionProfile(): void {
        const data = this.tenantRestrictionProfileForm.getRawValue();
        this.tenantRestrictionProfileService
            .UpdateTenantRestrictionProfile(data)
            .then(() => {
                this.tenantRestrictionProfileService.onTenantRestrictionProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "Tenants/TenantRestrictionProfile/tenantRestrictionProfiles",
                ]);
                this.updateTenantRestrictionProfileAlert.UpdateAlertTenantRestrictionProfileShow();
            });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(
            TenantRestrictionProfileFormDialogComponent,
            {
                panelClass: "tenantRestrictionProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var tenantRestrictionRequest = response.getRawValue();
            tenantRestrictionRequest.ProfileId = this.tenantRestriction.Id;
            this.tenantRestrictionProfileService
                .CreateTenantRestrictionProfileDetail(tenantRestrictionRequest)
                .then(() => {
                    this.tenantRestrictionProfileService
                        .GetTenantRestrictionProfile()
                        .then(() => {
                            this.refreshTenantRestrictionProfileDataSource();
                        });
                });
        });
    }

    /**
     * EditTenantRestrictionProfile
     *
     * @param tenantRestriction
     */
    EditTenantRestrictionProfile(tenantRestriction): void {
        this.dialogRef = this._matDialog.open(
            TenantRestrictionProfileFormDialogComponent,
            {
                panelClass: "tenantRestrictionProfileForm-dialog",
                data: {
                    tenantRestriction: tenantRestriction,
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
            var tenantRestrictionRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.tenantRestrictionProfileService
                        .UpdateTenantRestrictionProfileDetail(
                            tenantRestrictionRequest
                        )
                        .then(() => {
                            this.tenantRestrictionProfileService
                                .GetTenantRestrictionProfile()
                                .then(() => {
                                    this.refreshTenantRestrictionProfileDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteTenantRestrictionProfileDetail
                 */
                case "delete":
                    this.DeleteTenantRestrictionProfileDetail(
                        tenantRestriction
                    );
                    break;
            }
        });
    }

    /**
     * DeleteTenantRestrictionProfileDetail
     */
    DeleteTenantRestrictionProfileDetail(tenantRestriction): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantRestrictionProfileService
                    .DeleteTenantRestrictionProfileDetail(tenantRestriction)
                    .then(() => {
                        this.tenantRestrictionProfileService
                            .GetTenantRestrictionProfile()
                            .then(() => {
                                this.refreshTenantRestrictionProfileDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
