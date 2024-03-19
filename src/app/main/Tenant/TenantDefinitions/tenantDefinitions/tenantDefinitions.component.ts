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
import { TenantDefinitionsDataSource } from "./tenantDefinitions.datasource";
import { TenantDefinitionsService } from "./tenantDefinitions.service";

@Component({
    selector: "tenantDefinitions",
    templateUrl: "./tenantDefinitions.component.html",
    styleUrls: ["./tenantDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantDefinitionsComponent implements OnInit {
    tenantDefinitionsDataSource: TenantDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "TenantCode",
        "DefaultCurrencyCode",
        "TenantLogoUrl",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    tenantdefpaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantdefsort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tenantdefinitionsservice: TenantDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tenantDefinitionsDataSource = new TenantDefinitionsDataSource(
            this.tenantdefinitionsservice,
            this.tenantdefpaginator,
            this.tenantdefsort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantDefinitionsDataSource) {
                    return;
                }
                this.tenantDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshTenantDefDataSource(): void {
        this.tenantDefinitionsDataSource = new TenantDefinitionsDataSource(
            this.tenantdefinitionsservice,
            this.tenantdefpaginator,
            this.tenantdefsort
        );
    }

    /**
     * DeleteTenant
     */
    DeleteTenant(tenant): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantdefinitionsservice.DeleteTenant(tenant).then(() => {
                    this.tenantdefinitionsservice.GetTenants().then(() => {
                        this.refreshTenantDefDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
