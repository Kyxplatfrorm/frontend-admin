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
import TenantCardSchemaDataSource from "./tenantCardSchema.datasource";
import { TenantCardSchemaService } from "./tenantCardSchema.service";

@Component({
    selector: "tenantCardSchema",
    templateUrl: "./tenantCardSchema.component.html",
    styleUrls: ["./tenantCardSchema.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantCardSchemaComponent implements OnInit {
    tenantCardSchemaDataSource: TenantCardSchemaDataSource | null;
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
        private tenantCardSchemaService: TenantCardSchemaService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tenantCardSchemaDataSource = new TenantCardSchemaDataSource(
            this.tenantCardSchemaService,
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
                if (!this.tenantCardSchemaDataSource) {
                    return;
                }
                this.tenantCardSchemaDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
