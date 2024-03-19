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
import { UserProfilesDataSource } from "./userProfiles.datasource";
import { UserProfilesService } from "./userProfiles.service";

@Component({
    selector: "userProfiles",
    templateUrl: "./userProfiles.component.html",
    styleUrls: ["./userProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserProfilesComponent implements OnInit {
    userProfilesDataSource: UserProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "ProfileCode",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    userprofilespaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    userprofilessort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private userprofilesservice: UserProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.userProfilesDataSource = new UserProfilesDataSource(
            this.userprofilesservice,
            this.userprofilespaginator,
            this.userprofilessort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.userProfilesDataSource) {
                    return;
                }
                this.userProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshUserProfilesDataSource(): void {
        this.userProfilesDataSource = new UserProfilesDataSource(
            this.userprofilesservice,
            this.userprofilespaginator,
            this.userprofilessort
        );
    }

    /**
     * deleteUserProfile
     */
    deleteUserProfile(userprofile): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.userprofilesservice
                    .deleteUserProfile(userprofile)
                    .then(() => {
                        this.userprofilesservice.GetUserProfiles().then(() => {
                            this.refreshUserProfilesDataSource();
                        });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
