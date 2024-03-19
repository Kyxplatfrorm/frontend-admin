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
import { TranslateZpkZmkToZpkLmk } from "./translateZpkZmkToZpkLmk.model";
import { TranslateZpkZmkToZpkLmkService } from "./translateZpkZmkToZpkLmk.service";

@Component({
    selector: "translateZpkZmkToZpkLmk",
    templateUrl: "./translateZpkZmkToZpkLmk.component.html",
    styleUrls: ["./translateZpkZmkToZpkLmk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TranslateZpkZmkToZpkLmkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    translateZpkZmkToZpkLmk: TranslateZpkZmkToZpkLmk;
    pageType: string;
    visible: boolean = false;
    translateZpkZmkToZpkLmkForm: FormGroup;
    hsmZpkUnderLmk: string;
    hsmZpkKcv: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private translateZpkZmkToZpkLmkService: TranslateZpkZmkToZpkLmkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.translateZpkZmkToZpkLmkService.onTranslateZpkZmkToZpkLmkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((translateZpkZmkToZpkLmk) => {
                this.translateZpkZmkToZpkLmk = new TranslateZpkZmkToZpkLmk(
                    translateZpkZmkToZpkLmk
                );
                this.translateZpkZmkToZpkLmkForm =
                    this.createTranslateZpkZmkToZpkLmkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTranslateZpkZmkToZpkLmkForm
     *
     * @returns {FormGroup}
     */
    createTranslateZpkZmkToZpkLmkForm(): FormGroup {
        return this._formBuilder.group({
            ZmkUnderLmk: [this.translateZpkZmkToZpkLmk.ZmkUnderLmk],
            ZpkUnderZmk: [this.translateZpkZmkToZpkLmk.ZpkUnderZmk],
            AtallaVariant: [this.translateZpkZmkToZpkLmk.AtallaVariant],
            ZpkUnderLmk: [this.translateZpkZmkToZpkLmk.ZpkUnderLmk],
            HsmErrorCode: [this.translateZpkZmkToZpkLmk.HsmErrorCode],
            HsmErrorDescription: [
                this.translateZpkZmkToZpkLmk.HsmErrorDescription,
            ],
            ZpkKcv: [this.translateZpkZmkToZpkLmk.ZpkKcv],
        });
    }

    /**
     * TranslateZpkZmkToZpkLmkButton
     */
    TranslateZpkZmkToZpkLmkButton(): void {
        const data = this.translateZpkZmkToZpkLmkForm.getRawValue();
        this.translateZpkZmkToZpkLmkService
            .TranslateZpkZmkToZpkLmk(data)
            .then(() => {
                this.translateZpkZmkToZpkLmkService.onTranslateZpkZmkToZpkLmkChanged.next(
                    data
                );
                this.hsmZpkUnderLmk =
                    this.translateZpkZmkToZpkLmkService.zpkUnderLmk;
                this.hsmZpkKcv = this.translateZpkZmkToZpkLmkService.zpkKcv;
                this.generateHsmErrorCode =
                    this.translateZpkZmkToZpkLmkService.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.translateZpkZmkToZpkLmkService.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.translateZpkZmkToZpkLmkForm.reset();
    }
}
