import {
    Component,
    EventEmitter,
    Inject,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FraudAction } from "../../fraudActionReports/fraudActionReports.model";
import { FraudRuleActionStatuesEntity } from "app/ui/fraudActionReport";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FraudActionReportsService } from "../../fraudActionReports/fraudActionReports.service";

@Component({
    selector: "fraudActionForm-dialog",
    templateUrl: "./fraudActionForm.component.html",
    styleUrls: ["./fraudActionForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class FraudActionFormDialogComponent {
    action: string;
    fraudAction: FraudAction;
    fraudActionForm: FormGroup;
    dialogTitle: string;
    fraudRuleActionStatus: FraudRuleActionStatuesEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<FraudActionFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FraudActionFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private fraudActionReportsService: FraudActionReportsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextFraudRuleDefinition = "";
        if (this.action === "new") {
            popUpHeaderTextFraudRuleDefinition = "EDITPROFILE";
            this.fraudAction = this._data.fraudAction;
        } else {
            popUpHeaderTextFraudRuleDefinition = "NEWPROFILE";
            this.fraudAction = new FraudAction({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextFraudRuleDefinition)
            .subscribe((x) => (this.dialogTitle = x));
        this.fraudActionForm = this.createFraudActionForm();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.fraudActionReportsService.GetFraudRuleActionStatues().then(() => {
            this.fraudRuleActionStatus =
                this.fraudActionReportsService.fraudRuleActionStatuesApiResponse.ParameterList;
        });
    }

    /**
     * createFraudActionForm
     *
     * @returns {FormGroup}
     */
    createFraudActionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.fraudAction.Id],
            FraudRuleActionStatusId: [this.fraudAction.FraudRuleActionStatusId],
        });
    }
}
