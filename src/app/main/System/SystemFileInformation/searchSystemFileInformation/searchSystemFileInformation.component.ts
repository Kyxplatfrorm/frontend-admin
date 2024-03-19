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
import SearchSystemFileInformationDataSource from "./searchSystemFileInformation.datasource";
import { SearchSystemFileInformationService } from "./searchSystemFileInformation.service";

@Component({
    selector: "searchSystemFileInformation",
    templateUrl: "./searchSystemFileInformation.component.html",
    styleUrls: ["./searchSystemFileInformation.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSystemFileInformationComponent implements OnInit {
    searchSystemFileInformationDataSource: SearchSystemFileInformationDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "InsertDateTime",
        "IsTenantFile",
        "FileFormatCode",
        "FileName",
        "FileSourceName",
        "FileStatusName",
        "FileFormatTypeName",
        "FileDirectionTypeName",
        "FileSize",
        "DailyFileIndex",
        "RecordCount",
        "RejectCount",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSystemFileInformationPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSystemFileInformationSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSystemFileInformationService: SearchSystemFileInformationService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSystemFileInformationDataSource =
            new SearchSystemFileInformationDataSource(
                this.searchSystemFileInformationService,
                this.searchSystemFileInformationPaginator,
                this.searchSystemFileInformationSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSystemFileInformationDataSource) {
                    return;
                }
                this.searchSystemFileInformationDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
