import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { MyProfileService } from "./myProfile.service";
import { MyProfile } from "./myProfile.model";
import { MyProfileFormDialogComponent } from "./myProfileForm/myProfileForm.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import UpdateAlertMyProfile from "./updateMyProfileAlert";
import { User } from "../users/users.model";
import ChangePasswordAlertMyProfile from "./changePasswordAlert";
import { CurrentUserEntity } from "app/ui/currentUser";

@Component({
    selector: "myProfile",
    templateUrl: "./myProfile.component.html",
    styleUrls: ["./myProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class MyProfileComponent implements OnInit, OnDestroy {
    dialogRef: any;
    myProfile: MyProfile;
    user: User;
    pageType: string;
    myProfileForm: FormGroup;
    currentUserList: CurrentUserEntity[];
    datePasswordResetDate: Date = new Date();
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    imageUrl: string;
    selectedFile: File;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private myProfileService: MyProfileService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private cdr: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private updateAlertMyProfile: UpdateAlertMyProfile,
        private changePasswordAlertMyProfile: ChangePasswordAlertMyProfile
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.myProfile = new MyProfile();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.myProfileService.GetCurrentUser().then(() => {
            this.currentUserList =
                this.myProfileService.currentUserApiResponse.CurrentUser;
        });
        this.myProfileService.onMyProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((myProfile) => {
                this.myProfile = new MyProfile(myProfile);
                this.myProfileService.apiKeyList = myProfile.ApiKeyList;
                this.myProfileForm = this.createMyProfileForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createMyProfileForm
     *
     * @returns {FormGroup}
     */
    createMyProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.myProfile.Id],
            UserName: [this.myProfile.UserName],
            UserFullName: [this.myProfile.UserFullName],
            Email: [this.myProfile.Email],
            InternationalPhoneCode: [this.myProfile.InternationalPhoneCode],
            PhoneNumber: [this.myProfile.PhoneNumber],
            UtcTimeOffset: [this.myProfile.UtcTimeOffset],
            OldPassword: [this.myProfile.OldPassword],
            NewPassword: [this.myProfile.NewPassword],
            NewPassword2: [this.myProfile.NewPassword2],
            TenantName:[this.myProfile.TenantName],
        });
    }

    /**
     * UpdateCurrentUser
     */
    UpdateCurrentUser(): void {
        const data = this.myProfileForm.getRawValue();
        this.myProfileService.UpdateCurrentUser(data).then(() => {
            this.myProfileService.onMyProfileChanged.next(data);
            this.updateAlertMyProfile.UpdateAlertMyProfileShow();
        });
    }
    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(MyProfileFormDialogComponent, {
            panelClass: "myProfileForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            var myProfileRequest = response.getRawValue();
            this.myProfileService
                .ChangeCurrentUserPassword(myProfileRequest)
                .then(() => {
                    this.changePasswordAlertMyProfile.ChangePasswordAlertMyProfileShow();
                });
        });
    }

    onFileSelected(event): void {
        this.selectedFile = event.target.files[0];
    }

    uploadFile(): void {
        const formData = new FormData();
        formData.append("file", this.selectedFile, this.selectedFile.name);

        // Send formData to the server using HttpClient

        // After receiving a response, set the imageUrl to the server's response
        this.imageUrl = "http://example.com/image.jpg";
    }
}
