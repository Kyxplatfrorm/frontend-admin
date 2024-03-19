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
import SearchWebHookReportDataSource from "./searchWebHookReport.datasource";
import { SearchWebHookReportService } from "./searchWebHookReport.service";

@Component({
    selector: "searchWebHookReport",
    templateUrl: "./searchWebHookReport.component.html",
    styleUrls: ["./searchWebHookReport.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchWebHookReportComponent implements OnInit {
    searchWebHookReportDataSource: SearchWebHookReportDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "WebHookTypeName",
        "RunStatusName",
        "HttpPostUrl",
        "TotalElapsed",
        "DueDateTime",
        "RecordType",
        "HttpStatusCode",
        "ResultMessage",
        "ReferenceNumberType",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchWebHookReportPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchWebHookReportSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchWebHookReportService: SearchWebHookReportService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchWebHookReportDataSource = new SearchWebHookReportDataSource(
            this.searchWebHookReportService,
            this.searchWebHookReportPaginator,
            this.searchWebHookReportSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchWebHookReportDataSource) {
                    return;
                }
                this.searchWebHookReportDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
