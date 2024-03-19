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
import SearchSchedulerJobDefinitionDataSource from "./searchSchedulerJobDefinition.datasource";
import { SearchSchedulerJobDefinitionService } from "./searchSchedulerJobDefinition.service";

@Component({
    selector: "searchSchedulerJobDefinition",
    templateUrl: "./searchSchedulerJobDefinition.component.html",
    styleUrls: ["./searchSchedulerJobDefinition.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSchedulerJobDefinitionComponent implements OnInit {
    searchSchedulerJobDefinitionDataSource: SearchSchedulerJobDefinitionDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "Description",
        "RecurringTypeName",
        "RecurringLevelName",
        "RecurringWeekDays",
        "LastRunStatusName",
        "RecurringDailyTimes",
        "LastProcessedStepCount",
        "LastSubStepCount",
        "ServerCode",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSchedulerJobDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSchedulerJobDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSchedulerJobDefinitionService: SearchSchedulerJobDefinitionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSchedulerJobDefinitionDataSource =
            new SearchSchedulerJobDefinitionDataSource(
                this.searchSchedulerJobDefinitionService,
                this.searchSchedulerJobDefinitionPaginator,
                this.searchSchedulerJobDefinitionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSchedulerJobDefinitionDataSource) {
                    return;
                }
                this.searchSchedulerJobDefinitionDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchSchedulerJobDefinitionDataSource(): void {
        this.searchSchedulerJobDefinitionDataSource =
            new SearchSchedulerJobDefinitionDataSource(
                this.searchSchedulerJobDefinitionService,
                this.searchSchedulerJobDefinitionPaginator,
                this.searchSchedulerJobDefinitionSort
            );
    }

    /**
     * DeleteSchedulerJobDefinition
     */
    DeleteSchedulerJobDefinition(schedulerJob): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchSchedulerJobDefinitionService
                    .DeleteSchedulerJobDefinition(schedulerJob)
                    .then(() => {
                        this.searchSchedulerJobDefinitionService
                            .SearchSchedulerJobDefinition(schedulerJob)
                            .then(() => {
                                this.refreshSearchSchedulerJobDefinitionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
