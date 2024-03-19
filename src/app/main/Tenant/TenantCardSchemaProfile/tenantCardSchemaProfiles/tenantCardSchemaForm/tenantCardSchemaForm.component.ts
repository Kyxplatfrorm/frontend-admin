import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { TenantCardSchema } from "../../tenantCardSchema/tenantCardSchema.model";
import { BinBrandsEntity } from "app/ui/tenantCardSchema";
import { TenantCardSchemaProfilesService } from "../tenantCardSchemaProfiles.service";

@Component({
    selector: "tenantCardSchemaForm-dialog",
    templateUrl: "./tenantCardSchemaForm.component.html",
    styleUrls: ["./tenantCardSchemaForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TenantCardSchemaFormDialogComponent {
    action: string;
    tenantCardSchema: TenantCardSchema;
    tenantCardSchemaForm: FormGroup;
    dialogTitle: string;
    binBrands: BinBrandsEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<TenantCardSchemaFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TenantCardSchemaFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private tenantCardSchemaProfilesService: TenantCardSchemaProfilesService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextProductKey = "";
        if (this.action === "edit") {
            popUpHeaderTextProductKey = "EDITPROFILE";
            this.tenantCardSchema = _data.tenantCardSchema;
        } else {
            popUpHeaderTextProductKey = "NEWPROFILE";
            this.tenantCardSchema = new TenantCardSchema();
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextProductKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.tenantCardSchemaForm = this.createTenantCardSchemaForm();
    }

    ngOnInit(): void {
        this.tenantCardSchemaProfilesService.GetBinBrands().then(() => {
            this.binBrands =
                this.tenantCardSchemaProfilesService.binBrandsApiResponse.ParameterList;
        });
    }

    /**
     * createTenantCardSchemaForm
     *
     * @returns {FormGroup}
     */
    createTenantCardSchemaForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantCardSchema.Id],
            TenantId: [this.tenantCardSchema.TenantId],
            CardSchemaId: [this.tenantCardSchema.CardSchemaId],
        });
    }
}
