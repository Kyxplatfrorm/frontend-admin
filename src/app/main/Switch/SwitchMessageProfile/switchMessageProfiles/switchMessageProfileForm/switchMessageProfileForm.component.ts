import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { SwitchMessageProfile } from "../../switchCardNetworks/switchCardNetworks.model";
import {
    SwitchCardNetworkEntity,
    SwitchNetworkMessageTypeEntity,
} from "app/ui/switchMessageProfiles";
import { SwitchCardNetworksService } from "../../switchCardNetworks/switchCardNetworks.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "switchMessageProfileForm-dialog",
    templateUrl: "./switchMessageProfileForm.component.html",
    styleUrls: ["./switchMessageProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SwitchMessageFormDialogComponent {
    action: string;
    switchMessageProfile: SwitchMessageProfile;
    switchMessageProfileForm: FormGroup;
    dialogTitle: string;
    switchNetworkMessageType: SwitchNetworkMessageTypeEntity[];
    netWorkType: SwitchCardNetworkEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SwitchMessageFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SwitchMessageFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchCardNetworksService: SwitchCardNetworksService,
        private route: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSwitchMessageProfile = "";
        if (this.action === "edit") {
            popUpHeaderTextSwitchMessageProfile = "EDITPROFILE";
            this.switchMessageProfile = _data.switchMessageProfile;
        } else {
            popUpHeaderTextSwitchMessageProfile = "NEWPROFILE";
            this.switchMessageProfile = new SwitchMessageProfile({});
            this.switchMessageProfile.NetworkTypeId = _data.NetworkTypeId;
        }

        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSwitchMessageProfile)
            .subscribe((x) => (this.dialogTitle = x));
        this.switchMessageProfileForm = this.createSwitchMessageProfileForm();
    }

    ngOnInit(): void {
        this.switchCardNetworksService.GetSwitchCardNetworks().then(() => {
            this.netWorkType =
                this.switchCardNetworksService.switchCardNetworkApiResponse.SwitchCardNetworkList;
        });
        this.switchCardNetworksService
            .GetSwitchNetworkMessageTypes()
            .then(() => {
                this.switchNetworkMessageType =
                    this.switchCardNetworksService.switchNetworkMessageTypeApiResponse.ParameterList;
            });
    }

    /**
     * createSwitchMessageProfileForm
     *
     * @returns {FormGroup}
     */
    createSwitchMessageProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchMessageProfile.Id],
            NetworkMessageTypeId: [
                this.switchMessageProfile.NetworkMessageTypeId,
            ],
            NetworkTypeId: [this.switchMessageProfile.NetworkTypeId],
            RequestMti: [this.switchMessageProfile.RequestMti],
            ResponseMti: [this.switchMessageProfile.ResponseMti],
            RequestMessageProfile: [
                this.switchMessageProfile.RequestMessageProfile,
            ],
            ResponseMessageProfile: [
                this.switchMessageProfile.ResponseMessageProfile,
            ],
        });
    }
}
