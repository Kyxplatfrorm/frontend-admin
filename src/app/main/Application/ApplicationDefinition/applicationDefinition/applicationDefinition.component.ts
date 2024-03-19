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
import { ApplicationDefinition } from "../applicationDefinitions/applicationDefinitions.model";
import { ApplicationDefinitionService } from "./applicationDefinition.service";
import AddAlertApplicationDefinition from "./addAppDefinition";
import UpdateAlertApplicationDefinition from "./updateAppDefinition";
import {
    ParameterApplicationTypeEntity,
    ParameterUserTypeEntity,
} from "app/ui/applicationDefinition";
import { ApplicationProfilesService } from "../../ApplicationProfiles/applicationProfiles/applicationProfiles.service";
import { ApplicationDefinitionsService } from "../applicationDefinitions/applicationDefinitions.service";
import { ApplicationProfileListEntity } from "app/ui/applicationProfiles";

@Component({
    selector: "applicationDefinition",
    templateUrl: "./applicationDefinition.component.html",
    styleUrls: ["./applicationDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApplicationDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    applicationdefinition: ApplicationDefinition;
    pageType: string;
    parameterApplicationList: ParameterApplicationTypeEntity[];
    parameterUserList: ParameterUserTypeEntity[];
    applicationProfileList: ApplicationProfileListEntity[];
    applicationDefinitionForm: FormGroup;
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
        private applicationDefinitionService: ApplicationDefinitionService,
        private applicationDefinitionsService: ApplicationDefinitionsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertAppDefinition: AddAlertApplicationDefinition,
        private updateAlertAppDefinition: UpdateAlertApplicationDefinition,
        private applicationprofilesservice: ApplicationProfilesService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.applicationdefinition = new ApplicationDefinition();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.applicationDefinitionsService.GetApplicationTypes().then(() => {
            this.parameterApplicationList =
                this.applicationDefinitionsService.applicationTypeApiResponse.ParameterList;
        });
        this.applicationDefinitionsService.GetUserTypes().then(() => {
            this.parameterUserList =
                this.applicationDefinitionsService.userTypeApiResponse.ParameterList;
        });

        this.applicationDefinitionsService.GetAppProfiles().then(() => {
            this.applicationProfileList =
                this.applicationDefinitionsService.applicationProfilesApiResponse.ApplicationProfileList;
        });
        this.applicationDefinitionService.onApplicationDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((applicationdefinition) => {
                if (applicationdefinition) {
                    this.applicationdefinition = new ApplicationDefinition(
                        applicationdefinition
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.applicationdefinition = new ApplicationDefinition();
                }
                this.applicationDefinitionForm =
                    this.createApplicationDefinitionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createApplicationDefinitionForm
     *
     * @returns {FormGroup}
     */
    createApplicationDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.applicationdefinition.Id],
            ApplicationTypeId: [this.applicationdefinition.ApplicationTypeId],
            UserTypeId: [this.applicationdefinition.UserTypeId],
            ServerAddress: [this.applicationdefinition.ServerAddress],
            ApplicationProfileId: [
                this.applicationdefinition.ApplicationProfileId,
            ],
            ClusterId: [this.applicationdefinition.ClusterId],
            InstanceId: [this.applicationdefinition.InstanceId],
            ThreadCount: [this.applicationdefinition.ThreadCount],
            HasRestApi: [this.applicationdefinition.HasRestApi],
            RestApiPort: [this.applicationdefinition.RestApiPort],
            ServiceName: [this.applicationdefinition.ServiceName],
            Description: [this.applicationdefinition.Description],
        });
    }

    /**
     * UpdateApplicationDefinition
     */
    UpdateApplicationDefinition(): void {
        const data = this.applicationDefinitionForm.getRawValue();
        this.applicationDefinitionService
            .UpdateApplicationDefinition(data)
            .then(() => {
                this.applicationDefinitionService.onApplicationDefinitionChanged.next(
                    data
                );

                this.router.navigate([
                    "/Application/ApplicationDefinition/applicationDefinitions",
                ]);
                this.updateAlertAppDefinition.UpdateAlertApplicationDefinitionShow();
                this.applicationDefinitionsService.GetApplicationDefinitions();
            });
    }

    /**
     * CreateApplicationDefinition
     */
    CreateApplicationDefinition(): void {
        const data = this.applicationDefinitionForm.getRawValue();
        this.applicationDefinitionService
            .CreateApplicationDefinition(data)
            .then(() => {
                this.applicationDefinitionService.onApplicationDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Application/ApplicationDefinition/applicationDefinitions",
                ]);
                this.addAlertAppDefinition.AddAlertApplicationDefinitionShow();
                this.applicationDefinitionsService.GetApplicationDefinitions();
            });
    }
}
