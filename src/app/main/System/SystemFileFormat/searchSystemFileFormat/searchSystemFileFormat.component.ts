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
import SearchSystemFileFormatDataSource from "./searchSystemFileFormat.datasource";
import { SearchSystemFileFormatService } from "./searchSystemFileFormat.service";

@Component({
    selector: "searchSystemFileFormat",
    templateUrl: "./searchSystemFileFormat.component.html",
    styleUrls: ["./searchSystemFileFormat.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSystemFileFormatComponent implements OnInit {
    searchSystemFileFormatDataSource: SearchSystemFileFormatDataSource | null;
    displayedColumns = [
        "Id",
        "Description",
        "FileFormatTypeName",
        "FileDirectionTypeName",
        "FileNameFormat",
        "FileFormatCode",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSystemFileFormatPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSystemFileFormatSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSystemFileFormatService: SearchSystemFileFormatService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSystemFileFormatDataSource =
            new SearchSystemFileFormatDataSource(
                this.searchSystemFileFormatService,
                this.searchSystemFileFormatPaginator,
                this.searchSystemFileFormatSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSystemFileFormatDataSource) {
                    return;
                }
                this.searchSystemFileFormatDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSystemFileFormatDataSource(): void {
        this.searchSystemFileFormatDataSource =
            new SearchSystemFileFormatDataSource(
                this.searchSystemFileFormatService,
                this.searchSystemFileFormatPaginator,
                this.searchSystemFileFormatSort
            );
    }

    /**
     * DeleteSystemFileFormat
     */
    DeleteSystemFileFormat(systemFileFormat): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchSystemFileFormatService
                    .DeleteSystemFileFormat(systemFileFormat)
                    .then(() => {
                        this.searchSystemFileFormatService
                            .SearchSystemFileFormat(systemFileFormat)
                            .then(() => {
                                this.refreshSystemFileFormatDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
