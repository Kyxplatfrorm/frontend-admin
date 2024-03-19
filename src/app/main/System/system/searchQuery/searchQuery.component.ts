import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
import SearchQueryDataSource from "./searchQuery.datasource";
import { Query } from "../querys/querys.model";
import { SearchQueryService } from "./searchQuery.service";

@Component({
    selector: "searchQuery",
    templateUrl: "./searchQuery.component.html",
    styleUrls: ["./searchQuery.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchQueryComponent implements OnInit {
    searchQueryDataSource: SearchQueryDataSource | null;
    dialogRef: any;
    query: Query;
    querysForm: FormGroup;
    displayedColumns = [
        "Id",
        "QueryType",
        "QueryCode",
        "Description",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];

    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchQueryPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchQuerySort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     *
     */

    constructor(
        private searchQueryService: SearchQueryService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.query = new Query();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchQueryDataSource = new SearchQueryDataSource(
            this.searchQueryService,
            this.searchQueryPaginator,
            this.searchQuerySort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchQueryDataSource) {
                    return;
                }
                this.searchQueryDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshSearchQueryDataSource(): void {
        this.searchQueryDataSource = new SearchQueryDataSource(
            this.searchQueryService,
            this.searchQueryPaginator,
            this.searchQuerySort
        );
    }

    /**
     * DeleteQuery
     */
    DeleteQuery(query): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchQueryService.DeleteQuery(query).then(() => {
                    this.searchQueryService.SearchQuery(this.query).then(() => {
                        this.refreshSearchQueryDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
