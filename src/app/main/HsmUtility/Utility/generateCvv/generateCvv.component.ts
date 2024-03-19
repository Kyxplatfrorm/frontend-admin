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
import { GenerateCvv } from "./generateCvv.model";
import { GenerateCvvService } from "./generateCvv.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
    selector: "generateCvv",
    templateUrl: "./generateCvv.component.html",
    styleUrls: ["./generateCvv.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenerateCvvComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generateCvv: GenerateCvv;
    pageType: string;
    visible: boolean = false;
    genereateCvvForm: FormGroup;
    cvv: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generateCvvService: GenerateCvvService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generateCvvService.onGenerateCvvChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generateCvv) => {
                this.generateCvv = new GenerateCvv(generateCvv);
                this.genereateCvvForm = this.createGenerateCvvForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGenerateCvvForm
     *
     * @returns {FormGroup}
     */
    createGenerateCvvForm(): FormGroup {
        return this._formBuilder.group({
            CvvKey: [this.generateCvv.CvvKey],
            CardNumber: [this.generateCvv.CardNumber],
            ExpiryDateYYMM: [this.generateCvv.ExpiryDateYYMM],
            ServiceCode: [this.generateCvv.ServiceCode],
            HsmErrorCode: [this.generateCvv.HsmErrorCode],
            HsmErrorDescription: [this.generateCvv.HsmErrorDescription],
            Cvv: [this.generateCvv.Cvv],
        });
    }

    /**
     * GenerateCvvButton
     */
    GenerateCvvButton(): void {
        const data = this.genereateCvvForm.getRawValue();
        this.generateCvvService.GenerateCvv(data).then(() => {
            this.generateCvvService.onGenerateCvvChanged.next(data);
            this.cvv = this.generateCvvService.generateHsmCvv;
            this.generateHsmErrorCode = this.generateCvvService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generateCvvService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.genereateCvvForm.reset();
    }
}
