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
import { Tenant } from "../../TenantDefinitions/tenantDetail/tenantDetail.model";
import TenantCardAuthorizationProfilesDataSource from "./tenantCardAuthorizationProfiles.datasource";
import { TenantCardAuthorizationProfilesService } from "./tenantCardAuthorizationProfiles.service";

@Component({
    selector: "tenantCardAuthorizationProfiles",
    templateUrl: "./tenantCardAuthorizationProfiles.component.html",
    styleUrls: ["./tenantCardAuthorizationProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantCardAuthorizationProfilesComponent implements OnInit {
    tenantCardAuthorizationProfilesDataSource: TenantCardAuthorizationProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "TenantCode",
        "DefaultCurrencyCode",
        "InsertDateTime",
        "UpdateDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    tenantCardAuthorizationProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantCardAuthorizationProfilesort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    tenant: Tenant;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tenantCardAuthorizationProfilesService: TenantCardAuthorizationProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tenantCardAuthorizationProfilesDataSource =
            new TenantCardAuthorizationProfilesDataSource(
                this.tenantCardAuthorizationProfilesService,
                this.tenantCardAuthorizationProfilesPaginator,
                this.tenantCardAuthorizationProfilesort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantCardAuthorizationProfilesDataSource) {
                    return;
                }
                this.tenantCardAuthorizationProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
