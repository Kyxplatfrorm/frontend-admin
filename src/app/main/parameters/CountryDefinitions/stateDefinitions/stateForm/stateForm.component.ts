import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { State } from "./stateForm.model";

@Component({
    selector: "stateForm-dialog",
    templateUrl: "./stateForm.component.html",
    styleUrls: ["./stateForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})

export class StateFormDialogComponent {
    action: string;
    state: State;
    statePopupForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<StateFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        public matDialogRef: MatDialogRef<StateFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextStateKey = "";
        if (this.action === "edit") {
            popUpHeaderTextStateKey = "EDITPROFILE";
            this.state = _data.state;
        } else {
            popUpHeaderTextStateKey = "NEWPROFILE";
            this.state = new State({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextStateKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.statePopupForm = this.createStatePopupForm();
    }

    /**
     * createStatePopupForm
     *
     * @returns {FormGroup}
     */
    createStatePopupForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.state.Id],
            StateCode: [this.state.StateCode],
            StateAlphaCode: [this.state.StateAlphaCode],
            StateName: [this.state.StateName],
        });
    }
}
