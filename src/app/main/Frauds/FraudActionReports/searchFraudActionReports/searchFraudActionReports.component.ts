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
import SearchFraudActionReportsDataSource from "./searchFraudActionReports.datasource";
import { SearchFraudActionReportsService } from "./searchFraudActionReports.service";
import { FraudAction } from "../fraudActionReports/fraudActionReports.model";
import { FraudActionReportService } from "../fraudActionReport/fraudActionReport.service";
import { FraudActionFormDialogComponent } from "./fraudActionForm/fraudActionForm.component";

@Component({
    selector: "searchFraudActionReports",
    templateUrl: "./searchFraudActionReports.component.html",
    styleUrls: ["./searchFraudActionReports.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchFraudActionReportsComponent implements OnInit {
    searchFraudActionReportsDataSource: SearchFraudActionReportsDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "UserName",
        "FraudApiName",
        "FraudRuleName",
        "ApplicationTypeName",
        "FraudRuleActionTypeName",
        "FraudRuleActionStatusName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchFraudActionReportsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchFraudActionReportsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;
    fraudAction: FraudAction;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchFraudActionReportsService: SearchFraudActionReportsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private fraudActionReportService: FraudActionReportService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchFraudActionReportsDataSource =
            new SearchFraudActionReportsDataSource(
                this.searchFraudActionReportsService,
                this.searchFraudActionReportsPaginator,
                this.searchFraudActionReportsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchFraudActionReportsDataSource) {
                    return;
                }
                this.searchFraudActionReportsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchFraudActionReportsDataSource(): void {
        this.searchFraudActionReportsDataSource =
            new SearchFraudActionReportsDataSource(
                this.searchFraudActionReportsService,
                this.searchFraudActionReportsPaginator,
                this.searchFraudActionReportsSort
            );
    }

    /**
     * EditFraudAction
     *
     * @param fraudAction
     */
    EditFraudAction(fraudAction): void {
        this.dialogRef = this._matDialog.open(FraudActionFormDialogComponent, {
            panelClass: "fraudActionForm-dialog",
            data: {
                fraudAction: fraudAction,
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var fraudActionReportRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.fraudActionReportService
                        .UpdateFraudActionReport(fraudActionReportRequest)
                        .then(() => {
                            this.searchFraudActionReportsService
                                .SearchFraudActionReport(fraudAction)
                                .then(() => {
                                    this.refreshSearchFraudActionReportsDataSource();
                                });
                        });
                    break;
            }
        });
    }
}
