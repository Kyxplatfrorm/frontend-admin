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
import TenantCurrencyDataSource from "./tenantCurrency.datasource";
import { TenantCurrencyService } from "./tenantCurrency.service";
import { Tenant } from "../../TenantDefinitions/tenantDetail/tenantDetail.model";

@Component({
    selector: "tenantCurrency",
    templateUrl: "./tenantCurrency.component.html",
    styleUrls: ["./tenantCurrency.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantCurrencyComponent implements OnInit {
    tenantCurrencyDataSource: TenantCurrencyDataSource | null;
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
    tenantCurrencyPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantCurrencySort: MatSort;
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
        private tenantCurrencyService: TenantCurrencyService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tenantCurrencyDataSource = new TenantCurrencyDataSource(
            this.tenantCurrencyService,
            this.tenantCurrencyPaginator,
            this.tenantCurrencySort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantCurrencyDataSource) {
                    return;
                }
                this.tenantCurrencyDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
