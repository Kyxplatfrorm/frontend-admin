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
import { TranslateZpkLmkToZpkZmk } from "./translateZpkLmkToZpkZmk.model";
import { TranslateZpkLmkToZpkZmkService } from "./translateZpkLmkToZpkZmk.service";

@Component({
    selector: "translateZpkLmkToZpkZmk",
    templateUrl: "./translateZpkLmkToZpkZmk.component.html",
    styleUrls: ["./translateZpkLmkToZpkZmk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TranslateZpkLmkToZpkZmkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    translateZpkLmkToZpkZmk: TranslateZpkLmkToZpkZmk;
    pageType: string;
    visible: boolean = false;
    translateZpkLmkToZpkZmkForm: FormGroup;
    hsmZpkUnderZmk: string;
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
        private translateZpkLmkToZpkZmkService: TranslateZpkLmkToZpkZmkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.translateZpkLmkToZpkZmkService.onTranslateZpkLmkToZpkZmkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((translateZpkLmkToZpkZmk) => {
                this.translateZpkLmkToZpkZmk = new TranslateZpkLmkToZpkZmk(
                    translateZpkLmkToZpkZmk
                );
                this.translateZpkLmkToZpkZmkForm =
                    this.createTranslateZpkLmkToZpkZmkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTranslateZpkLmkToZpkZmkForm
     *
     * @returns {FormGroup}
     */
    createTranslateZpkLmkToZpkZmkForm(): FormGroup {
        return this._formBuilder.group({
            ZmkUnderLmk: [this.translateZpkLmkToZpkZmk.ZmkUnderLmk],
            AtallaVariant: [this.translateZpkLmkToZpkZmk.AtallaVariant],
            ZpkUnderLmk: [this.translateZpkLmkToZpkZmk.ZpkUnderLmk],
            HsmErrorCode: [this.translateZpkLmkToZpkZmk.HsmErrorCode],
            HsmErrorDescription: [
                this.translateZpkLmkToZpkZmk.HsmErrorDescription,
            ],
            ZpkUnderZmk: [this.translateZpkLmkToZpkZmk.ZpkUnderZmk],
            ZpkKcv: [this.translateZpkLmkToZpkZmk.ZpkKcv],
        });
    }

    /**
     * TranslateZpkLmkToZpkZmkButton
     */
    TranslateZpkLmkToZpkZmkButton(): void {
        const data = this.translateZpkLmkToZpkZmkForm.getRawValue();
        this.translateZpkLmkToZpkZmkService
            .TranslateZpkLmkToZpkZmk(data)
            .then(() => {
                this.translateZpkLmkToZpkZmkService.onTranslateZpkLmkToZpkZmkChanged.next(
                    data
                );
                this.hsmZpkUnderZmk =
                    this.translateZpkLmkToZpkZmkService.zpkUnderZmk;
                this.hsmZpkKcv = this.translateZpkLmkToZpkZmkService.zpkKcv;
                this.generateHsmErrorCode =
                    this.translateZpkLmkToZpkZmkService.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.translateZpkLmkToZpkZmkService.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.translateZpkLmkToZpkZmkForm.reset();
    }
}
