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
import { GeneratePinLmk } from "./generatePinLmk.model";
import { GeneratePinLmkService } from "./generatePinLmk.service";

@Component({
    selector: "generatePinLmk",
    templateUrl: "./generatePinLmk.component.html",
    styleUrls: ["./generatePinLmk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GeneratePinLmkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generatePinLmk: GeneratePinLmk;
    pageType: string;
    visible: boolean = false;
    generatePinLmkForm: FormGroup;
    hsmPinLmk: number;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generatePinLmkService: GeneratePinLmkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generatePinLmkService.onGeneratePinLmkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generatePinLmk) => {
                this.generatePinLmk = new GeneratePinLmk(generatePinLmk);
                this.generatePinLmkForm = this.createGeneratePinLmkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGeneratePinLmkForm
     *
     * @returns {FormGroup}
     */
    createGeneratePinLmkForm(): FormGroup {
        return this._formBuilder.group({
            CardNumber: [this.generatePinLmk.CardNumber],
            LmkIdentifier: [this.generatePinLmk.LmkIdentifier],
            LmkType: [this.generatePinLmk.LmkType],
            PinLmk: [this.generatePinLmk.PinLmk],
            HsmErrorCode: [this.generatePinLmk.HsmErrorCode],
            HsmErrorDescription: [this.generatePinLmk.HsmErrorDescription],
        });
    }

    /**
     * PinLmkButton
     */
    PinLmkButton(): void {
        const data = this.generatePinLmkForm.getRawValue();
        this.generatePinLmkService.GeneratePinLmk(data).then(() => {
            this.generatePinLmkService.onGeneratePinLmkChanged.next(data);
            this.hsmPinLmk = this.generatePinLmkService.pinLmk;
            this.generateHsmErrorCode = this.generatePinLmkService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generatePinLmkService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generatePinLmkForm.reset();
    }
}
