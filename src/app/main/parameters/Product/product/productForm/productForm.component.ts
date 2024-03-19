import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { Product } from "../../products/products.model";

@Component({
    selector: "productForm-dialog",
    templateUrl: "./productForm.component.html",
    styleUrls: ["./productForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ProductFormDialogComponent {
    action: string;
    product: Product;
    productForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ProductFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ProductFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextProductKey = "";
        if (this.action === "edit") {
            popUpHeaderTextProductKey = "EDITPROFILE";
            this.product = _data.product;
        } else {
            popUpHeaderTextProductKey = "NEWPROFILE";
            this.product = new Product();
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextProductKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.productForm = this.createProductForm();
    }

    /**
     * createProductForm
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.product.Id],
            ProductId: [this.product.ProductId],
            ApplicationType: [this.product.ApplicationType],
            UserType: [this.product.UserType],
            Description: [this.product.Description],
        });
    }
}
