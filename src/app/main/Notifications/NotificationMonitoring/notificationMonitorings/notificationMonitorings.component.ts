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
import NotificationMonitoringsDataSource from "./notificationMonitorings.datasource";
import { NotificationMonitoringsService } from "./notificationMonitorings.service";

@Component({
    selector: "notificationMonitorings",
    templateUrl: "./notificationMonitorings.component.html",
    styleUrls: ["./notificationMonitorings.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class NotificationMonitoringsComponent implements OnInit {
    notificationMonitoringsDataSource: NotificationMonitoringsDataSource | null;
    displayedColumns = [
        "Id",
        "CustomerName",
        "NotificationTypeName",
        "LanguageCodeName",
        "ReceiverAddress",
        "Subject",
        "SentStatusName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    notificationMonitoringsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    notificationMonitoringsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private notificationMonitoringsService: NotificationMonitoringsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.notificationMonitoringsDataSource =
            new NotificationMonitoringsDataSource(
                this.notificationMonitoringsService,
                this.notificationMonitoringsPaginator,
                this.notificationMonitoringsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.notificationMonitoringsDataSource) {
                    return;
                }
                this.notificationMonitoringsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshNotificationMonitoringsDataSource(): void {
        this.notificationMonitoringsDataSource =
            new NotificationMonitoringsDataSource(
                this.notificationMonitoringsService,
                this.notificationMonitoringsPaginator,
                this.notificationMonitoringsSort
            );
    }

    /**
     * DeleteNotificationMonitoring
     */
    DeleteNotificationMonitoring(notificationMonitoring): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.notificationMonitoringsService
                    .DeleteNotificationMonitoring(notificationMonitoring)
                    .then(() => {
                        this.notificationMonitoringsService
                            .GetNotificationMonitorings()
                            .then(() => {
                                this.refreshNotificationMonitoringsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
