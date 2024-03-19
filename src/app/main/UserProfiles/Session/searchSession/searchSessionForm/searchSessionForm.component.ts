import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { SessionStatusEntity } from "app/ui/session";
import { SessionService } from "../../session/session.service";
import { Session } from "../../sessions/sessions.model";
import { SearchSessionService } from "../searchSession.service";

import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { SessionsService } from "../../sessions/sessions.service";

@Component({
    selector: "searchSessionForm-dialog",
    templateUrl: "./searchSessionForm.component.html",
    styleUrls: ["./searchSessionForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SearchSessionDialogComponent {
    action: string;
    session: Session;
    searchSessionForm: FormGroup;
    dialogTitle: string;
    sessionStatusList: SessionStatusEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SearchSessionDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SearchSessionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private sessionsService: SessionsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSearchSession = "";
        if (this.action === "new") {
            popUpHeaderTextSearchSession = "EDITPROFILE";
            this.session = _data.session;
        } else {
            popUpHeaderTextSearchSession = "NEWPROFILE";
            this.session = new Session({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSearchSession)
            .subscribe((x) => (this.dialogTitle = x));
        this.searchSessionForm = this.createSearchSessionForm();
    }
    ngOnInit(): void {
        this.sessionsService.GetSessionStatus().then(() => {
            this.sessionStatusList =
                this.sessionsService.sessionStatusApiResponse.ParameterList;
        });
    }

    /**
     * createSearchSessionForm
     *
     * @returns {FormGroup}
     */
    createSearchSessionForm(): FormGroup {
        return this._formBuilder.group({
            SessionStatusId: [this.session.SessionStatusId],
            SessionId: [this.session.Id],
        });
    }
}
