import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { LmkKeyTypeEntity, SwitchKeyTypeEntity } from "app/ui/switchKeyProfile";
import { SwitchKey } from "../../switchKeyProfiles/switchKeyProfiles.model";
import { SwitchKeyProfilesService } from "../../switchKeyProfiles/switchKeyProfiles.service";
import { SwitchKeyProfileService } from "../switchKeyProfile.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "switchKeyProfileForm-dialog",
    templateUrl: "./switchKeyProfileForm.component.html",
    styleUrls: ["./switchKeyProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SwitchKeyProfileFormDialogComponent {
    action: string;
    switchKey: SwitchKey;
    switchKeyProfileForm: FormGroup;
    dialogTitle: string;
    switchKeyType: SwitchKeyTypeEntity[];
    lmkKeyType: LmkKeyTypeEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SwitchKeyProfileFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SwitchKeyProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchKeyProfilesService: SwitchKeyProfilesService,
        private switchKeyProfileService: SwitchKeyProfileService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSwitchKeyProfile = "";
        if (this.action === "edit") {
            popUpHeaderTextSwitchKeyProfile = "EDITPROFILE";
            this.switchKey = _data.switchKey;
        } else {
            popUpHeaderTextSwitchKeyProfile = "NEWPROFILE";
            this.switchKey = new SwitchKey({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSwitchKeyProfile)
            .subscribe((x) => (this.dialogTitle = x));
        this.switchKeyProfileForm = this.createSwitchKeyProfileForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.switchKeyProfilesService.GetSwitchKeyTypes().then(() => {
            this.switchKeyType =
                this.switchKeyProfilesService.switchKeyTypeApiResponse.ParameterList;
        });
        this.switchKeyProfilesService.GetKeyLmkTypes().then(() => {
            this.lmkKeyType =
                this.switchKeyProfilesService.lmkTypeApiResponse.ParameterList;
        });
    }

    /**
     * createSwitchKeyProfileForm
     *
     * @returns {FormGroup}
     */
    createSwitchKeyProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchKey.Id],
            ProfileId: [this.switchKey.ProfileId],
            KeyIndex: [this.switchKey.KeyIndex],
            KeyVariant: [this.switchKey.KeyVariant],
            KeyTypeId: [this.switchKey.KeyTypeId],
            KeyValue: [this.switchKey.KeyValue],
            KeyCheckValue: [this.switchKey.KeyCheckValue],
            TemporaryKeyValue: [this.switchKey.TemporaryKeyValue],
            TemporaryKeyCheckValue: [this.switchKey.TemporaryKeyCheckValue],
            KeyLmkTypeId: [this.switchKey.KeyLmkTypeId],
        });
    }
}
