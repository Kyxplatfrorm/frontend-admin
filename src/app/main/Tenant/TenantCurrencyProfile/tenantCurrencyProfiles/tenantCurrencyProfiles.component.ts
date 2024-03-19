import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import TenantCurrencyProfilesDataSource from "./tenantCurrencyProfiles.datasource";
import { TenantCurrencyProfilesService } from "./tenantCurrencyProfiles.service";
import { ActivatedRoute } from "@angular/router";
import { TenantCurrencyService } from "../tenantCurrency/tenantCurrency.service";
import { TenantCurrencyProfileFormDialogComponent } from "./tenantCurrencyProfileForm/tenantCurrencyProfileForm.component";

@Component({
    selector: "tenantCurrencyProfiles",
    templateUrl: "./tenantCurrencyProfiles.component.html",
    styleUrls: ["./tenantCurrencyProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantCurrencyProfilesComponent implements OnInit {
    tenantCurrencyProfilesDataSource: TenantCurrencyProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "CurrencyCode",
        "CurrencyCodeNumeric",
        "CurrencyName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    tenantCurrencyProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantCurrencyProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    tenantId: number;
    routeParams: any;
    dialogRef: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tenantCurrencyProfilesService: TenantCurrencyProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        _router: ActivatedRoute,
        private tenantCurrencyService: TenantCurrencyService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    ngOnInit(): void {
        this.tenantCurrencyProfilesDataSource =
            new TenantCurrencyProfilesDataSource(
                this.tenantCurrencyProfilesService,
                this.tenantCurrencyProfilesPaginator,
                this.tenantCurrencyProfilesSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantCurrencyProfilesDataSource) {
                    return;
                }
                this.tenantCurrencyProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshTenantCurrencyProfilesDataSource(): void {
        this.tenantCurrencyProfilesDataSource =
            new TenantCurrencyProfilesDataSource(
                this.tenantCurrencyProfilesService,
                this.tenantCurrencyProfilesPaginator,
                this.tenantCurrencyProfilesSort
            );
    }

    /**
     * newTenantCurrency
     */
    newTenantCurrency(): void {
        this.dialogRef = this._matDialog.open(
            TenantCurrencyProfileFormDialogComponent,
            {
                panelClass: "tenantCurrencyProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var tenantCurrencyRequest = response.getRawValue();
            this.tenantCurrencyProfilesService
                .CreateTenantCurrencyProfile(tenantCurrencyRequest)
                .then(() => {
                    this.tenantCurrencyProfilesService
                        .GetTenantCurrencyProfiles()
                        .then(() => {
                            this.refreshTenantCurrencyProfilesDataSource();
                        });
                });
        });
    }

    /**
     * EditTenantCurrency
     *
     * @param tenantCurrency
     */
    EditTenantCurrency(tenantCurrency): void {
        this.dialogRef = this._matDialog.open(
            TenantCurrencyProfileFormDialogComponent,
            {
                panelClass: "tenantCurrencyProfileForm-dialog",
                data: {
                    tenantCurrency: tenantCurrency,
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
            var tenantCurrencyRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.tenantCurrencyProfilesService
                        .UpdateTenantCurrencyProfile(tenantCurrencyRequest)
                        .then(() => {
                            this.tenantCurrencyProfilesService
                                .GetTenantCurrencyProfiles()
                                .then(() => {
                                    this.refreshTenantCurrencyProfilesDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteTenantCurrencyProfile
                 */
                case "delete":
                    this.DeleteTenantCurrencyProfile(tenantCurrency);
                    break;
            }
        });
    }

    /**
     * DeleteTenantCurrencyProfile
     */
    DeleteTenantCurrencyProfile(tenantCurrency): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantCurrencyProfilesService
                    .DeleteTenantCurrencyProfile(tenantCurrency)
                    .then(() => {
                        this.tenantCurrencyProfilesService
                            .GetTenantCurrencyProfiles()
                            .then(() => {
                                this.refreshTenantCurrencyProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
