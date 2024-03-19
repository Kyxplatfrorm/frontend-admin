import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Output,
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
import SystemRestrictionProfileDataSource from "./systemRestrictionProfile.datasource";
import { SystemRestriction } from "./systemRestrictionProfile.model";
import { RestrictionCheckTypeEntity } from "app/ui/systemRestrictionProfile";
import { SystemRestrictionProfileService } from "./systemRestrictionProfile.service";
import UpdateAlertSystemRestrictionProfile from "./updateSystemRestrictionProfileAlert";
import { SystemRestrictionProfileFormDialogComponent } from "./systemRestrictionProfileForm/systemRestrictionProfileForm.component";

@Component({
    selector: "systemRestrictionProfile",
    templateUrl: "./systemRestrictionProfile.component.html",
    styleUrls: ["./systemRestrictionProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SystemRestrictionProfileComponent {
    systemRestrictionProfileDataSource: SystemRestrictionProfileDataSource | null;
    dialogRef: any;
    systemRestriction: SystemRestriction;
    pageType: string;
    systemRestrictionProfileForm: FormGroup;
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
    systemRestrictionProfilePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    systemRestrictionProfileSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    restrictionCheckType: RestrictionCheckTypeEntity[];
    routeParams: any;
    @Output() refreshData: EventEmitter<any> = new EventEmitter<any>();

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
        private systemRestrictionProfileService: SystemRestrictionProfileService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private updateAlertSystemRestrictionProfile: UpdateAlertSystemRestrictionProfile,
        private cdr: ChangeDetectorRef,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemRestriction = new SystemRestriction();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.systemRestrictionProfileService
            .GetRestrictionCheckType()
            .then(() => {
                this.restrictionCheckType =
                    this.systemRestrictionProfileService.restrictionCheckTypeApiResponse.ParameterList;
            });
        this.systemRestrictionProfileDataSource =
            new SystemRestrictionProfileDataSource(
                this.systemRestrictionProfileService,
                this.systemRestrictionProfilePaginator,
                this.systemRestrictionProfileSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.systemRestrictionProfileDataSource) {
                    return;
                }
                this.systemRestrictionProfileDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.systemRestrictionProfileService.onSystemRestrictionProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((systemRestriction) => {
                this.systemRestriction = new SystemRestriction(
                    systemRestriction
                );
            });
        this.systemRestrictionProfileForm =
            this.createSystemRestrictionProfileForm();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshSystemRestrictionProfileDataSource(): void {
        this.systemRestrictionProfileDataSource =
            new SystemRestrictionProfileDataSource(
                this.systemRestrictionProfileService,
                this.systemRestrictionProfilePaginator,
                this.systemRestrictionProfileSort
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
     * createSystemRestrictionProfileForm
     *
     * @returns {FormGroup}
     */
    createSystemRestrictionProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.systemRestriction.Id],
            TenantRestrictionCheckTypeId: [
                this.systemRestriction.TenantRestrictionCheckTypeId,
            ],
            HasInternationalUsage: [
                this.systemRestriction.HasInternationalUsage,
            ],
            HasECommerceUsage: [this.systemRestriction.HasECommerceUsage],
            HasMotoUsage: [this.systemRestriction.HasMotoUsage],
            HasAtmUsage: [this.systemRestriction.HasAtmUsage],
            MerchantRestrictionCheckTypeId: [
                this.systemRestriction.MerchantRestrictionCheckTypeId,
            ],
            MccRestrictionCheckTypeId: [
                this.systemRestriction.MccRestrictionCheckTypeId,
            ],
            TransactionRestrictionCheckTypeId: [
                this.systemRestriction.TransactionRestrictionCheckTypeId,
            ],
            CountryRestrictionCheckTypeId: [
                this.systemRestriction.CountryRestrictionCheckTypeId,
            ],
            MerchantNameRestrictionCheckTypeId: [
                this.systemRestriction.MerchantNameRestrictionCheckTypeId,
            ],
            AcquirerRestrictionCheckTypeId: [
                this.systemRestriction.AcquirerRestrictionCheckTypeId,
            ],
            MinimumTransactionAmount: [
                this.systemRestriction.MinimumTransactionAmount,
            ],
            MaximumTransactionAmount: [
                this.systemRestriction.MaximumTransactionAmount,
            ],
        });
    }

    /**
     * UpdateSystemRestrictionProfile
     */
    UpdateSystemRestrictionProfile(): void {
        const data = this.systemRestrictionProfileForm.getRawValue();
        this.systemRestrictionProfileService
            .UpdateSystemRestrictionProfile(data)
            .then(() => {
                this.systemRestrictionProfileService.onSystemRestrictionProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "System/SystemRestrictionProfile/systemRestrictionProfiles",
                ]);
                this.updateAlertSystemRestrictionProfile.UpdateAlertSystemRestrictionProfileShow();
            });
    }

    /**
     * SystemRestrictionForm
     */
    SystemRestrictionForm(): void {
        this.dialogRef = this._matDialog.open(
            SystemRestrictionProfileFormDialogComponent,
            {
                panelClass: "systemRestrictionProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var systemRestrictionRequest = response.getRawValue();
            systemRestrictionRequest.ProfileId = this.systemRestriction.Id;
            this.systemRestrictionProfileService
                .CreateSystemRestrictionProfileDetail(systemRestrictionRequest)
                .then(() => {
                    this.systemRestrictionProfileService
                        .GetSystemRestrictionProfile()
                        .then(() => {
                            this.systemRestrictionProfileService
                                .systemRestrictionProfileDetailList;
                        });
                });
        });
    }

    /**
     * EditSystemRestrictionProfile
     *
     * @param systemRestriction
     */
    EditSystemRestrictionProfile(systemRestriction): void {
        this.dialogRef = this._matDialog.open(
            SystemRestrictionProfileFormDialogComponent,
            {
                panelClass: "systemRestrictionProfileForm-dialog",
                data: {
                    systemRestriction: systemRestriction,
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
            var systemRestrictionRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.systemRestrictionProfileService
                        .UpdateSystemRestrictionProfileDetail(
                            systemRestrictionRequest
                        )
                        .then(() => {
                            this.systemRestrictionProfileService
                                .GetSystemRestrictionProfile()
                                .then(() => {
                                    this.refreshSystemRestrictionProfileDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSystemRestrictionProfileDetail
                 */
                case "delete":
                    this.DeleteSystemRestrictionProfileDetail(
                        systemRestriction
                    );
                    break;
            }
        });
    }

    /**
     * DeleteSystemRestrictionProfileDetail
     */
    DeleteSystemRestrictionProfileDetail(systemRestriction): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.systemRestrictionProfileService
                    .DeleteSystemRestrictionProfileDetail(systemRestriction)
                    .then(() => {
                        this.systemRestrictionProfileService
                            .GetSystemRestrictionProfile()
                            .then(() => {
                                this.refreshSystemRestrictionProfileDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
