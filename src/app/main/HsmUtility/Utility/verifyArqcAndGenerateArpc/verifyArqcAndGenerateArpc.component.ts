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
import { VerifyArqcAndGenerateArpc } from "./verifyArqcAndGenerateArpc.model";
import { VerifyArqcAndGenerateArpcService } from "./verifyArqcAndGenerateArpc.service";

@Component({
    selector: "verifyArqcAndGenerateArpc",
    templateUrl: "./verifyArqcAndGenerateArpc.component.html",
    styleUrls: ["./verifyArqcAndGenerateArpc.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class VerifyArqcAndGenerateArpcComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    verifyArqcAndGenerateArpc: VerifyArqcAndGenerateArpc;
    pageType: string;
    visible: boolean = false;
    verifyArqcAndGenerateArpcForm: FormGroup;
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
        private verifyArqcAndGenerateArpcService: VerifyArqcAndGenerateArpcService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.verifyArqcAndGenerateArpcService.onVerifyArqcAndGenerateArpcChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((verifyArqcAndGenerateArpc) => {
                this.verifyArqcAndGenerateArpc = new VerifyArqcAndGenerateArpc(
                    verifyArqcAndGenerateArpc
                );
                this.verifyArqcAndGenerateArpcForm =
                    this.createVerifyArqcAndGenerateArpcForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createVerifyArqcAndGenerateArpcForm
     *
     * @returns {FormGroup}
     */
    createVerifyArqcAndGenerateArpcForm(): FormGroup {
        return this._formBuilder.group({
            AcUnderLmk: [this.verifyArqcAndGenerateArpc.AcUnderLmk],
            CardNumber: [this.verifyArqcAndGenerateArpc.CardNumber],
            HsmErrorCode: [this.verifyArqcAndGenerateArpc.HsmErrorCode],
            HsmErrorDescription: [
                this.verifyArqcAndGenerateArpc.HsmErrorDescription,
            ],
            PanSequenceNumber: [
                this.verifyArqcAndGenerateArpc.PanSequenceNumber,
            ],
            Arc: [this.verifyArqcAndGenerateArpc.Arc],
            EmvData: [this.verifyArqcAndGenerateArpc.EmvData],

            ArpcData: [this.verifyArqcAndGenerateArpc.ArpcData],
        });
    }

    /**
     * VerifyArqcAndGenerateArpcButton
     */
    VerifyArqcAndGenerateArpcButton(): void {
        const data = this.verifyArqcAndGenerateArpcForm.getRawValue();
        this.verifyArqcAndGenerateArpcService
            .VerifyArqcAndGenerateArpc(data)
            .then(() => {
                this.verifyArqcAndGenerateArpcService.onVerifyArqcAndGenerateArpcChanged.next(
                    data
                );
                this.hsmArpcData =
                    this.verifyArqcAndGenerateArpcService.arpcData;
                this.generateHsmErrorCode =
                    this.verifyArqcAndGenerateArpcService.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.verifyArqcAndGenerateArpcService.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.verifyArqcAndGenerateArpcForm.reset();
    }
}
