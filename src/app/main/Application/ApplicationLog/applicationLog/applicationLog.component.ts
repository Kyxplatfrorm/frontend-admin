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
import ApplicationLogDataSource from "./applicationLog.datasource";
import { ApplicationLogService } from "./applicationLog.service";

@Component({
    selector: "applicationLog",
    templateUrl: "./applicationLog.component.html",
    styleUrls: ["./applicationLog.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationLogComponent implements OnInit {
    applicationLogDataSource: ApplicationLogDataSource | null;
    displayedColumns = [
        "Id",
        "ApplicationId",
        "IsRunning",
        "ServiceName",
        "ServerName",
        "ApplicationType",
        "StartDateTime",
        "EndDateTime",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    appLogpaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    appLogsort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private applicationLogservice: ApplicationLogService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.applicationLogDataSource = new ApplicationLogDataSource(
            this.applicationLogservice,
            this.appLogpaginator,
            this.appLogsort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.applicationLogDataSource) {
                    return;
                }
                this.applicationLogDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshAppLogDataSource(): void {
        this.applicationLogDataSource = new ApplicationLogDataSource(
            this.applicationLogservice,
            this.appLogpaginator,
            this.appLogsort
        );
    }
}
