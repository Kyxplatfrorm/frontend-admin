import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { ActivatedRoute } from "@angular/router";
import { SwitchTransactionCodeMap } from "../../switchTransactionCodeMaps/switchTransactionCodeMaps.model";
import {
    SwitchCardNetworkEntity,
    SwitchTransactionEntryTypeEntity,
    TransactionCodesEntity,
} from "app/ui/switchTransactionCodeMap";
import { SwitchTransactionCodeMapsService } from "../../switchTransactionCodeMaps/switchTransactionCodeMaps.service";

@Component({
    selector: "switchTransactionCodeMapForm-dialog",
    templateUrl: "./switchTransactionCodeMapForm.component.html",
    styleUrls: ["./switchTransactionCodeMapForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SwitchTransactionCodeMapFormDialogComponent {
    action: string;
    switchTransactionCodeMap: SwitchTransactionCodeMap;
    switchTransactionCodeMapForm: FormGroup;
    dialogTitle: string;
    transactionCode: TransactionCodesEntity[];
    netWorkType: SwitchCardNetworkEntity[];
    switchTransactionEntryType: SwitchTransactionEntryTypeEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SwitchTransactionCodeMapFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SwitchTransactionCodeMapFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private switchTransactionCodeMapsService: SwitchTransactionCodeMapsService,
        private route: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSwitchTransactionCodeMap = "";
        if (this.action === "edit") {
            popUpHeaderTextSwitchTransactionCodeMap = "EDITPROFILE";
            this.switchTransactionCodeMap = _data.switchTransactionCodeMap;
        } else {
            popUpHeaderTextSwitchTransactionCodeMap = "NEWPROFILE";
            this.switchTransactionCodeMap = new SwitchTransactionCodeMap({});
            this.switchTransactionCodeMap.NetworkTypeId = _data.NetworkTypeId;
        }

        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSwitchTransactionCodeMap)
            .subscribe((x) => (this.dialogTitle = x));
        this.switchTransactionCodeMapForm =
            this.createSwitchTransactionCodeMapForm();
    }

    ngOnInit(): void {
        this.switchTransactionCodeMapsService
            .GetSwitchCardNetworks()
            .then(() => {
                this.netWorkType =
                    this.switchTransactionCodeMapsService.switchCardNetworkApiResponse.SwitchCardNetworkList;
            });
        this.switchTransactionCodeMapsService
            .GetSwitchTransactionEntryTypes()
            .then(() => {
                this.switchTransactionEntryType =
                    this.switchTransactionCodeMapsService.switchTransactionEntryTypesApiResponse.ParameterList;
            });
        this.switchTransactionCodeMapsService.GetTransactionCodes().then(() => {
            this.transactionCode =
                this.switchTransactionCodeMapsService.transactionCodesApiResponse.ParameterList;
        });
    }

    /**
     * createSwitchTransactionCodeMapForm
     *
     * @returns {FormGroup}
     */
    createSwitchTransactionCodeMapForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchTransactionCodeMap.Id],
            TransactionEntryTypeId: [
                this.switchTransactionCodeMap.TransactionEntryTypeId,
            ],
            NetworkTypeId: [this.switchTransactionCodeMap.NetworkTypeId],
            TransactionCodeId: [
                this.switchTransactionCodeMap.TransactionCodeId,
            ],
            TransactionAmount: [
                this.switchTransactionCodeMap.TransactionAmount,
            ],
            Priority: [this.switchTransactionCodeMap.Priority],
            Mti: [this.switchTransactionCodeMap.Mti],
            ProcessingCode: [this.switchTransactionCodeMap.ProcessingCode],
            Description: [this.switchTransactionCodeMap.Description],
            IsActive: [this.switchTransactionCodeMap.IsActive],
        });
    }
}
