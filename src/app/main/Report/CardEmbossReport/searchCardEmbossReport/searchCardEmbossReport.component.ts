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
import SearchCardEmbossReportDataSource from "./searchCardEmbossReport.datasource";
import { SearchCardEmbossReportService } from "./searchCardEmbossReport.service";

@Component({
    selector: "searchCardEmbossReport",
    templateUrl: "./searchCardEmbossReport.component.html",
    styleUrls: ["./searchCardEmbossReport.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchCardEmbossReportComponent implements OnInit {
    searchCardEmbossReportDataSource: SearchCardEmbossReportDataSource | null;
    displayedColumns = [
        "Id",
        "InsertDateTime",
        "TenantName",
        "ErrorCode",
        "CardTokenNumber",
        "ExpiryDate",
        "EmbossName1",
        "EmbossName2",
        "EmbossStatus",
        "IsNoNameCard",
        "ContractType",
        "PanSequenceNumber",
        "CardIssuingReasonType",
        "FileName",
        "IsExported",
        "ExportDateTime",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchCardEmbossReportPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchCardEmbossReportSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchCardEmbossReportService: SearchCardEmbossReportService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchCardEmbossReportDataSource =
            new SearchCardEmbossReportDataSource(
                this.searchCardEmbossReportService,
                this.searchCardEmbossReportPaginator,
                this.searchCardEmbossReportSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchCardEmbossReportDataSource) {
                    return;
                }
                this.searchCardEmbossReportDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
