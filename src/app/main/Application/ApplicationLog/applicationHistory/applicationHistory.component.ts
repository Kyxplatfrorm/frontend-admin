import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import ApplicationLogHistoryDataSource from "./applicationHistory.datasource";
import { ApplicationLog } from "../applicationLog/applicationLog.model";
import { ApplicationLogService } from "../applicationLog/applicationLog.service";
import { ApplicationLogHistoryService } from "./applicationHistory.service";

@Component({
    selector: "applicationHistory",
    templateUrl: "./applicationHistory.component.html",
    styleUrls: ["./applicationHistory.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApplicationLogHistoryComponent {
    applicationLogHistoryDataSource: ApplicationLogHistoryDataSource | null;
    dialogRef: any;
    applicationlog: ApplicationLog;
    pageType: string;
    applicationLogHistoryForm: FormGroup;
    displayedColumns = [
        "ServerName",
        "ProcessId",
        "ApplicationType",
        "ServiceName",
        "StartDateTime",
        "EndDateTime",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: true })
    applicationLogHistoryPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    applicationLogHistorySort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private applicationLogService: ApplicationLogService,
        private applicationLogHistoryService: ApplicationLogHistoryService,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.applicationlog = new ApplicationLog();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.applicationLogHistoryDataSource =
            new ApplicationLogHistoryDataSource(
                this.applicationLogHistoryService,
                this.applicationLogHistoryPaginator,
                this.applicationLogHistorySort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.applicationLogHistoryDataSource) {
                    return;
                }
                this.applicationLogHistoryDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.applicationLogHistoryService.onApplicationLogHistoryChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((applicationlog) => {
                if (applicationlog) {
                    this.applicationlog = new ApplicationLog(applicationlog);
                    this.pageType = "edit";
                    this.applicationLogHistoryService.logList =
                        applicationlog.LogList;
                }
                this.applicationLogHistoryForm =
                    this.createApplicationLogHistoryForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createApplicationLogHistoryForm
     *
     * @returns {FormGroup}
     */
    createApplicationLogHistoryForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.applicationlog.Id],
            ApplicationId: [this.applicationlog.ApplicationId],
            LastLogId: [this.applicationlog.LastLogId],
            IsRunning: [this.applicationlog.IsRunning],
            ServerName: [this.applicationlog.ServerName],
            ProcessId: [this.applicationlog.ProcessId],
            ApplicationType: [this.applicationlog.ApplicationType],
            ServiceName: [this.applicationlog.ServiceName],
            ProcessName: [this.applicationlog.ProcessName],
            FirtStartDateTime: [this.applicationlog.FirtStartDateTime],
            StartDateTime: [this.applicationlog.StartDateTime],
            EndDateTime: [this.applicationlog.EndDateTime],
        });
    }
}
