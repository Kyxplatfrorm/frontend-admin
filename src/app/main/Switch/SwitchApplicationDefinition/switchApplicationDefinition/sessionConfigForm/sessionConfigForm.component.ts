import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { ApplicationSessionsEntity } from "app/ui/switchApplicationDefinition";
import { SwitchApplication } from "../../switchApplicationDefinitions/switchApplicationDefinitions.model";
import { SwitchApplicationDefinitionsService } from "../../switchApplicationDefinitions/switchApplicationDefinitions.service";
import { SwitchApplicationDefinitionService } from "../switchApplicationDefinition.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "sessionConfigForm-dialog",
    templateUrl: "./sessionConfigForm.component.html",
    styleUrls: ["./sessionConfigForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SessionConfigFormDialogComponent {
    action: string;
    switchApplication: SwitchApplication;
    sessionConfigForm: FormGroup;
    dialogTitle: string;
    applicationSessionList: ApplicationSessionsEntity[];
    routeParams: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SessionConfigFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SessionConfigFormDialogComponent>,
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
        var popUpHeaderTextSwitchAppConfig = "";
        if (this.action === "edit") {
            popUpHeaderTextSwitchAppConfig = "EDITPROFILE";
            this.switchApplication = _data.switchApplication;
        } else {
            popUpHeaderTextSwitchAppConfig = "NEWPROFILE";
            this.switchApplication = new SwitchApplication({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSwitchAppConfig)
            .subscribe((x) => (this.dialogTitle = x));
        this.sessionConfigForm = this.createSessionConfigForm();
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
     * createSessionListForm
     *
     * @returns {FormGroup}
     */
    createSessionConfigForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            SessionId: [this.switchApplication.SessionId],
            ConfigKey: [this.switchApplication.ConfigKey],
            ConfigValue: [this.switchApplication.ConfigValue],
        });
    }
}
