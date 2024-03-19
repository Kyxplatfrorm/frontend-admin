import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
import { Router } from "@angular/router";
import AlertSnackBar from "app/_helpers/AlertSnackbar";
import { ApiLimitProfile } from "../apiLimitProfiles/apiLimitProfiles.model";
import { ApiLimitProfilesService } from "../apiLimitProfiles/apiLimitProfiles.service";
import { ApiLimitProfileService } from "./apiLimitProfile.service";
import AddAlertApiLimitProfile from "./addApiLimitProfileAlert";
import UpdateAlertApiLimitProfile from "./updateApiLimitProfileAlert";
import { ValidDaysEntity } from "app/ui/apiLimitProfile";
import { TenantDefinitionEntity } from "app/ui/tenant";

@Component({
    selector: "apiLimitProfile",
    templateUrl: "./apiLimitProfile.component.html",
    styleUrls: ["./apiLimitProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApiLimitProfileComponent implements OnInit, OnDestroy {
    dialogRef: any;
    apiLimitProfile: ApiLimitProfile;
    pageType: string;
    apiLimitProfileForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    validDays: ValidDaysEntity[];
    tenantList: TenantDefinitionEntity[];

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
        private apiLimitProfilesService: ApiLimitProfilesService,
        private apiLimitProfileService: ApiLimitProfileService,
        private alertMessage: AlertSnackBar,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertApiLimitProfile: AddAlertApiLimitProfile,
        private updateAlertApiLimitProfile: UpdateAlertApiLimitProfile,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.apiLimitProfile = new ApiLimitProfile();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.apiLimitProfilesService.GetValidDays().then(() => {
            this.validDays =
                this.apiLimitProfilesService.validDaysApiResponse.ParameterList;
        });
        this.apiLimitProfilesService.GetTenants().then(() => {
            this.tenantList =
                this.apiLimitProfilesService.tenantApiResponse.TenantDefinitionList;
        });

        this.apiLimitProfileService.onApiLimitProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((apiLimitProfile) => {
                if (apiLimitProfile) {
                    this.apiLimitProfile = new ApiLimitProfile(apiLimitProfile);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.apiLimitProfile = new ApiLimitProfile({});
                    this.apiLimitProfile.ValidStartTime = "00:00:00";
                    this.apiLimitProfile.ValidEndTime = "23:59:59";
                }

                this.apiLimitProfileForm = this.createApiLimitProfileForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     * createApiLimitProfileForm
     *
     * @returns {FormGroup}
     */
    createApiLimitProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.apiLimitProfile.Id],
            ProfileName: [this.apiLimitProfile.ProfileName],
            HasValidDays: [this.apiLimitProfile.HasValidDays],
            ValidDayList: [this.apiLimitProfile.ValidDayList],
            HasValidHours: [this.apiLimitProfile.HasValidHours],
            ValidStartTime: [this.apiLimitProfile.ValidStartTime],
            ValidEndTime: [this.apiLimitProfile.ValidEndTime],
            HasDailyMaxExecutionCount: [
                this.apiLimitProfile.HasDailyMaxExecutionCount,
            ],
            DailyMaxExecutionCount: [
                this.apiLimitProfile.DailyMaxExecutionCount,
            ],
            HasMaxTpsCount: [this.apiLimitProfile.HasMaxTpsCount],
            MaxTpsCount: [this.apiLimitProfile.MaxTpsCount],
            TenantId: [this.apiLimitProfile.TenantId],
        });
    }

    /**
     * CreateApiLimitProfile
     */
    CreateApiLimitProfile(): void {
        const data = this.apiLimitProfileForm.getRawValue();
        this.apiLimitProfileService.CreateApiLimitProfile(data).then(() => {
            this.apiLimitProfileService.onApiLimitProfileChanged.next(data);
            this.router.navigate(["ApiUser/ApiLimitProfile/apiLimitProfiles"]);
            this.addAlertApiLimitProfile.AddAlertApiLimitProfileShow();
        });
    }

    /**
     * UpdateApiLimitProfile
     */
    UpdateApiLimitProfile(): void {
        const data = this.apiLimitProfileForm.getRawValue();
        this.apiLimitProfileService.UpdateApiLimitProfile(data).then(() => {
            this.apiLimitProfileService.onApiLimitProfileChanged.next(data);
            this.router.navigate(["ApiUser/ApiLimitProfile/apiLimitProfiles"]);
            this.updateAlertApiLimitProfile.UpdateAlertApiLimitProfileShow();
        });
    }
}
