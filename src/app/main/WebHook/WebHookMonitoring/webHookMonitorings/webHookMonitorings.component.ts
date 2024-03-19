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
import WebHookMonitoringsDataSource from "./webHookMonitorings.datasource";
import { WebHookMonitoringsService } from "./webHookMonitorings.service";

@Component({
    selector: "webHookMonitorings",
    templateUrl: "./webHookMonitorings.component.html",
    styleUrls: ["./webHookMonitorings.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class WebHookMonitoringsComponent implements OnInit {
    webHookMonitoringsDataSource: WebHookMonitoringsDataSource | null;
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
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    webHookMonitoringsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    webHookMonitoringsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private webHookMonitoringsService: WebHookMonitoringsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.webHookMonitoringsDataSource = new WebHookMonitoringsDataSource(
            this.webHookMonitoringsService,
            this.webHookMonitoringsPaginator,
            this.webHookMonitoringsSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.webHookMonitoringsDataSource) {
                    return;
                }
                this.webHookMonitoringsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshWebHookMonitoringsDataSource(): void {
        this.webHookMonitoringsDataSource = new WebHookMonitoringsDataSource(
            this.webHookMonitoringsService,
            this.webHookMonitoringsPaginator,
            this.webHookMonitoringsSort
        );
    }

    /**
     * DeleteWebHookMonitoring
     */
    DeleteWebHookMonitoring(webHookMonitoring): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.webHookMonitoringsService
                    .DeleteWebHookMonitoring(webHookMonitoring)
                    .then(() => {
                        this.webHookMonitoringsService
                            .GetWebHookMonitorings()
                            .then(() => {
                                this.refreshWebHookMonitoringsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
