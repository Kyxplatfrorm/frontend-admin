import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { TenantRestriction } from "../../tenantRestrictionProfiles/tenantRestrictionProfiles.model";
import { RestrictionTypeEntity } from "app/ui/tenantRestrictionProfile";
import { TenantRestrictionProfilesService } from "../../tenantRestrictionProfiles/tenantRestrictionProfiles.service";

@Component({
    selector: "tenantRestrictionProfileForm-dialog",
    templateUrl: "./tenantRestrictionProfileForm.component.html",
    styleUrls: ["./tenantRestrictionProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TenantRestrictionProfileFormDialogComponent {
    action: string;
    tenantRestriction: TenantRestriction;
    tenantRestrictionProfileForm: FormGroup;
    dialogTitle: string;
    restrictionType: RestrictionTypeEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<TenantRestrictionProfileFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TenantRestrictionProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private tenantRestrictionProfilesService: TenantRestrictionProfilesService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextRestrictionProfile = "";
        if (this.action === "edit") {
            popUpHeaderTextRestrictionProfile = "EDITPROFILE";
            this.tenantRestriction = _data.tenantRestriction;
        } else {
            popUpHeaderTextRestrictionProfile = "NEWPROFILE";
            this.tenantRestriction = new TenantRestriction({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextRestrictionProfile)
            .subscribe((x) => (this.dialogTitle = x));
        this.tenantRestrictionProfileForm =
            this.createTenantRestrictionProfileForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantRestrictionProfilesService.GetRestrictionType().then(() => {
            this.restrictionType =
                this.tenantRestrictionProfilesService.restrictionTypeApiResponse.ParameterList;
        });
    }

    /**
     * createTenantRestrictionProfileForm
     *
     * @returns {FormGroup}
     */
    createTenantRestrictionProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantRestriction.Id],
            ProfileId: [this.tenantRestriction.ProfileId],
            RestrictionTypeId: [this.tenantRestriction.RestrictionTypeId],
            RestrictionCode: [this.tenantRestriction.RestrictionCode],
        });
    }
}
