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
import { TranslatePinZpkToZpk2 } from "./translatePinZpkToZpk2.model";
import { TranslatePinZpkToZpk2Service } from "./translatePinZpkToZpk2.service";

@Component({
    selector: "translatePinZpkToZpk2",
    templateUrl: "./translatePinZpkToZpk2.component.html",
    styleUrls: ["./translatePinZpkToZpk2.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TranslatePinZpkToZpk2Component implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    translatePinZpkToZpk2: TranslatePinZpkToZpk2;
    pageType: string;
    visible: boolean = false;
    translatePinZpkToZpk2Form: FormGroup;
    hsmLengthOfThePin: string;
    hsmPinUnderDestinationZpk: string;
    hsmDestinationPinBlockFormat: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private translatePinZpkToZpk2Service: TranslatePinZpkToZpk2Service,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.translatePinZpkToZpk2Service.onTranslatePinZpkToZpk2Changed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((translatePinZpkToZpk2) => {
                this.translatePinZpkToZpk2 = new TranslatePinZpkToZpk2(
                    translatePinZpkToZpk2
                );
                this.translatePinZpkToZpk2Form =
                    this.createTranslatePinZpkToZpk2Form();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTranslatePinZpkToZpk2Form
     *
     * @returns {FormGroup}
     */
    createTranslatePinZpkToZpk2Form(): FormGroup {
        return this._formBuilder.group({
            SourceZpkUnderLmk: [this.translatePinZpkToZpk2.SourceZpkUnderLmk],
            CardNumber: [this.translatePinZpkToZpk2.CardNumber],
            HsmErrorCode: [this.translatePinZpkToZpk2.HsmErrorCode],
            HsmErrorDescription: [
                this.translatePinZpkToZpk2.HsmErrorDescription,
            ],
            SourcePinBlockFormat: [
                this.translatePinZpkToZpk2.SourcePinBlockFormat,
            ],
            PinUnderSourceZpk: [this.translatePinZpkToZpk2.PinUnderSourceZpk],
            DestinationZpkUnderLmk: [
                this.translatePinZpkToZpk2.DestinationZpkUnderLmk,
            ],

            DestinationPinBlockFormat: [
                this.translatePinZpkToZpk2.DestinationPinBlockFormat,
            ],
            MaksimumPinLength: [this.translatePinZpkToZpk2.MaksimumPinLength],
            LmkType: [this.translatePinZpkToZpk2.LmkType],
            LengthOfThePin: [this.translatePinZpkToZpk2.LengthOfThePin],
            PinUnderDestinationZpk: [
                this.translatePinZpkToZpk2.PinUnderDestinationZpk,
            ],
        });
    }

    /**
     * TranslatePinUnderZpkToZpk2Button
     */
    TranslatePinUnderZpkToZpk2Button(): void {
        const data = this.translatePinZpkToZpk2Form.getRawValue();
        this.translatePinZpkToZpk2Service
            .TranslatePinUnderZpkToZpk2(data)
            .then(() => {
                this.translatePinZpkToZpk2Service.onTranslatePinZpkToZpk2Changed.next(
                    data
                );
                this.hsmDestinationPinBlockFormat =
                    this.translatePinZpkToZpk2Service.destinationPinBlockFormat;
                this.hsmLengthOfThePin =
                    this.translatePinZpkToZpk2Service.lengthOfThePin;
                this.hsmPinUnderDestinationZpk =
                    this.translatePinZpkToZpk2Service.pinUnderDestinationZpk;
                this.generateHsmErrorCode =
                    this.translatePinZpkToZpk2Service.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.translatePinZpkToZpk2Service.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.translatePinZpkToZpk2Form.reset();
    }
}
