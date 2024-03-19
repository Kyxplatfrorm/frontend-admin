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
import { GenerateKey } from "./generateKey.model";
import { GenerateKeyService } from "./generateKey.service";
import {
    HsmImportExportKeyTypeEntity,
    KeyZmkTmkEntity,
} from "app/ui/hsmUtility";
import { ImportKeyService } from "../importKey/importKey.service";

@Component({
    selector: "generateKey",
    templateUrl: "./generateKey.component.html",
    styleUrls: ["./generateKey.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenerateKeyComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generateKey: GenerateKey;
    pageType: string;
    visible: boolean = false;
    generateKeyForm: FormGroup;
    hsmUtilitykeyUnderLmk: string;
    hsmUtilitykeyUnderZmk: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    keyZmkTmkList: KeyZmkTmkEntity[];
    hsmImportExportKey: HsmImportExportKeyTypeEntity[];

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generateKeyService: GenerateKeyService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar,
        private importKeyService: ImportKeyService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.importKeyService.GetHsmImportExportKeyType().then(() => {
            this.hsmImportExportKey =
                this.importKeyService.hsmImportExportKeyTypeApiResponse.ParameterList;
        });
        this.generateKeyService.GetHsmKeyZmkTmkType().then(() => {
            this.keyZmkTmkList =
                this.generateKeyService.keyZmkTmkApiResponse.ParameterList;
        });
        this.generateKeyService.onGenerateKeyChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generateKey) => {
                this.generateKey = new GenerateKey(generateKey);
                this.generateKeyForm = this.createGenerateKeyForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGenerateKeyForm
     *
     * @returns {FormGroup}
     */
    createGenerateKeyForm(): FormGroup {
        return this._formBuilder.group({
            KeyTypeId: [this.generateKey.KeyTypeId],
            KeySchema: [this.generateKey.KeySchema],
            ExportKey: [this.generateKey.ExportKey],
            ZmkTmkTypeId: [this.generateKey.ZmkTmkTypeId],
            EncryptedMasterKey: [this.generateKey.EncryptedMasterKey],
            KeyExportSchema: [this.generateKey.KeyExportSchema],
            AtallaVariant: [this.generateKey.AtallaVariant],
            HsmErrorCode: [this.generateKey.HsmErrorCode],
            HsmErrorDescription: [this.generateKey.HsmErrorDescription],
            KeyUnderZmk: [this.generateKey.KeyUnderZmk],
            KeyUnderLmk: [this.generateKey.KeyUnderLmk],
        });
    }

    /**
     * GenerateKeyButton
     */
    GenerateKeyButton(): void {
        const data = this.generateKeyForm.getRawValue();
        this.generateKeyService.GenerateKey(data).then(() => {
            this.generateKeyService.onGenerateKeyChanged.next(data);
            this.hsmUtilitykeyUnderLmk = this.generateKeyService.keyUnderLmk;
            this.hsmUtilitykeyUnderZmk = this.generateKeyService.keyUnderZmk;
            this.generateHsmErrorCode = this.generateKeyService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generateKeyService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generateKeyForm.reset();
    }
}
