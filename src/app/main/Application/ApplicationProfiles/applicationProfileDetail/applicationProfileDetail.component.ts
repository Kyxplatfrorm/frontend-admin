import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ApplicationProfilesService } from "../applicationProfiles/applicationProfiles.service";
import { ApplicationProfile } from "./applicationProfileDetail.model";
import { ApplicationProfileDetailService } from "./applicationProfileDetail.service";
import AddAlertAppProfile from "./addAppProfile";
import UpdateAlertAppProfile from "./updateAppProfile";

@Component({
    selector: "applicationProfileDetail",
    templateUrl: "./applicationProfileDetail.component.html",
    styleUrls: ["./applicationProfileDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApplicationProfileDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    applicationprofile: ApplicationProfile;
    pageType: string;
    applicationProfileDetailForm: FormGroup;
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
        private applicationProfileService: ApplicationProfilesService,
        private appProfileDetailService: ApplicationProfileDetailService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertAppProfile: AddAlertAppProfile,
        private updateAlertAppProfile: UpdateAlertAppProfile
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.applicationprofile = new ApplicationProfile();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.appProfileDetailService.onApplicationProfileDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((applicationprofile) => {
                if (applicationprofile) {
                    this.applicationprofile = new ApplicationProfile(
                        applicationprofile
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.applicationprofile = new ApplicationProfile();
                }
                this.applicationProfileDetailForm =
                    this.createApplicationProfileDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createApplicationProfileDetailForm
     *
     * @returns {FormGroup}
     */
    createApplicationProfileDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.applicationprofile.Id],
            DisableOperationLogging: [
                this.applicationprofile.DisableOperationLogging,
            ],
            HasCommandTimeout: [this.applicationprofile.HasCommandTimeout],
            DisableMonitoring: [this.applicationprofile.DisableMonitoring],
            DisableRestLog: [this.applicationprofile.DisableRestLog],
            EnableSwaggerLogin: [this.applicationprofile.EnableSwaggerLogin],
            EnableSwagger: [this.applicationprofile.EnableSwagger],
            LoadExternalWebApi: [this.applicationprofile.LoadExternalWebApi],
            ChangeHttpStatusCode: [
                this.applicationprofile.ChangeHttpStatusCode,
            ],
            ProfileName: [this.applicationprofile.ProfileName],
            SqlLogTimeoutThreshold: [
                this.applicationprofile.SqlLogTimeoutThreshold,
            ],
            TimeZoneInMinute: [this.applicationprofile.TimeZoneInMinute],
            CommandTimeout: [this.applicationprofile.CommandTimeout],
            SpaHostingPath: [this.applicationprofile.SpaHostingPath],
            SwaggerBasePath: [this.applicationprofile.SwaggerBasePath],
            LogHttpGetApiCalls: [this.applicationprofile.LogHttpGetApiCalls],
            MaskJsonRequest: [this.applicationprofile.MaskJsonRequest],
        });
    }

    /**
     * updateAppProfileDetail
     */
    UpdateAppProfileDetail(): void {
        const data = this.applicationProfileDetailForm.getRawValue();
        this.appProfileDetailService.UpdateAppProfileDetail(data).then(() => {
            this.appProfileDetailService.onApplicationProfileDetailChanged.next(
                data
            );
            this.router.navigate([
                "/Application/ApplicationProfiles/applicationProfiles",
            ]);
            this.updateAlertAppProfile.UpdateAlertAppProfileShow();
        });
    }

    /**
     * createAppProfileDetail
     */
    CreateAppProfileDetail(): void {
        const data = this.applicationProfileDetailForm.getRawValue();
        this.appProfileDetailService.CreateAppProfileDetail(data).then(() => {
            this.appProfileDetailService.onApplicationProfileDetailChanged.next(
                data
            );
            this.router.navigate([
                "/Application/ApplicationProfiles/applicationProfiles",
            ]);
            this.addAlertAppProfile.AddAlertAppProfileShow();
        });
    }
}
