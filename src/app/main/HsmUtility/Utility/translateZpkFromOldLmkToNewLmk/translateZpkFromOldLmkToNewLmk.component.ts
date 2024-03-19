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
import { TranslateZpkFromOldLmkToNewLmk } from "./translateZpkFromOldLmkToNewLmk.model";
import { TranslateZpkFromOldLmkToNewLmkService } from "./translateZpkFromOldLmkToNewLmk.service";

@Component({
    selector: "translateZpkFromOldLmkToNewLmk",
    templateUrl: "./translateZpkFromOldLmkToNewLmk.component.html",
    styleUrls: ["./translateZpkFromOldLmkToNewLmk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TranslateZpkFromOldLmkToNewLmkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    translateZpkFromOldLmkToNewLmk: TranslateZpkFromOldLmkToNewLmk;
    pageType: string;
    visible: boolean = false;
    translateZpkFromOldLmkToNewLmkForm: FormGroup;
    hsmZpkUnderLmk: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private translateZpkFromOldLmkToNewLmkService: TranslateZpkFromOldLmkToNewLmkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.translateZpkFromOldLmkToNewLmkService.onTranslateZpkFromOldLmkToNewLmkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((translateZpkFromOldLmkToNewLmk) => {
                this.translateZpkFromOldLmkToNewLmk =
                    new TranslateZpkFromOldLmkToNewLmk(
                        translateZpkFromOldLmkToNewLmk
                    );
                this.translateZpkFromOldLmkToNewLmkForm =
                    this.createTranslateZpkFromOldLmkToNewLmkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTranslateZpkFromOldLmkToNewLmkForm
     *
     * @returns {FormGroup}
     */
    createTranslateZpkFromOldLmkToNewLmkForm(): FormGroup {
        return this._formBuilder.group({
            ZpkLmkKey: [this.translateZpkFromOldLmkToNewLmk.ZpkLmkKey],
            LmkIdentifier: [this.translateZpkFromOldLmkToNewLmk.LmkIdentifier],
            ZpkUnderLmk: [this.translateZpkFromOldLmkToNewLmk.ZpkUnderLmk],
            HsmErrorCode: [this.translateZpkFromOldLmkToNewLmk.HsmErrorCode],
            HsmErrorDescription: [
                this.translateZpkFromOldLmkToNewLmk.HsmErrorDescription,
            ],
        });
    }

    /**
     * TranslateZpkFromOldLmkToNewLmkButton
     */
    TranslateZpkFromOldLmkToNewLmkButton(): void {
        const data = this.translateZpkFromOldLmkToNewLmkForm.getRawValue();
        this.translateZpkFromOldLmkToNewLmkService
            .TranslateZpkFromOldLmkToNewLmk(data)
            .then(() => {
                this.translateZpkFromOldLmkToNewLmkService.onTranslateZpkFromOldLmkToNewLmkChanged.next(
                    data
                );
                this.hsmZpkUnderLmk =
                    this.translateZpkFromOldLmkToNewLmkService.zpkUnderLmk;
                this.generateHsmErrorCode =
                    this.translateZpkFromOldLmkToNewLmkService.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.translateZpkFromOldLmkToNewLmkService.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.translateZpkFromOldLmkToNewLmkForm.reset();
    }
}
