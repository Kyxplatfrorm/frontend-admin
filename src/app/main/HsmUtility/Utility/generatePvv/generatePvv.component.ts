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
import { GeneratePvv } from "./generatePvv.model";
import { GeneratePvvService } from "./generatePvv.service";

@Component({
    selector: "generatePvv",
    templateUrl: "./generatePvv.component.html",
    styleUrls: ["./generatePvv.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GeneratePvvComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generatePvv: GeneratePvv;
    pageType: string;
    visible: boolean = false;
    generatePvvForm: FormGroup;
    hsmPvv: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generatePvvService: GeneratePvvService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generatePvvService.onGeneratePvvChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generatePvv) => {
                this.generatePvv = new GeneratePvv(generatePvv);
                this.generatePvvForm = this.createGeneratePvvForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGeneratePvvForm
     *
     * @returns {FormGroup}
     */
    createGeneratePvvForm(): FormGroup {
        return this._formBuilder.group({
            PinUnderLmk: [this.generatePvv.PinUnderLmk],
            CardNumber: [this.generatePvv.CardNumber],
            HsmErrorCode: [this.generatePvv.HsmErrorCode],
            HsmErrorDescription: [this.generatePvv.HsmErrorDescription],
            PvvKeyIndex: [this.generatePvv.PvvKeyIndex],
            PvvKeyA: [this.generatePvv.PvvKeyA],
            PvvKeyB: [this.generatePvv.PvvKeyB],
            Pvv: [this.generatePvv.Pvv],
        });
    }

    /**
     * GeneratePvvButton
     */
    GeneratePvvButton(): void {
        const data = this.generatePvvForm.getRawValue();
        this.generatePvvService.GeneratePvv(data).then(() => {
            this.generatePvvService.onGeneratePvvChanged.next(data);
            this.hsmPvv = this.generatePvvService.pvv;
            this.generateHsmErrorCode = this.generatePvvService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generatePvvService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generatePvvForm.reset();
    }
}
