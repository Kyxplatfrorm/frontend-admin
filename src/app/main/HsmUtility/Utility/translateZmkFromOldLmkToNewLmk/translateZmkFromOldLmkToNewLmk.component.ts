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
import { TranslateZmkFromOldLmkToNewLmk } from "./translateZmkFromOldLmkToNewLmk.model";
import { TranslateZmkFromOldLmkToNewLmkService } from "./translateZmkFromOldLmkToNewLmk.service";

@Component({
    selector: "translateZmkFromOldLmkToNewLmk",
    templateUrl: "./translateZmkFromOldLmkToNewLmk.component.html",
    styleUrls: ["./translateZmkFromOldLmkToNewLmk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TranslateZmkFromOldLmkToNewLmkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    translateZmkFromOldLmkToNewLmk: TranslateZmkFromOldLmkToNewLmk;
    pageType: string;
    visible: boolean = false;
    translateZmkFromOldLmkToNewLmkForm: FormGroup;
    hsmZmkKeyUnderLmk: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private translateZmkFromOldLmkToNewLmkService: TranslateZmkFromOldLmkToNewLmkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.translateZmkFromOldLmkToNewLmkService.onTranslateZmkFromOldLmkToNewLmkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((translateZmkFromOldLmkToNewLmk) => {
                this.translateZmkFromOldLmkToNewLmk =
                    new TranslateZmkFromOldLmkToNewLmk(
                        translateZmkFromOldLmkToNewLmk
                    );
                this.translateZmkFromOldLmkToNewLmkForm =
                    this.createTranslateZmkFromOldLmkToNewLmkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTranslateZmkFromOldLmkToNewLmkForm
     *
     * @returns {FormGroup}
     */
    createTranslateZmkFromOldLmkToNewLmkForm(): FormGroup {
        return this._formBuilder.group({
            LmkZmkKey: [this.translateZmkFromOldLmkToNewLmk.LmkZmkKey],
            LmkIdentifier: [this.translateZmkFromOldLmkToNewLmk.LmkIdentifier],
            ZmkKeyUnderLmk: [
                this.translateZmkFromOldLmkToNewLmk.ZmkKeyUnderLmk,
            ],
            HsmErrorCode: [this.translateZmkFromOldLmkToNewLmk.HsmErrorCode],
            HsmErrorDescription: [
                this.translateZmkFromOldLmkToNewLmk.HsmErrorDescription,
            ],
        });
    }

    /**
     * TranslateZmkFromOldLmkToNewLmkButton
     */
    TranslateZmkFromOldLmkToNewLmkButton(): void {
        const data = this.translateZmkFromOldLmkToNewLmkForm.getRawValue();
        this.translateZmkFromOldLmkToNewLmkService
            .TranslateZmkFromOldLmkToNewLmk(data)
            .then(() => {
                this.translateZmkFromOldLmkToNewLmkService.onTranslateZmkFromOldLmkToNewLmkChanged.next(
                    data
                );
                this.hsmZmkKeyUnderLmk =
                    this.translateZmkFromOldLmkToNewLmkService.zmkKeyUnderLmk;
                this.generateHsmErrorCode =
                    this.translateZmkFromOldLmkToNewLmkService.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.translateZmkFromOldLmkToNewLmkService.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.translateZmkFromOldLmkToNewLmkForm.reset();
    }
}
