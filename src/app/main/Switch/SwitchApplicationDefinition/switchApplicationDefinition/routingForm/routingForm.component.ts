import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
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
    selector: "routingForm-dialog",
    templateUrl: "./routingForm.component.html",
    styleUrls: ["./routingForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class RoutingFormDialogComponent {
    action: string;
    switchApplication: SwitchApplication;
    routingForm: FormGroup;
    dialogTitle: string;
    allApplicationSessionList: AllApplicationSessionsEntity[];
    applicationSessionList: ApplicationSessionsEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<RoutingFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<RoutingFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextRouting = "";
        if (this.action === "edit") {
            popUpHeaderTextRouting = "EDITPROFILE";
            this.switchApplication = _data.switchApplication;
        } else {
            popUpHeaderTextRouting = "NEWPROFILE";
            this.switchApplication = new SwitchApplication({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextRouting)
            .subscribe((x) => (this.dialogTitle = x));
        this.routingForm = this.createRoutingForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.switchApplicationDefinitionsService
            .GetAllApplicationSessions()
            .then(() => {
                this.allApplicationSessionList =
                    this.switchApplicationDefinitionsService.allApplicationSessionsApiResponse.ParameterList;
            });
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
     * createRoutingForm
     *
     * @returns {FormGroup}
     */
    createRoutingForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            ApplicationId: [this.switchApplication.ApplicationId],
            FromSessionId: [this.switchApplication.FromSessionId],
            ToSessionId: [this.switchApplication.ToSessionId],
            Priority: [this.switchApplication.Priority],
            IsActive: [this.switchApplication.IsActive],
            HasRoutingRule: [this.switchApplication.HasRoutingRule],
            RoutingRuleName: [this.switchApplication.RoutingRuleName],
            RoutingLuaRule: [this.switchApplication.RoutingLuaRule],
            SessionId: [this.switchApplication.SessionId],
        });
    }
}
