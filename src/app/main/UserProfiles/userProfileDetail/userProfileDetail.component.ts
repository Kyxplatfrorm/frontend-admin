import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { UserProfile } from "./userProfileDetail.model";
import { UserProfileDetailService } from "./userProfileDetail.service";
import { UserProfilesService } from "../userProfiles/userProfiles.service";
import { Router } from "@angular/router";
import AddAlertUserProfile from "./addUserProfile";
import UpdateAlertUserProfile from "./updateUserProfile";

@Component({
    selector: "userProfileDetail",
    templateUrl: "./userProfileDetail.component.html",
    styleUrls: ["./userProfileDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    userprofile: UserProfile;
    pageType: string;
    userProfileDetailForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

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
        private userprofilesservice: UserProfilesService,
        private userDetailservice: UserProfileDetailService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private addAlertUserProfile: AddAlertUserProfile,
        private updateAlertUserProfile: UpdateAlertUserProfile
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.userprofile = new UserProfile();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.userDetailservice.onUserProfileDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((userprofile) => {
                if (userprofile) {
                    this.userprofile = new UserProfile(userprofile);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.userprofile = new UserProfile();
                }
                this.userProfileDetailForm = this.createUserProfileDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createUserDetailForm
     *
     * @returns {FormGroup}
     */
    createUserProfileDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.userprofile.Id],
            ForceTwoFactorAuth: [this.userprofile.ForceTwoFactorAuth],
            ProfileCode: [this.userprofile.ProfileCode],
            HasSessionTimeOut: [this.userprofile.HasSessionTimeOut],
            SessionTimeInMinutes: [this.userprofile.SessionTimeInMinutes],
            MinimumPasswordLenght: [this.userprofile.MinimumPasswordLenght],
            PasswordNumericLenght: [this.userprofile.PasswordNumericLenght],
            PasswordBigLetterLength: [this.userprofile.PasswordBigLetterLength],
            PasswordSmallLetterLength: [
                this.userprofile.PasswordSmallLetterLength,
            ],
            PasswordSpecialCharacterLength: [
                this.userprofile.PasswordSpecialCharacterLength,
            ],
            PasswordRenewPeriod: [this.userprofile.PasswordRenewPeriod],
            LastPasswordCheckCount: [this.userprofile.LastPasswordCheckCount],
            TemporarilyPasswordValidHours: [
                this.userprofile.TemporarilyPasswordValidHours,
            ],
        });
    }

    /**
     * updateUserProfileDetail
     */
    updateUserProfileDetail(): void {
        const data = this.userProfileDetailForm.getRawValue();
        this.userDetailservice.updateUserProfileDetail(data).then(() => {
            this.userDetailservice.onUserProfileDetailChanged.next(data);
            this.router.navigate(["/UserProfiles/userProfiles"]);
            this.updateAlertUserProfile.UpdateAlertUserProfileShow();
            this.userprofilesservice.GetUserProfiles();
        });
    }

    /**
     * createUserProfileDetail
     */
    createUserProfileDetail(): void {
        const data = this.userProfileDetailForm.getRawValue();
        this.userDetailservice.createUserProfileDetail(data).then(() => {
            this.userDetailservice.onUserProfileDetailChanged.next(data);
            this.router.navigate(["/UserProfiles/userProfiles"]);
            this.addAlertUserProfile.AddAlertUserProfileShow();
            this.userprofilesservice.GetUserProfiles();
        });
    }
}
