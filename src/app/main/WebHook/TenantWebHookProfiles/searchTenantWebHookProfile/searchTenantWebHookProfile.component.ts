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
import SearchTenantWebHookProfileDataSource from "./searchTenantWebHookProfile.datasource";
import { SearchTenantWebHookProfileService } from "./searchTenantWebHookProfile.service";

@Component({
    selector: "searchTenantWebHookProfile",
    templateUrl: "./searchTenantWebHookProfile.component.html",
    styleUrls: ["./searchTenantWebHookProfile.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchTenantWebHookProfileComponent implements OnInit {
    searchTenantWebHookProfileDataSource: SearchTenantWebHookProfileDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "IsActive",
        "WebHookTypeName",
        "WebHookUrl",
        "WebHookApiPath",
        "HttpHeaderApiKeyName",
        "EncryptedApiKey",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchTenantWebHookProfilePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchTenantWebHookProfileSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchTenantWebHookProfileService: SearchTenantWebHookProfileService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchTenantWebHookProfileDataSource =
            new SearchTenantWebHookProfileDataSource(
                this.searchTenantWebHookProfileService,
                this.searchTenantWebHookProfilePaginator,
                this.searchTenantWebHookProfileSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchTenantWebHookProfileDataSource) {
                    return;
                }
                this.searchTenantWebHookProfileDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshTenantWebHookProfileDataSource(): void {
        this.searchTenantWebHookProfileDataSource =
            new SearchTenantWebHookProfileDataSource(
                this.searchTenantWebHookProfileService,
                this.searchTenantWebHookProfilePaginator,
                this.searchTenantWebHookProfileSort
            );
    }

    /**
     * DeleteTenantWebHookProfile
     */
    DeleteTenantWebHookProfile(tenantWebHook): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchTenantWebHookProfileService
                    .DeleteTenantWebHookProfile(tenantWebHook)
                    .then(() => {
                        this.searchTenantWebHookProfileService
                            .SearchTenantWebHookProfile(tenantWebHook)
                            .then(() => {
                                this.refreshTenantWebHookProfileDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
