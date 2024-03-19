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
import { GeneratePinChangeScriptEmv4 } from "./generatePinChangeScriptEmv4.model";
import { GeneratePinChangeScriptEmv4Service } from "./generatePinChangeScriptEmv4.service";

@Component({
    selector: "generatePinChangeScriptEmv4",
    templateUrl: "./generatePinChangeScriptEmv4.component.html",
    styleUrls: ["./generatePinChangeScriptEmv4.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GeneratePinChangeScriptEmv4Component implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generatePinChangeScriptEmv4: GeneratePinChangeScriptEmv4;
    pageType: string;
    visible: boolean = false;
    generatePinChangeScriptEmv4Form: FormGroup;
    hsmIssuerScript: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generatePinChangeScriptEmv4Service: GeneratePinChangeScriptEmv4Service,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generatePinChangeScriptEmv4Service.onGeneratePinChangeScriptEmv4Changed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generatePinChangeScriptEmv4) => {
                this.generatePinChangeScriptEmv4 =
                    new GeneratePinChangeScriptEmv4(
                        generatePinChangeScriptEmv4
                    );
                this.generatePinChangeScriptEmv4Form =
                    this.createGeneratePinChangeScriptEmv4Form();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGeneratePinChangeScriptEmv4Form
     *
     * @returns {FormGroup}
     */
    createGeneratePinChangeScriptEmv4Form(): FormGroup {
        return this._formBuilder.group({
            AcUnderLmk: [this.generatePinChangeScriptEmv4.AcUnderLmk],
            EncUnderLmk: [this.generatePinChangeScriptEmv4.EncUnderLmk],
            MacKeyUnderLmk: [this.generatePinChangeScriptEmv4.MacKeyUnderLmk],
            ZpkUnderLmk: [this.generatePinChangeScriptEmv4.ZpkUnderLmk],
            CardNumber: [this.generatePinChangeScriptEmv4.CardNumber],
            HsmErrorCode: [this.generatePinChangeScriptEmv4.HsmErrorCode],
            HsmErrorDescription: [
                this.generatePinChangeScriptEmv4.HsmErrorDescription,
            ],
            PanSequenceNumber: [
                this.generatePinChangeScriptEmv4.PanSequenceNumber,
            ],
            Atc: [this.generatePinChangeScriptEmv4.Atc],
            Arqc: [this.generatePinChangeScriptEmv4.Arqc],
            PinBlockFormat: [this.generatePinChangeScriptEmv4.PinBlockFormat],
            PinBlock: [this.generatePinChangeScriptEmv4.PinBlock],
            IssuerScript: [this.generatePinChangeScriptEmv4.IssuerScript],
            SchemaId: [this.generatePinChangeScriptEmv4.SchemaId],
            BranchAndHeigthMode: [
                this.generatePinChangeScriptEmv4.BranchAndHeigthMode,
            ],
        });
    }

    /**
     * PinChangeScriptEmv4Button
     */
    PinChangeScriptEmv4Button(): void {
        const data = this.generatePinChangeScriptEmv4Form.getRawValue();
        this.generatePinChangeScriptEmv4Service
            .GeneratePinChangeScriptForEmv4(data)
            .then(() => {
                this.generatePinChangeScriptEmv4Service.onGeneratePinChangeScriptEmv4Changed.next(
                    data
                );
                this.hsmIssuerScript =
                    this.generatePinChangeScriptEmv4Service.issuerScript;
                this.generateHsmErrorCode =
                    this.generatePinChangeScriptEmv4Service.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.generatePinChangeScriptEmv4Service.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generatePinChangeScriptEmv4Form.reset();
    }
}
