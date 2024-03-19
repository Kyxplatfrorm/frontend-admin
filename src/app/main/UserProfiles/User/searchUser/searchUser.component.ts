import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
import SearchUserDataSource from "./searchUser.datasource";
import { User } from "../users/users.model";
import { SearchUserService } from "./searchUser.service";
import { UserPasswordCountDialogComponent } from "../user/userAlertPasswordCount/userAlertPasswordCount.component";
import { UserAlertPasswordResetDialogComponent } from "../user/userAlertPasswordReset/userAlertPasswordReset.component";
import { SearchUserFormDialogComponent } from "./searchUserForm/searchUserForm.component";

@Component({
    selector: "searchUser",
    templateUrl: "./searchUser.component.html",
    styleUrls: ["./searchUser.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchUserComponent implements OnInit {
    searchUserDataSource: SearchUserDataSource | null;
    dialogRef: any;
    user: User;
    userForm: FormGroup;
    displayedColumns = [
        "Id",
        "TenantName",
        "UserType",
        "UserName",
        "UserStatus",
        "WrongAttemptCount",
        "UserProfile",
        "Email",
        "PhoneNumber",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];

    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchUserPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchUserSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    userPasswordResetDialogRef: MatDialogRef<UserAlertPasswordResetDialogComponent>;
    userPasswordCountDialogRef: MatDialogRef<UserPasswordCountDialogComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     *
     */

    constructor(
        private searchUserService: SearchUserService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.user = new User();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchUserDataSource = new SearchUserDataSource(
            this.searchUserService,
            this.searchUserPaginator,
            this.searchUserSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchUserDataSource) {
                    return;
                }
                this.searchUserDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshSearchUserDataSource(): void {
        this.searchUserDataSource = new SearchUserDataSource(
            this.searchUserService,
            this.searchUserPaginator,
            this.searchUserSort
        );
    }
    /**
     * SearchUserForm
     */
    SearchUserForm(user): void {
        this.dialogRef = this._matDialog.open(SearchUserFormDialogComponent, {
            panelClass: "searchUserForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var setPasswordRequest = response.getRawValue();
            setPasswordRequest.UserId = user.Id;
            this.searchUserService.SetPassword(setPasswordRequest).then(() => {
                this.searchUserService.SearchUser(this.user).then(() => {
                    this.refreshSearchUserDataSource();
                });
            });
        });
    }

    /**
     * ResetPasswordRetryCount
     */
    ResetPasswordRetryCount(user): void {
        this.dialogRef = this._matDialog.open(
            UserPasswordCountDialogComponent,
            {
                disableClose: false,
            }
        );
        this.dialogRef.componentInstance.Alertpasswordcountmessage;
        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchUserService
                    .ResetPasswordRetryCount(user)
                    .then(() => {
                        this.searchUserService
                            .SearchUser(this.user)
                            .then(() => {
                                this.refreshSearchUserDataSource();
                            });
                    });
            }
            this.dialogRef = null;
        });
    }
    /**
     * ResetPassword
     */
    ResetPassword(user): void {
        this.dialogRef = this._matDialog.open(
            UserAlertPasswordResetDialogComponent,
            {
                disableClose: false,
            }
        );
        this.dialogRef.componentInstance.Alertpasswordresetmessage;
        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchUserService.ResetPassword(user).then(() => {
                    this.searchUserService.SearchUser(this.user).then(() => {
                        this.refreshSearchUserDataSource();
                    });
                });
            }
            this.dialogRef = null;
        });
    }

    /**
     * DeleteUser
     */
    DeleteUser(user): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchUserService.DeleteUser(user).then(() => {
                    this.searchUserService.SearchUser(this.user).then(() => {
                        this.refreshSearchUserDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
