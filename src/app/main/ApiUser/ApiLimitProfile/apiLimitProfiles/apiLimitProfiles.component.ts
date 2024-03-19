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
import ApiLimitProfilesDataSource from "./apiLimitProfiles.datasource";
import { ApiLimitProfilesService } from "./apiLimitProfiles.service";

@Component({
    selector: "apiLimitProfiles",
    templateUrl: "./apiLimitProfiles.component.html",
    styleUrls: ["./apiLimitProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ApiLimitProfilesComponent implements OnInit {
    apiLimitProfilesDataSource: ApiLimitProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "ProfileName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    apiLimitProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    apiLimitProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private apiLimitProfilesService: ApiLimitProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.apiLimitProfilesDataSource = new ApiLimitProfilesDataSource(
            this.apiLimitProfilesService,
            this.apiLimitProfilesPaginator,
            this.apiLimitProfilesSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.apiLimitProfilesDataSource) {
                    return;
                }
                this.apiLimitProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshApiLimitProfilesDataSource(): void {
        this.apiLimitProfilesDataSource = new ApiLimitProfilesDataSource(
            this.apiLimitProfilesService,
            this.apiLimitProfilesPaginator,
            this.apiLimitProfilesSort
        );
    }

    /**
     * DeleteApiLimitProfile
     */
    DeleteApiLimitProfile(apiLimitProfile): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.apiLimitProfilesService
                    .DeleteApiLimitProfile(apiLimitProfile)
                    .then(() => {
                        this.apiLimitProfilesService
                            .GetApiLimitProfiles()
                            .then(() => {
                                this.refreshApiLimitProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
