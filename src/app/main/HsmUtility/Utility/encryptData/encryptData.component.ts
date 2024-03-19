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
import { EncryptData } from "./encryptData.model";
import { EncryptDataService } from "./encryptData.service";

@Component({
    selector: "encryptData",
    templateUrl: "./encryptData.component.html",
    styleUrls: ["./encryptData.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class EncryptDataComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    encryptData: EncryptData;
    pageType: string;
    visible: boolean = false;
    encryptDataForm: FormGroup;
    generateEncryptedData: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private encryptDataService: EncryptDataService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.encryptDataService.onEncryptDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((encryptData) => {
                this.encryptData = new EncryptData(encryptData);
                this.encryptDataForm = this.createEncryptDataForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createEncryptDataForm
     *
     * @returns {FormGroup}
     */
    createEncryptDataForm(): FormGroup {
        return this._formBuilder.group({
            EncryptionKeyUnderLmk: [this.encryptData.EncryptionKeyUnderLmk],
            HsmErrorCode: [this.encryptData.HsmErrorCode],
            HsmErrorDescription: [this.encryptData.HsmErrorDescription],
            Data: [this.encryptData.Data],
            EncryptedData: [this.encryptData.EncryptedData],
        });
    }

    /**
     * EncryptDataButton
     */
    EncryptDataButton(): void {
        const data = this.encryptDataForm.getRawValue();
        this.encryptDataService.EncryptData(data).then(() => {
            this.encryptDataService.onEncryptDataChanged.next(data);
            this.generateEncryptedData = this.encryptDataService.encryptedData;
            this.generateHsmErrorCode = this.encryptDataService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.encryptDataService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.encryptDataForm.reset();
    }
}
