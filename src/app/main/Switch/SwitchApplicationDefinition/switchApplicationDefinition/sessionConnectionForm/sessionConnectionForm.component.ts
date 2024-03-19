import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import {
    AllApplicationSessionsEntity,
    ApplicationSessionsEntity,
} from "app/ui/switchApplicationDefinition";
import { SwitchApplication } from "../../switchApplicationDefinitions/switchApplicationDefinitions.model";
import { SwitchApplicationDefinitionsService } from "../../switchApplicationDefinitions/switchApplicationDefinitions.service";
import { SwitchApplicationDefinitionService } from "../switchApplicationDefinition.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "sessionConnectionForm-dialog",
    templateUrl: "./sessionConnectionForm.component.html",
    styleUrls: ["./sessionConnectionForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SessionConnectionFormDialogComponent {
    action: string;
    switchApplication: SwitchApplication;
    sessionConnectionForm: FormGroup;
    dialogTitle: string;
    applicationSessionList: ApplicationSessionsEntity[];
    routeParams: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SessionConnectionFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SessionConnectionFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService,
        _router: ActivatedRoute
    ) {
        this.routeParams = _router.snapshot.params;
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSessionConnection = "";
        if (this.action === "edit") {
            popUpHeaderTextSessionConnection = "EDITPROFILE";
            this.switchApplication = _data.switchApplication;
        } else {
            popUpHeaderTextSessionConnection = "NEWPROFILE";
            this.switchApplication = new SwitchApplication({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSessionConnection)
            .subscribe((x) => (this.dialogTitle = x));
        this.sessionConnectionForm = this.createSessionConnectionForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.switchApplicationDefinitionsService
            .GetApplicationSessions(
                this.switchApplicationDefinitionService.switchApplication.Id
            )
            .then(() => {
                this.applicationSessionList =
                    this.switchApplicationDefinitionsService.applicationSessionsApiResponse.ParameterList;
            });
    }

    /**
     * createSessionConnectionForm
     *
     * @returns {FormGroup}
     */
    createSessionConnectionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            SessionId: [this.switchApplication.SessionId],
            Server: [this.switchApplication.Server],
            Port: [this.switchApplication.Port],
            Priority: [this.switchApplication.Priority],
            PermittedIpAddress: [this.switchApplication.PermittedIpAddress],
        });
    }
}
