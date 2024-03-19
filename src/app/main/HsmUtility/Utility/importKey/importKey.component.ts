import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialogRef } from "@angular/material/dialog";
import { AlertSnackBar } from "app/_helpers/AlertSnackbar";
import {
    HsmImportExportKeyTypeEntity,
    KeyZmkTmkEntity,
} from "app/ui/hsmUtility";
import { ImportKey } from "./importKey.model";
import { ImportKeyService } from "./importKey.service";

@Component({
    selector: "importKey",
    templateUrl: "./importKey.component.html",
    styleUrls: ["./importKey.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ImportKeyComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    importKey: ImportKey;
    pageType: string;
    visible: boolean = false;
    importKeyForm: FormGroup;
    hsmKeyUnderLmk: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;
    hsmImportExportKey: HsmImportExportKeyTypeEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private importKeyService: ImportKeyService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.importKeyService.GetHsmImportExportKeyType().then(() => {
            this.hsmImportExportKey =
                this.importKeyService.hsmImportExportKeyTypeApiResponse.ParameterList;
        });
        this.importKeyService.onImportKeyChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((importKey) => {
                this.importKey = new ImportKey(importKey);
                this.importKeyForm = this.createImportKeyForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createImportKeyForm
     *
     * @returns {FormGroup}
     */
    createImportKeyForm(): FormGroup {
        return this._formBuilder.group({
            KeyTypeId: [this.importKey.KeyTypeId],
            ZmkUnderLmk: [this.importKey.ZmkUnderLmk],
            KeyUnderZmk: [this.importKey.KeyUnderZmk],
            KeySchema: [this.importKey.KeySchema],
            AtallaVariant: [this.importKey.AtallaVariant],
            HsmErrorCode: [this.importKey.HsmErrorCode],
            HsmErrorDescription: [this.importKey.HsmErrorDescription],
            KeyUnderLmk: [this.importKey.KeyUnderLmk],
        });
    }

    /**
     * ImportKeyButton
     */
    ImportKeyButton(): void {
        const data = this.importKeyForm.getRawValue();
        this.importKeyService.ImportKey(data).then(() => {
            this.importKeyService.onImportKeyChanged.next(data);
            this.hsmKeyUnderLmk = this.importKeyService.keyUnderLmk;
            this.generateHsmErrorCode = this.importKeyService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.importKeyService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.importKeyForm.reset();
    }
}
