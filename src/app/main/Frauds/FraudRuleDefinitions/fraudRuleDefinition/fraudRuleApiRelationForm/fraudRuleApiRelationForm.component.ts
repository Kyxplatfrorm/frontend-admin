import {
    Component,
    EventEmitter,
    Inject,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FraudRule } from "../../fraudRuleDefinitions/fraudRuleDefinitions.model";
import { FraudRuleDefinitionsService } from "../../fraudRuleDefinitions/fraudRuleDefinitions.service";
import { FraudRuleDefinitionService } from "../fraudRuleDefinition.service";
import { SearchFraudRuleDefinitionsService } from "../../searchFraudRuleDefinitions/searchFraudRuleDefinitions.service";
import { FraudApiDefinitionEntity } from "app/ui/fraudRuleDefinitions";

@Component({
    selector: "fraudRuleApiRelationForm-dialog",
    templateUrl: "./fraudRuleApiRelationForm.component.html",
    styleUrls: ["./fraudRuleApiRelationForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FraudRuleApiRelationFormDialogComponent {
    action: string;
    fraudRule: FraudRule;
    fraudRuleApiRelationForm: FormGroup;
    dialogTitle: string;
    fraudApiDefinitionList: FraudApiDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SchedulerJobFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FraudRuleApiRelationFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private fraudRuleDefinitionsService: FraudRuleDefinitionsService,
        private fraudRuleDefinitionService: FraudRuleDefinitionService,
        private searchFraudRuleDefinitionsService: SearchFraudRuleDefinitionsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextFraudRuleDefinition = "";
        if (this.action === "edit") {
            popUpHeaderTextFraudRuleDefinition = "EDITPROFILE";
            this.fraudRule = this._data.fraudRule;
        } else {
            popUpHeaderTextFraudRuleDefinition = "NEWPROFILE";
            this.fraudRule = new FraudRule();
            const selectedId = this.fraudRuleDefinitionService.routeParams?.id;

            if (selectedId && selectedId !== "new") {
                this.fraudRule.FraudRuleId = selectedId;
            }
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextFraudRuleDefinition)
            .subscribe((x) => (this.dialogTitle = x));
        this.fraudRuleApiRelationForm = this.createFraudRuleApiRelationForm();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.fraudRuleDefinitionsService.GetFraudApiDefinitions().then(() => {
            this.fraudApiDefinitionList =
                this.fraudRuleDefinitionsService.fraudApiDefinitionApiResponse.FraudApiList;
        });
    }

    /**
     * createFraudRuleApiRelationForm
     *
     * @returns {FormGroup}
     */
    createFraudRuleApiRelationForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.fraudRule.Id],
            FraudApiId: [this.fraudRule.FraudApiId],
            FraudRuleId: [this.fraudRule.FraudRuleId],
            IsActive: [this.fraudRule.IsActive],
            Priority: [this.fraudRule.Priority],
        });
    }
}
