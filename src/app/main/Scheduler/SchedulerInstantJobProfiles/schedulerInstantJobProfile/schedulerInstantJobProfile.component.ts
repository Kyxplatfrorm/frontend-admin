import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
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
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SchedulerInstant } from "../schedulerInstantJobProfiles/schedulerInstantJobProfiles.model";
import {
    SchedulerJobTypesEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerInstantJobProfile";
import { SchedulerInstantJobProfileService } from "./schedulerInstantJobProfile.service";
import { SchedulerInstantJobProfilesService } from "../schedulerInstantJobProfiles/schedulerInstantJobProfiles.service";
import AddAlertSchedulerInstantJob from "./addSchedulerInstantJobProfile";
import UpdateAlertSchedulerInstantJob from "./updateSchedulerInstantJobProfile";
import { SearchSchedulerInstantJobProfilesService } from "../searchSchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles.service";
@Component({
    selector: "schedulerInstantJobProfile",
    templateUrl: "./schedulerInstantJobProfile.component.html",
    styleUrls: ["./schedulerInstantJobProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SchedulerInstantJobProfileComponent implements OnInit, OnDestroy {
    dialogRef: any;
    schedulerInstant: SchedulerInstant;
    pageType: string;
    tenant: TenantDefinitionEntity[];
    schedulerJobTypes: SchedulerJobTypesEntity[];
    schedulerInstantJobProfileForm: FormGroup;
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
        private schedulerInstantJobProfileService: SchedulerInstantJobProfileService,
        private schedulerInstantJobProfilesService: SchedulerInstantJobProfilesService,
        private searchSchedulerInstantJobProfilesService: SearchSchedulerInstantJobProfilesService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertSchedulerInstantJobProfile: AddAlertSchedulerInstantJob,
        private updateAlertSchedulerInstantJobProfile: UpdateAlertSchedulerInstantJob
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.schedulerInstant = new SchedulerInstant();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.schedulerInstantJobProfilesService
            .GetSchedulerJobTypes()
            .then(() => {
                this.schedulerJobTypes =
                    this.schedulerInstantJobProfilesService.schedulerJobTypesApiResponse.ParameterList;
            });

        this.schedulerInstantJobProfilesService.GetTenants().then(() => {
            this.tenant =
                this.schedulerInstantJobProfilesService.tenantApiResponse.TenantDefinitionList;
        });
        this.schedulerInstantJobProfileService.onSchedulerInstantJobProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((schedulerInstant) => {
                if (schedulerInstant) {
                    this.schedulerInstant = new SchedulerInstant(
                        schedulerInstant
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.schedulerInstant = new SchedulerInstant();
                }
                this.schedulerInstantJobProfileForm =
                    this.createSchedulerInstantJobProfileForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSchedulerInstantJobProfileForm
     *
     * @returns {FormGroup}
     */
    createSchedulerInstantJobProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.schedulerInstant.Id],
            TenantId: [this.schedulerInstant.TenantId],
            ProfileCode: [this.schedulerInstant.ProfileCode],
            IsTenantBasedJob: [this.schedulerInstant.IsTenantBasedJob],
            ProcedureName: [this.schedulerInstant.ProcedureName],
            ServerCode: [this.schedulerInstant.ServerCode],
            Description: [this.schedulerInstant.Description],
            SchedulerJobTypeId: [this.schedulerInstant.SchedulerJobTypeId],
            ApplicationPath: [this.schedulerInstant.ApplicationPath],
            ApplicationName: [this.schedulerInstant.ApplicationName],
            ApplicationParameter: [this.schedulerInstant.ApplicationParameter],
            FullClassName: [this.schedulerInstant.FullClassName],
            MethodName: [this.schedulerInstant.MethodName],
        });
    }

    /**
     * CreateSchedulerInstantJobProfile
     */
    CreateSchedulerInstantJobProfile(): void {
        const data = this.schedulerInstantJobProfileForm.getRawValue();
        this.schedulerInstantJobProfileService
            .CreateSchedulerInstantJobProfile(data)
            .then(() => {
                this.schedulerInstantJobProfileService.onSchedulerInstantJobProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "/Schedulers/SchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles",
                ]);
                this.addAlertSchedulerInstantJobProfile.AddAlertSchedulerInstantJobShow();
                this.searchSchedulerInstantJobProfilesService.SearchSchedulerInstantJobProfile(
                    this.schedulerInstant
                );
            });
    }

    /**
     * UpdateSchedulerInstantJobProfile
     */
    UpdateSchedulerInstantJobProfile(): void {
        const data = this.schedulerInstantJobProfileForm.getRawValue();
        this.schedulerInstantJobProfileService
            .UpdateSchedulerInstantJobProfile(data)
            .then(() => {
                this.schedulerInstantJobProfileService.onSchedulerInstantJobProfileChanged.next(
                    data
                );

                this.router.navigate([
                    "/Schedulers/SchedulerInstantJobProfiles/searchSchedulerInstantJobProfiles",
                ]);
                this.updateAlertSchedulerInstantJobProfile.UpdateAlertSchedulerInstantJobShow();
                this.searchSchedulerInstantJobProfilesService.SearchSchedulerInstantJobProfile(
                    this.schedulerInstant
                );
            });
    }

    onClearTenant(): void {
        this.schedulerInstantJobProfileForm.patchValue({
            TenantId: 0,
        });
        this.schedulerInstant.TenantId = 0;
    }

    onClearSchedulerJobType(): void {
        this.schedulerInstantJobProfileForm.patchValue({
            SchedulerJobTypeId: 0,
        });
        this.schedulerInstant.SchedulerJobTypeId = 0;
    }
}
