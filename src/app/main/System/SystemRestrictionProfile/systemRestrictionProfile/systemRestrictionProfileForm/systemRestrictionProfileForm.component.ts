import {
    Component,
    EventEmitter,
    Inject,
    Output,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { SystemRestriction } from "../systemRestrictionProfile.model";
import { RestrictionTypeEntity } from "app/ui/tenantRestrictionProfile";
import { SystemRestrictionProfileService } from "../systemRestrictionProfile.service";

@Component({
    selector: "systemRestrictionProfileForm-dialog",
    templateUrl: "./systemRestrictionProfileForm.component.html",
    styleUrls: ["./systemRestrictionProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SystemRestrictionProfileFormDialogComponent {
    action: string;
    systemRestriction: SystemRestriction;
    systemRestrictionProfileForm: FormGroup;
    dialogTitle: string;
    restrictionType: RestrictionTypeEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SystemRestrictionProfileFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SystemRestrictionProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private systemRestrictionProfileService: SystemRestrictionProfileService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSystemRestrictionProfile = "";
        if (this.action === "edit") {
            popUpHeaderTextSystemRestrictionProfile = "EDITPROFILE";
            this.systemRestriction = _data.systemRestriction;
        } else {
            popUpHeaderTextSystemRestrictionProfile = "NEWPROFILE";
            this.systemRestriction = new SystemRestriction({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSystemRestrictionProfile)
            .subscribe((x) => (this.dialogTitle = x));
        this.systemRestrictionProfileForm =
            this.createSystemRestrictionProfileForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.systemRestrictionProfileService.GetRestrictionType().then(() => {
            this.restrictionType =
                this.systemRestrictionProfileService.restrictionTypeApiResponse.ParameterList;
        });
    }

    /**
     * createSystemRestrictionProfileForm
     *
     * @returns {FormGroup}
     */
    createSystemRestrictionProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.systemRestriction.Id],
            ProfileId: [this.systemRestriction.ProfileId],
            RestrictionTypeId: [this.systemRestriction.RestrictionTypeId],
            RestrictionCode: [this.systemRestriction.RestrictionCode],
        });
    }
}
