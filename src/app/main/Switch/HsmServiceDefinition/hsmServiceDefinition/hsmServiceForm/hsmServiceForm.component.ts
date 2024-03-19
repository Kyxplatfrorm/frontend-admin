import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { ApplicationListEntity } from "app/ui/applicationDefinition";
import { DevicesEntity } from "app/ui/hsmServiceDefinition";
import { HsmService } from "../../hsmServiceDefinitions/hsmServiceDefinitions.model";
import { HsmServiceDefinitionsService } from "../../hsmServiceDefinitions/hsmServiceDefinitions.service";
import { HsmServiceDefinitionService } from "../hsmServiceDefinition.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "hsmServiceForm-dialog",
    templateUrl: "./hsmServiceForm.component.html",
    styleUrls: ["./hsmServiceForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class HsmServiceFormDialogComponent {
    action: string;
    hsmService: HsmService;
    hsmServiceForm: FormGroup;
    dialogTitle: string;
    devicesList: DevicesEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<HsmServiceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<HsmServiceFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private hsmServiceDefinitionsService: HsmServiceDefinitionsService,
        private hsmServiceDefinitionService: HsmServiceDefinitionService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextHsmService = "";
        if (this.action === "edit") {
            popUpHeaderTextHsmService = "EDITPROFILE";
            this.hsmService = _data.hsmService;
        } else {
            popUpHeaderTextHsmService = "NEWPROFILE";
            this.hsmService = new HsmService({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextHsmService)
            .subscribe((x) => (this.dialogTitle = x));
        this.hsmServiceForm = this.createHsmServiceForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.hsmServiceDefinitionsService.GetHsmDevices().then(() => {
            this.devicesList =
                this.hsmServiceDefinitionsService.devicesApiResponse.ParameterList;
        });
    }

    /**
     * createHsmServiceForm
     *
     * @returns {FormGroup}
     */
    createHsmServiceForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.hsmService.Id],
            ApplicationId: [this.hsmService.ApplicationId],
            HsmDeviceId: [this.hsmService.HsmDeviceId],
            ConnectionCount: [this.hsmService.ConnectionCount],
            ConnectionTimeout: [this.hsmService.ConnectionTimeout],
            ConnectionCheckTimeSecond: [
                this.hsmService.ConnectionCheckTimeSecond,
            ],
        });
    }
}
