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
import TenantCountryProfilesDataSource from "./tenantCountryProfiles.datasource";
import { TenantCountryProfilesService } from "./tenantCountryProfiles.service";
import { TenantCountryProfileFormDialogComponent } from "./tenantCountryProfileForm/tenantCountryProfileForm.component";

@Component({
    selector: "tenantCountryProfiles",
    templateUrl: "./tenantCountryProfiles.component.html",
    styleUrls: ["./tenantCountryProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantCountryProfilesComponent implements OnInit {
    tenantCountryProfilesDataSource: TenantCountryProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "CountryName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    tenantCountryProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantCountryProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tenantCountryProfilesService: TenantCountryProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tenantCountryProfilesDataSource =
            new TenantCountryProfilesDataSource(
                this.tenantCountryProfilesService,
                this.tenantCountryProfilesPaginator,
                this.tenantCountryProfilesSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantCountryProfilesDataSource) {
                    return;
                }
                this.tenantCountryProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshTenantCountryProfilesDataSource(): void {
        this.tenantCountryProfilesDataSource =
            new TenantCountryProfilesDataSource(
                this.tenantCountryProfilesService,
                this.tenantCountryProfilesPaginator,
                this.tenantCountryProfilesSort
            );
    }

    /**
     * newTenantCountry
     */
    newTenantCountry(): void {
        this.dialogRef = this._matDialog.open(
            TenantCountryProfileFormDialogComponent,
            {
                panelClass: "tenantCountryProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var tenantCountryRequest = response.getRawValue();
            this.tenantCountryProfilesService
                .CreateTenantCountryProfile(tenantCountryRequest)
                .then(() => {
                    this.tenantCountryProfilesService
                        .GetTenantCountryProfiles()
                        .then(() => {
                            this.refreshTenantCountryProfilesDataSource();
                        });
                });
        });
    }

    /**
     * EditTenantCountry
     *
     * @param tenantCountry
     */
    EditTenantCountry(tenantCountry): void {
        this.dialogRef = this._matDialog.open(
            TenantCountryProfileFormDialogComponent,
            {
                panelClass: "tenantCountryProfileForm-dialog",
                data: {
                    tenantCountry: tenantCountry,
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
            var tenantCountryRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.tenantCountryProfilesService
                        .UpdateTenantCountryProfile(tenantCountryRequest)
                        .then(() => {
                            this.tenantCountryProfilesService
                                .GetTenantCountryProfiles()
                                .then(() => {
                                    this.refreshTenantCountryProfilesDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteTenantCountryProfile
                 */
                case "delete":
                    this.DeleteTenantCountryProfile(tenantCountry);
                    break;
            }
        });
    }

    /**
     * DeleteTenantCountryProfile
     */
    DeleteTenantCountryProfile(tenantCountry): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantCountryProfilesService
                    .DeleteTenantCountryProfile(tenantCountry)
                    .then(() => {
                        this.tenantCountryProfilesService
                            .GetTenantCountryProfiles()
                            .then(() => {
                                this.refreshTenantCountryProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
