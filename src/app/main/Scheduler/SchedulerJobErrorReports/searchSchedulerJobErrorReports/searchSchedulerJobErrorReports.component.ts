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
import SearchSchedulerJobErrorReportsDataSource from "./searchSchedulerJobErrorReports.datasource";
import { SearchSchedulerJobErrorReportsService } from "./searchSchedulerJobErrorReports.service";

@Component({
    selector: "searchSchedulerJobErrorReports",
    templateUrl: "./searchSchedulerJobErrorReports.component.html",
    styleUrls: ["./searchSchedulerJobErrorReports.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSchedulerJobErrorReportsComponent implements OnInit {
    searchSchedulerJobErrorReportsDataSource: SearchSchedulerJobErrorReportsDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "TotalElapsed",
        "Description",
        "RunStatusName",
        "MachineName",
        "SchedulerJobDescription",
        "ServerCode",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSchedulerJobErrorReportsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSchedulerJobErrorReportsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSchedulerJobErrorReportsService: SearchSchedulerJobErrorReportsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSchedulerJobErrorReportsDataSource =
            new SearchSchedulerJobErrorReportsDataSource(
                this.searchSchedulerJobErrorReportsService,
                this.searchSchedulerJobErrorReportsPaginator,
                this.searchSchedulerJobErrorReportsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSchedulerJobErrorReportsDataSource) {
                    return;
                }
                this.searchSchedulerJobErrorReportsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchSchedulerJobErrorReportsDataSource(): void {
        this.searchSchedulerJobErrorReportsDataSource =
            new SearchSchedulerJobErrorReportsDataSource(
                this.searchSchedulerJobErrorReportsService,
                this.searchSchedulerJobErrorReportsPaginator,
                this.searchSchedulerJobErrorReportsSort
            );
    }
}
