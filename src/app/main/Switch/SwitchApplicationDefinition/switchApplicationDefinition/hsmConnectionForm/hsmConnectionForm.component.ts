import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { HsmServicesEntity } from "app/ui/switchApplicationDefinition";
import { SwitchApplication } from "../../switchApplicationDefinitions/switchApplicationDefinitions.model";
import { SwitchApplicationDefinitionsService } from "../../switchApplicationDefinitions/switchApplicationDefinitions.service";
import { SwitchApplicationDefinitionService } from "../switchApplicationDefinition.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "hsmConnectionForm-dialog",
    templateUrl: "./hsmConnectionForm.component.html",
    styleUrls: ["./hsmConnectionForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class HsmConnectionFormDialogComponent {
    action: string;
    switchApplication: SwitchApplication;
    hsmConnectionForm: FormGroup;
    dialogTitle: string;
    hsmServiceList: HsmServicesEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<HsmConnectionFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<HsmConnectionFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSwitchAppHsmConnection = "";
        if (this.action === "edit") {
            popUpHeaderTextSwitchAppHsmConnection = "EDITPROFILE";
            this.switchApplication = _data.switchApplication;
        } else {
            popUpHeaderTextSwitchAppHsmConnection = "NEWPROFILE";
            this.switchApplication = new SwitchApplication({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSwitchAppHsmConnection)
            .subscribe((x) => (this.dialogTitle = x));
        this.hsmConnectionForm = this.createHsmConncetionForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.switchApplicationDefinitionsService.GetHsmServices().then(() => {
            this.hsmServiceList =
                this.switchApplicationDefinitionsService.hsmServicesApiResponse.ParameterList;
        });
    }

    /**
     * createHsmConncetionForm
     *
     * @returns {FormGroup}
     */
    createHsmConncetionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            HsmServiceApplicationId: [
                this.switchApplication.HsmServiceApplicationId,
            ],
            ConnectionCount: [this.switchApplication.ConnectionCount],
            ConnectionTimeout: [this.switchApplication.ConnectionTimeout],
            ConnectionCheckTimeSecond: [
                this.switchApplication.ConnectionCheckTimeSecond,
            ],
            ApplicationId: [this.switchApplication.ApplicationId],
        });
    }
}
