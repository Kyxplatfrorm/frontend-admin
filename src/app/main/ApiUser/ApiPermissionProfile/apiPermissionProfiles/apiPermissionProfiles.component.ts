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
import ApiPermissionProfilesDataSource from "./apiPermissionProfiles.datasource";
import { ApiPermissionProfilesService } from "./apiPermissionProfiles.service";

@Component({
    selector: "apiPermissionProfiles",
    templateUrl: "./apiPermissionProfiles.component.html",
    styleUrls: ["./apiPermissionProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ApiPermissionProfilesComponent implements OnInit {
    apiPermissionProfilesDataSource: ApiPermissionProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "ProfileName",
        "ApplicationTypeName",
        "PermissionCheckTypeName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    apiPermissionProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    apiPermissionProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private apiPermissionProfilesService: ApiPermissionProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.apiPermissionProfilesDataSource =
            new ApiPermissionProfilesDataSource(
                this.apiPermissionProfilesService,
                this.apiPermissionProfilesPaginator,
                this.apiPermissionProfilesSort
            );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.apiPermissionProfilesDataSource) {
                    return;
                }
                this.apiPermissionProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshApiPermissionProfileDataSource(): void {
        this.apiPermissionProfilesDataSource =
            new ApiPermissionProfilesDataSource(
                this.apiPermissionProfilesService,
                this.apiPermissionProfilesPaginator,
                this.apiPermissionProfilesSort
            );
    }

    /**
     * DeleteApiPermissionProfile
     */
    DeleteApiPermissionProfile(apiPermissionProfile): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.apiPermissionProfilesService
                    .DeleteApiPermissionProfile(apiPermissionProfile)
                    .then(() => {
                        this.apiPermissionProfilesService
                            .GetApiPermissionProfiles()
                            .then(() => {
                                this.refreshApiPermissionProfileDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
