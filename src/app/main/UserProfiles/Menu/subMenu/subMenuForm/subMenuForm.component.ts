import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Menu } from "../../menus/menus.model";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

@Component({
    selector: "subMenuForm-dialog",
    templateUrl: "./subMenuForm.component.html",
    styleUrls: ["./subMenuForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SubMenuFormDialogComponent {
    action: string;
    menu: Menu;
    subMenuForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SubMenuFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SubMenuFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextMenuKey = "";
        if (this.action === "edit") {
            popUpHeaderTextMenuKey = "EDITPROFILE";
            this.menu = _data.menu;
        } else {
            popUpHeaderTextMenuKey = "NEWPROFILE";
            this.menu = new Menu();
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextMenuKey)
            .subscribe((x) => (this.dialogTitle = x));
        this.subMenuForm = this.createSubMenuForm();
    }

    /**
     * createSubMenuForm
     *
     * @returns {FormGroup}
     */
    createSubMenuForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.menu.Id],
            TranslateKey: [this.menu.TranslateKey],
            MenuIcon: [this.menu.MenuIcon],
            MenuUrl: [this.menu.MenuUrl],
            MenuOrder: [this.menu.MenuOrder],
            ParentMenuId: [this.menu.ParentMenuId],
            MenuCode: [this.menu.MenuCode],
            MenuName: [this.menu.MenuName],
            ControllerName: [this.menu.ControllerName],
            RelatedControllerName: [this.menu.RelatedControllerName],
        });
    }
}
