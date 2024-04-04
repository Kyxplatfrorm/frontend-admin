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
import SearchCardMemoReportDataSource from "./searchCardMemoReport.datasource";
import { SearchCardMemoReportService } from "./searchCardMemoReport.service";

@Component({
    selector: "searchCardMemoReport",
    templateUrl: "./searchCardMemoReport.component.html",
    styleUrls: ["./searchCardMemoReport.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchCardMemoReportComponent implements OnInit {
    searchCardMemoReportDataSource: SearchCardMemoReportDataSource | null;
    displayedColumns = [
        "Id",
        "InsertDateTime",
        "TenantName",
        "Description",
        "CustomerId",
        "ApplicationTypeName",
        "MemoChannelTypeName",
        "MemoKey",
        "MemoKeyTypeName",
        "MemoTypeName",
        "MemoCodeName",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchCardMemoReportPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchCardMemoReportSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchCardMemoReportService: SearchCardMemoReportService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchCardMemoReportDataSource =
            new SearchCardMemoReportDataSource(
                this.searchCardMemoReportService,
                this.searchCardMemoReportPaginator,
                this.searchCardMemoReportSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchCardMemoReportDataSource) {
                    return;
                }
                this.searchCardMemoReportDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
