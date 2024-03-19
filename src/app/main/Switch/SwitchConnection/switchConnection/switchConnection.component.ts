import {
    ChangeDetectorRef,
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
import SwitchConnectionDataSource from "./switchConnection.datasource";
import { SwitchConnectionService } from "./switchConnection.service";
import { SwitchConnection } from "../switchConnections/switchConnections.model";
import { Router } from "@angular/router";
import { MatTabGroup } from "@angular/material/tabs";
import SwitchConnectionLogDataSource from "./switchConnectionLog.datasource";
import { SwitchConnectionLogService } from "./switchConnectionLog.service";

@Component({
    selector: "switchConnection",
    templateUrl: "./switchConnection.component.html",
    styleUrls: ["./switchConnection.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchConnectionComponent implements OnInit {
    switchConnectionDataSource: SwitchConnectionDataSource | null;
    switchConnectionLogDataSource: SwitchConnectionLogDataSource | null;
    displayedColumns = [
        "Id",
        "ApplicationName",
        "SessionName",
        "ConnectionType",
        "RemoteIpAddress",
        "LocalIpAddress",
        "IsConnected",
        "ConnectionStartDateTime",
        "ConnectionEndDateTime",
    ];
    displayedColumns2 = [
        "Id",
        "ApplicationName",
        "SessionName",
        "ConnectionType",
        "RemoteIpAddress",
        "LocalIpAddress",
        "IsConnected",
        "ConnectionStartDateTime",
        "ConnectionEndDateTime",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    switchConnectionForm: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchConnectionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchConnectionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    @ViewChild(MatPaginator, { static: true })
    switchConnectionLogPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchConnectionLogSort: MatSort;
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
    private _unsubscribeAll: Subject<any>;
    switchConnection: SwitchConnection;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchConnectionService: SwitchConnectionService,
        private switchConnectionLogService: SwitchConnectionLogService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.switchConnectionDataSource = new SwitchConnectionDataSource(
            this.switchConnectionService,
            this.switchConnectionPaginator,
            this.switchConnectionSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchConnectionDataSource) {
                    return;
                }
                this.switchConnectionDataSource.filter =
                    this.filter.nativeElement.value;
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
    onRowDoubleClick(switchConnection: any) {
        this.tabGroup.selectedIndex = 1;
        this.switchConnectionLogService
            .GetSwitchConnectionLogBySessionId(switchConnection)
            .then((response) => {
                this.switchConnectionLogDataSource =
                    new SwitchConnectionLogDataSource(
                        this.switchConnectionLogService,
                        this.switchConnectionLogPaginator,
                        this.switchConnectionLogSort
                    );
                fromEvent(this.filter.nativeElement, "keyup")
                    .pipe(
                        takeUntil(this._unsubscribeAll),
                        debounceTime(150),
                        distinctUntilChanged()
                    )
                    .subscribe(() => {
                        if (!this.switchConnectionLogDataSource) {
                            return;
                        }
                        this.switchConnectionLogDataSource.filter =
                            this.filter.nativeElement.value;
                    });
                response;
            });
    }
}
