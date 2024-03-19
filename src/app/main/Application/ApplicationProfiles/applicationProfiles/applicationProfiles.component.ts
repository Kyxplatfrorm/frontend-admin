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
import { ApplicationProfilesDataSource } from "./applicationProfiles.datasource";
import { ApplicationProfilesService } from "./applicationProfiles.service";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "applicationProfiles",
    templateUrl: "./applicationProfiles.component.html",
    styleUrls: ["./applicationProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationProfilesComponent implements OnInit {
    applicationProfilesDataSource: ApplicationProfilesDataSource | null;
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
    appprofilespaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    appprofilessort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private applicationprofilesservice: ApplicationProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.applicationProfilesDataSource = new ApplicationProfilesDataSource(
            this.applicationprofilesservice,
            this.appprofilespaginator,
            this.appprofilessort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.applicationProfilesDataSource) {
                    return;
                }
                this.applicationProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshAppProfilesDataSource(): void {
        this.applicationProfilesDataSource = new ApplicationProfilesDataSource(
            this.applicationprofilesservice,
            this.appprofilespaginator,
            this.appprofilessort
        );
    }

    /**
     * DeleteApplicationProfile
     */
    deleteAppProfiles(applicationprofile): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.applicationprofilesservice
                    .deleteAppProfiles(applicationprofile)

                    .then(() => {
                        this.applicationprofilesservice
                            .GetAppProfiles()
                            .then(() => {
                                this.refreshAppProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
