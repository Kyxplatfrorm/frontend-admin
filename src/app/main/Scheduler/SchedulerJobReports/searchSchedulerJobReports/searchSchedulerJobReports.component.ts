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
import SearchSchedulerJobReportsDataSource from "./searchSchedulerJobReports.datasource";
import { SearchSchedulerJobReportsService } from "./searchSchedulerJobReports.service";

@Component({
    selector: "searchSchedulerJobReports",
    templateUrl: "./searchSchedulerJobReports.component.html",
    styleUrls: ["./searchSchedulerJobReports.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSchedulerJobReportsComponent implements OnInit {
    searchSchedulerJobReportsDataSource: SearchSchedulerJobReportsDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "ServerCode",
        "MachineName",
        "Description",
        "SchedulerJobId",
        "RunStatusName",
        "SchedulerJobTypeName",
        "FullClassName",
        "ApplicationParameter",
        "TotalElapsed",
        "ResultMessage",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSchedulerJobReportsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSchedulerJobReportsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSchedulerJobReportsService: SearchSchedulerJobReportsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSchedulerJobReportsDataSource =
            new SearchSchedulerJobReportsDataSource(
                this.searchSchedulerJobReportsService,
                this.searchSchedulerJobReportsPaginator,
                this.searchSchedulerJobReportsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSchedulerJobReportsDataSource) {
                    return;
                }
                this.searchSchedulerJobReportsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
