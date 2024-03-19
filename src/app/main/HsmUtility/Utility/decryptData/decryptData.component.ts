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
import { DecryptData } from "./decryptData.model";
import { DecryptDataService } from "./decryptData.service";

@Component({
    selector: "decryptData",
    templateUrl: "./decryptData.component.html",
    styleUrls: ["./decryptData.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class DecryptDataComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    decryptData: DecryptData;
    pageType: string;
    visible: boolean = false;
    decryptDataForm: FormGroup;
    generateDecryptedData: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private decryptDataService: DecryptDataService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.decryptDataService.onDecryptDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((decryptData) => {
                this.decryptData = new DecryptData(decryptData);
                this.decryptDataForm = this.createDecryptDataForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createDecryptDataForm
     *
     * @returns {FormGroup}
     */
    createDecryptDataForm(): FormGroup {
        return this._formBuilder.group({
            EncryptionKeyUnderLmk: [this.decryptData.EncryptionKeyUnderLmk],
            HsmErrorCode: [this.decryptData.HsmErrorCode],
            HsmErrorDescription: [this.decryptData.HsmErrorDescription],
            DecryptedData: [this.decryptData.DecryptedData],
            EncryptedData: [this.decryptData.EncryptedData],
        });
    }

    /**
     * DecryptDataButton
     */
    DecryptDataButton(): void {
        const data = this.decryptDataForm.getRawValue();
        this.decryptDataService.DecryptData(data).then(() => {
            this.decryptDataService.onDecryptDataChanged.next(data);
            this.generateDecryptedData = this.decryptDataService.decryptedData;
            this.generateHsmErrorCode = this.decryptDataService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.decryptDataService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.decryptDataForm.reset();
    }
}
