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
import { VerifyArqcAndGenerateArpcEmv4 } from "./verifyArqcAndGenerateArpcEmv4.model";
import { VerifyArqcAndGenerateArpcEmv4Service } from "./verifyArqcAndGenerateArpcEmv4.service";

@Component({
    selector: "verifyArqcAndGenerateArpcEmv4",
    templateUrl: "./verifyArqcAndGenerateArpcEmv4.component.html",
    styleUrls: ["./verifyArqcAndGenerateArpcEmv4.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class VerifyArqcAndGenerateArpcEmv4Component implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    verifyArqcAndGenerateArpcEmv4: VerifyArqcAndGenerateArpcEmv4;
    pageType: string;
    visible: boolean = false;
    verifyArqcAndGenerateArpcEmv4Form: FormGroup;
    hsmArpcData: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private verifyArqcAndGenerateArpcEmv4Service: VerifyArqcAndGenerateArpcEmv4Service,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.verifyArqcAndGenerateArpcEmv4Service.onVerifyArqcAndGenerateArpcEmv4Changed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((verifyArqcAndGenerateArpcEmv4) => {
                this.verifyArqcAndGenerateArpcEmv4 =
                    new VerifyArqcAndGenerateArpcEmv4(
                        verifyArqcAndGenerateArpcEmv4
                    );
                this.verifyArqcAndGenerateArpcEmv4Form =
                    this.createVerifyArqcAndGenerateArpcEmv4Form();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createVerifyArqcAndGenerateArpcEmv4Form
     *
     * @returns {FormGroup}
     */
    createVerifyArqcAndGenerateArpcEmv4Form(): FormGroup {
        return this._formBuilder.group({
            AcUnderLmk: [this.verifyArqcAndGenerateArpcEmv4.AcUnderLmk],
            CardNumber: [this.verifyArqcAndGenerateArpcEmv4.CardNumber],
            HsmErrorCode: [this.verifyArqcAndGenerateArpcEmv4.HsmErrorCode],
            HsmErrorDescription: [
                this.verifyArqcAndGenerateArpcEmv4.HsmErrorDescription,
            ],
            PanSequenceNumber: [
                this.verifyArqcAndGenerateArpcEmv4.PanSequenceNumber,
            ],
            Arc: [this.verifyArqcAndGenerateArpcEmv4.Arc],
            EmvData: [this.verifyArqcAndGenerateArpcEmv4.EmvData],

            ArpcData: [this.verifyArqcAndGenerateArpcEmv4.ArpcData],
            ModeFlag: [this.verifyArqcAndGenerateArpcEmv4.ModeFlag],
            ProprietaryAuthenticationData: [
                this.verifyArqcAndGenerateArpcEmv4
                    .ProprietaryAuthenticationData,
            ],
            Csu: [this.verifyArqcAndGenerateArpcEmv4.Csu],
        });
    }

    /**
     * VerifyArqcAndGenerateArpcEmv4Button
     */
    VerifyArqcAndGenerateArpcEmv4Button(): void {
        const data = this.verifyArqcAndGenerateArpcEmv4Form.getRawValue();
        this.verifyArqcAndGenerateArpcEmv4Service
            .VerifyArqcAndGenerateArpcEmv4(data)
            .then(() => {
                this.verifyArqcAndGenerateArpcEmv4Service.onVerifyArqcAndGenerateArpcEmv4Changed.next(
                    data
                );
                this.hsmArpcData =
                    this.verifyArqcAndGenerateArpcEmv4Service.arpcData;
                this.generateHsmErrorCode =
                    this.verifyArqcAndGenerateArpcEmv4Service.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.verifyArqcAndGenerateArpcEmv4Service.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.verifyArqcAndGenerateArpcEmv4Form.reset();
    }
}
