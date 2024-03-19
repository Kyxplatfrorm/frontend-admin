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
import SearchSchedulerInstantJobProfilesDataSource from "./searchSchedulerInstantJobProfiles.datasource";
import { SearchSchedulerInstantJobProfilesService } from "./searchSchedulerInstantJobProfiles.service";

@Component({
    selector: "searchSchedulerInstantJobProfiles",
    templateUrl: "./searchSchedulerInstantJobProfiles.component.html",
    styleUrls: ["./searchSchedulerInstantJobProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSchedulerInstantJobProfilesComponent implements OnInit {
    searchSchedulerInstantJobProfilesDataSource: SearchSchedulerInstantJobProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "ProfileCode",
        "ServerCode",
        "Description",
        "SchedulerJobTypeName",
        "ApplicationPath",
        "ApplicationName",
        "ApplicationParameter",
        "FullClassName",
        "MethodName",
        "ProcedureName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSchedulerInstantJobProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSchedulerInstantJobProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSchedulerInstantJobProfilesService: SearchSchedulerInstantJobProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSchedulerInstantJobProfilesDataSource =
            new SearchSchedulerInstantJobProfilesDataSource(
                this.searchSchedulerInstantJobProfilesService,
                this.searchSchedulerInstantJobProfilesPaginator,
                this.searchSchedulerInstantJobProfilesSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSchedulerInstantJobProfilesDataSource) {
                    return;
                }
                this.searchSchedulerInstantJobProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchSchedulerInstantJobProfilesDataSource(): void {
        this.searchSchedulerInstantJobProfilesDataSource =
            new SearchSchedulerInstantJobProfilesDataSource(
                this.searchSchedulerInstantJobProfilesService,
                this.searchSchedulerInstantJobProfilesPaginator,
                this.searchSchedulerInstantJobProfilesSort
            );
    }

    /**
     * DeleteSchedulerInstantJobProfile
     */
    DeleteSchedulerInstantJobProfile(schedulerInstantJob): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchSchedulerInstantJobProfilesService
                    .DeleteSchedulerInstantJobProfile(schedulerInstantJob)
                    .then(() => {
                        this.searchSchedulerInstantJobProfilesService
                            .SearchSchedulerInstantJobProfile(
                                schedulerInstantJob
                            )
                            .then(() => {
                                this.refreshSearchSchedulerInstantJobProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
