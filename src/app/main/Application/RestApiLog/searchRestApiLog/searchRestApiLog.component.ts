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
import SearchRestApiLogDataSource from "./searchRestApiLog.datasource";
import { SearchRestApiLogService } from "./searchRestApiLog.service";

@Component({
    selector: "searchRestApiLog",
    templateUrl: "./searchRestApiLog.component.html",
    styleUrls: ["./searchRestApiLog.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchRestApiLogComponent implements OnInit {
    searchRestApiLogDataSource: SearchRestApiLogDataSource | null;
    displayedColumns = [
        "Id",
        "UserName",
        "ServerType",
        "ApiName",
        "ApiStatus",
        "ClientIp",
        "ControllerName",
        "HttpMethod",
        "ErrorCode",
        "TotalElapsed",
        "InsertDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchRestApiLogPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchRestApiLogSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchRestApiLogService: SearchRestApiLogService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchRestApiLogDataSource = new SearchRestApiLogDataSource(
            this.searchRestApiLogService,
            this.searchRestApiLogPaginator,
            this.searchRestApiLogSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchRestApiLogDataSource) {
                    return;
                }
                this.searchRestApiLogDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
