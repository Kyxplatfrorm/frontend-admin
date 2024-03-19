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
import { ExportKey } from "./exportKey.model";
import { ExportKeyService } from "./exportKey.service";
import { HsmImportExportKeyTypeEntity } from "app/ui/hsmUtility";
import { ImportKeyService } from "../importKey/importKey.service";

@Component({
    selector: "exportKey",
    templateUrl: "./exportKey.component.html",
    styleUrls: ["./exportKey.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ExportKeyComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    exportKey: ExportKey;
    pageType: string;
    visible: boolean = false;
    exportKeyForm: FormGroup;
    hsmKeyUnderZmk: string;
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
        private exportKeyService: ExportKeyService,
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
        this.exportKeyService.onExportKeyChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((exportKey) => {
                this.exportKey = new ExportKey(exportKey);
                this.exportKeyForm = this.createExportKeyForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createExportKeyForm
     *
     * @returns {FormGroup}
     */
    createExportKeyForm(): FormGroup {
        return this._formBuilder.group({
            KeyTypeId: [this.exportKey.KeyTypeId],
            KeyExportSchema: [this.exportKey.KeyExportSchema],
            ZmkUnderLmk: [this.exportKey.ZmkUnderLmk],
            KeyUnderLmk: [this.exportKey.KeyUnderLmk],
            KeyUnderZmk: [this.exportKey.KeyUnderZmk],
            HsmErrorCode: [this.exportKey.HsmErrorCode],
            HsmErrorDescription: [this.exportKey.HsmErrorDescription],
        });
    }

    /**
     * ExportKeyButton
     */
    ExportKeyButton(): void {
        const data = this.exportKeyForm.getRawValue();
        this.exportKeyService.ExportKey(data).then(() => {
            this.exportKeyService.onExportKeyChanged.next(data);
            this.hsmKeyUnderZmk = this.exportKeyService.keyUnderZmk;
            this.generateHsmErrorCode = this.exportKeyService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.exportKeyService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.exportKeyForm.reset();
    }
}
