import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import {
    HsmServicesEntity,
    SwitchConnectionTypeEntity,
    SwitchEndPointTypesEntity,
    SwitchKeyProfilesEntity,
} from "app/ui/switchApplicationDefinition";
import { SwitchApplication } from "../../switchApplicationDefinitions/switchApplicationDefinitions.model";
import { SwitchApplicationDefinitionsService } from "../../switchApplicationDefinitions/switchApplicationDefinitions.service";
import { SwitchApplicationDefinitionService } from "../switchApplicationDefinition.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "sessionListForm-dialog",
    templateUrl: "./sessionListForm.component.html",
    styleUrls: ["./sessionListForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SessionListFormDialogComponent {
    action: string;
    switchApplication: SwitchApplication;
    sessionListForm: FormGroup;
    dialogTitle: string;
    switchKeyProfileList: SwitchKeyProfilesEntity[];
    switchConncetionTypeList: SwitchConnectionTypeEntity[];
    switchEndPointTypeList: SwitchEndPointTypesEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SessionListFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SessionListFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSwitchAppDefinition = "";
        if (this.action === "edit") {
            popUpHeaderTextSwitchAppDefinition = "EDITPROFILE";
            this.switchApplication = _data.switchApplication;
        } else {
            popUpHeaderTextSwitchAppDefinition = "NEWPROFILE";
            this.switchApplication = new SwitchApplication({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSwitchAppDefinition)
            .subscribe((x) => (this.dialogTitle = x));
        this.sessionListForm = this.createSessionListForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.switchApplicationDefinitionsService
            .GetSwitchKeyProfiles()
            .then(() => {
                this.switchKeyProfileList =
                    this.switchApplicationDefinitionsService.switchKeyProfilesApiResponse.ParameterList;
            });
        this.switchApplicationDefinitionsService
            .GetSwitchConnectionTypes()
            .then(() => {
                this.switchConncetionTypeList =
                    this.switchApplicationDefinitionsService.switchConnectionTypeApiResponse.ParameterList;
            });
        this.switchApplicationDefinitionsService
            .GetSwitchEndPointTypes()
            .then(() => {
                this.switchEndPointTypeList =
                    this.switchApplicationDefinitionsService.switchEndPointTypesApiResponse.ParameterList;
            });
    }

    /**
     * createSessionListForm
     *
     * @returns {FormGroup}
     */
    createSessionListForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            ApplicationId: [this.switchApplication.ApplicationId],
            Description: [this.switchApplication.Description],
            KeyProfileId: [this.switchApplication.KeyProfileId],
            Priority: [this.switchApplication.Priority],
            ConnectionTypeId: [this.switchApplication.ConnectionTypeId],
            EndPointTypeId: [this.switchApplication.EndPointTypeId],
            PinBlockFormat: [this.switchApplication.PinBlockFormat],
            ConnectionTimeout: [this.switchApplication.ConnectionTimeout],
            ConnectionCheckTimeSecond: [
                this.switchApplication.ConnectionCheckTimeSecond,
            ],
        });
    }
}
