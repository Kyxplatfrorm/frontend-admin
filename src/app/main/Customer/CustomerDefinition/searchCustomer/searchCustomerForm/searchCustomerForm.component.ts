import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { SearchCustomer } from "../searchCustomer.model";
import { SearchCustomerService } from "../searchCustomer.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { CustomerStatusEntity } from "app/ui/customerDefinition";

@Component({
    selector: "searchCustomerForm-dialog",
    templateUrl: "./searchCustomerForm.component.html",
    styleUrls: ["./searchCustomerForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SearchCustomerDialogComponent {
    action: string;
    searchCustomer: SearchCustomer;
    searchCustomerForm: FormGroup;
    dialogTitle: string;
    customerStatus: CustomerStatusEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SearchCustomerDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SearchCustomerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private searchCustomerService: SearchCustomerService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSearchCustomer = "";
        if (this.action === "new") {
            popUpHeaderTextSearchCustomer = "EDITPROFILE";
            this.searchCustomer = _data.searchCustomer;
        } else {
            popUpHeaderTextSearchCustomer = "NEWPROFILE";
            this.searchCustomer = new SearchCustomer({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextSearchCustomer)
            .subscribe((x) => (this.dialogTitle = x));
        this.searchCustomerForm = this.createSearchCustomerForm();
    }

    /**
     * createSearchCustomerForm
     *
     * @returns {FormGroup}
     */
    createSearchCustomerForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.searchCustomer.Id],
            CustomerStatusId: [this.searchCustomer.CustomerStatusId],
        });
    }
    ngOnInit(): void {
        this.searchCustomerService.GetCustomerStatus().then(() => {
            this.customerStatus =
                this.searchCustomerService.customerStatusApiResponse.ParameterList;
        });
    }
}
