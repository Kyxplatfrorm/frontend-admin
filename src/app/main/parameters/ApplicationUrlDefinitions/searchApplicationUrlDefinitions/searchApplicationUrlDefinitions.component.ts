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
import SearchApplicationUrlDefinitionsDataSource from "./searchApplicationUrlDefinitions.datasource";
import { SearchApplicationUrlDefinitionsService } from "./searchApplicationUrlDefinitions.service";

@Component({
    selector: "searchApplicationUrlDefinitions",
    templateUrl: "./searchApplicationUrlDefinitions.component.html",
    styleUrls: ["./searchApplicationUrlDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchApplicationUrlDefinitionsComponent implements OnInit {
    searchApplicationUrlDefinitionsDataSource: SearchApplicationUrlDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "Description",
        "ApplicationTypeName",
        "Url",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchApplicationUrlDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchApplicationUrlDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchApplicationUrlDefinitionsService: SearchApplicationUrlDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchApplicationUrlDefinitionsDataSource =
            new SearchApplicationUrlDefinitionsDataSource(
                this.searchApplicationUrlDefinitionsService,
                this.searchApplicationUrlDefinitionsPaginator,
                this.searchApplicationUrlDefinitionsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchApplicationUrlDefinitionsDataSource) {
                    return;
                }
                this.searchApplicationUrlDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchApplicationUrlDefinitionsDataSource(): void {
        this.searchApplicationUrlDefinitionsDataSource =
            new SearchApplicationUrlDefinitionsDataSource(
                this.searchApplicationUrlDefinitionsService,
                this.searchApplicationUrlDefinitionsPaginator,
                this.searchApplicationUrlDefinitionsSort
            );
    }

    /**
     * DeleteApplicationUrlDefinition
     */
    DeleteApplicationUrlDefinition(applicationUrl): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchApplicationUrlDefinitionsService
                    .DeleteApplicationUrlDefinition(applicationUrl)
                    .then(() => {
                        this.searchApplicationUrlDefinitionsService
                            .SearchApplicationUrlDefinition(applicationUrl)
                            .then(() => {
                                this.refreshSearchApplicationUrlDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
