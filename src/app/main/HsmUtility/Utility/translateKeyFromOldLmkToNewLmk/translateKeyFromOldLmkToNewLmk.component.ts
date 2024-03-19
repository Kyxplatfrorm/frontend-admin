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
import { TranslateKeyFromOldLmkToNewLmk } from "./translateKeyFromOldLmkToNewLmk.model";
import { TranslateKeyFromOldLmkToNewLmkService } from "./translateKeyFromOldLmkToNewLmk.service";

@Component({
    selector: "translateKeyFromOldLmkToNewLmk",
    templateUrl: "./translateKeyFromOldLmkToNewLmk.component.html",
    styleUrls: ["./translateKeyFromOldLmkToNewLmk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TranslateKeyFromOldLmkToNewLmkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    translateKeyFromOldLmkToNewLmk: TranslateKeyFromOldLmkToNewLmk;
    pageType: string;
    visible: boolean = false;
    translateKeyFromOldLmkToNewLmkForm: FormGroup;
    hsmKeyUnderLmk: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private translateKeyFromOldLmkToNewLmkService: TranslateKeyFromOldLmkToNewLmkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.translateKeyFromOldLmkToNewLmkService.onTranslateKeyFromOldLmkToNewLmkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((translateKeyFromOldLmkToNewLmk) => {
                this.translateKeyFromOldLmkToNewLmk =
                    new TranslateKeyFromOldLmkToNewLmk(
                        translateKeyFromOldLmkToNewLmk
                    );
                this.translateKeyFromOldLmkToNewLmkForm =
                    this.createTranslateKeyFromOldLmkToNewLmkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTranslateKeyFromOldLmkToNewLmkForm
     *
     * @returns {FormGroup}
     */
    createTranslateKeyFromOldLmkToNewLmkForm(): FormGroup {
        return this._formBuilder.group({
            KeyTypeCode: [this.translateKeyFromOldLmkToNewLmk.KeyTypeCode],
            KeyLength: [this.translateKeyFromOldLmkToNewLmk.KeyLength],
            HsmErrorCode: [this.translateKeyFromOldLmkToNewLmk.HsmErrorCode],
            HsmErrorDescription: [
                this.translateKeyFromOldLmkToNewLmk.HsmErrorDescription,
            ],
            LmkKey: [this.translateKeyFromOldLmkToNewLmk.LmkKey],
            KeyType: [this.translateKeyFromOldLmkToNewLmk.KeyType],
            LmkIdentifier: [this.translateKeyFromOldLmkToNewLmk.LmkIdentifier],
            KeyUsage: [this.translateKeyFromOldLmkToNewLmk.KeyUsage],
            ModeOfUse: [this.translateKeyFromOldLmkToNewLmk.ModeOfUse],
            KeyVersionNumber: [
                this.translateKeyFromOldLmkToNewLmk.KeyVersionNumber,
            ],
            Exportability: [this.translateKeyFromOldLmkToNewLmk.Exportability],
            NumberOfOptionalBlocks: [
                this.translateKeyFromOldLmkToNewLmk.NumberOfOptionalBlocks,
            ],
            OptionalBlocks: [
                this.translateKeyFromOldLmkToNewLmk.OptionalBlocks,
            ],
            KeyUnderLmk: [this.translateKeyFromOldLmkToNewLmk.KeyUnderLmk],
        });
    }

    /**
     * TranslateKeyFromOldLmkToNewLmkButton
     */
    TranslateKeyFromOldLmkToNewLmkButton(): void {
        const data = this.translateKeyFromOldLmkToNewLmkForm.getRawValue();
        this.translateKeyFromOldLmkToNewLmkService
            .TranslateKeyFromOldLmkToNewLmk(data)
            .then(() => {
                this.translateKeyFromOldLmkToNewLmkService.onTranslateKeyFromOldLmkToNewLmkChanged.next(
                    data
                );
                this.hsmKeyUnderLmk =
                    this.translateKeyFromOldLmkToNewLmkService.keyUnderLmk;
                this.generateHsmErrorCode =
                    this.translateKeyFromOldLmkToNewLmkService.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.translateKeyFromOldLmkToNewLmkService.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.translateKeyFromOldLmkToNewLmkForm.reset();
    }
}
