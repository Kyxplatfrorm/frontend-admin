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
import SearchNotificationReportDataSource from "./searchNotificationReport.datasource";
import { SearchNotificationReportService } from "./searchNotificationReport.service";

@Component({
    selector: "searchNotificationReport",
    templateUrl: "./searchNotificationReport.component.html",
    styleUrls: ["./searchNotificationReport.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchNotificationReportComponent implements OnInit {
    searchNotificationReportDataSource: SearchNotificationReportDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "CustomerName",
        "NotificationTypeName",
        "LanguageCodeName",
        "ReceiverAddress",
        "Subject",
        "SentStatusName",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchNotificationReportPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchNotificationReportSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchNotificationReportService: SearchNotificationReportService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchNotificationReportDataSource =
            new SearchNotificationReportDataSource(
                this.searchNotificationReportService,
                this.searchNotificationReportPaginator,
                this.searchNotificationReportSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchNotificationReportDataSource) {
                    return;
                }
                this.searchNotificationReportDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
