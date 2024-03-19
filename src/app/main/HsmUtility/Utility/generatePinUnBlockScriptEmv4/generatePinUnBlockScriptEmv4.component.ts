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
import { GeneratePinUnBlockScriptEmv4 } from "./generatePinUnBlockScriptEmv4.model";
import { GeneratePinUnBlockScriptEmv4Service } from "./generatePinUnBlockScriptEmv4.service";

@Component({
    selector: "generatePinUnBlockScriptEmv4",
    templateUrl: "./generatePinUnBlockScriptEmv4.component.html",
    styleUrls: ["./generatePinUnBlockScriptEmv4.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GeneratePinUnBlockScriptEmv4Component implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generatePinUnBlockScriptEmv4: GeneratePinUnBlockScriptEmv4;
    pageType: string;
    visible: boolean = false;
    generatePinUnBlockScriptEmv4Form: FormGroup;
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
        private generatePinUnBlockScriptEmv4Service: GeneratePinUnBlockScriptEmv4Service,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generatePinUnBlockScriptEmv4Service.onGeneratePinUnBlockScriptEmv4Changed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generatePinUnBlockScriptEmv4) => {
                this.generatePinUnBlockScriptEmv4 =
                    new GeneratePinUnBlockScriptEmv4(
                        generatePinUnBlockScriptEmv4
                    );
                this.generatePinUnBlockScriptEmv4Form =
                    this.createGeneratePinUnBlockScriptEmv4Form();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGeneratePinUnBlockScriptEmv4Form
     *
     * @returns {FormGroup}
     */
    createGeneratePinUnBlockScriptEmv4Form(): FormGroup {
        return this._formBuilder.group({
            MacKeyUnderLmk: [this.generatePinUnBlockScriptEmv4.MacKeyUnderLmk],
            CardNumber: [this.generatePinUnBlockScriptEmv4.CardNumber],
            HsmErrorCode: [this.generatePinUnBlockScriptEmv4.HsmErrorCode],
            HsmErrorDescription: [
                this.generatePinUnBlockScriptEmv4.HsmErrorDescription,
            ],
            PanSequenceNumber: [
                this.generatePinUnBlockScriptEmv4.PanSequenceNumber,
            ],
            Atc: [this.generatePinUnBlockScriptEmv4.Atc],
            Arqc: [this.generatePinUnBlockScriptEmv4.Arqc],
            IssuerScript: [this.generatePinUnBlockScriptEmv4.IssuerScript],
            ModeFlag: [this.generatePinUnBlockScriptEmv4.ModeFlag],
            SchemaId: [this.generatePinUnBlockScriptEmv4.SchemaId],
            BranchAndHeigthMode: [
                this.generatePinUnBlockScriptEmv4.BranchAndHeigthMode,
            ],
        });
    }

    /**
     * PinUnBlockScriptEmv4Button
     */
    PinUnBlockScriptEmv4Button(): void {
        const data = this.generatePinUnBlockScriptEmv4Form.getRawValue();
        this.generatePinUnBlockScriptEmv4Service
            .GeneratePinUnBlockScriptEmv4(data)
            .then(() => {
                this.generatePinUnBlockScriptEmv4Service.onGeneratePinUnBlockScriptEmv4Changed.next(
                    data
                );
                this.hsmIssuerScript =
                    this.generatePinUnBlockScriptEmv4Service.issuerScript;
                this.generateHsmErrorCode =
                    this.generatePinUnBlockScriptEmv4Service.hsmErrorCode;
                this.generateHsmErrorDescription =
                    this.generatePinUnBlockScriptEmv4Service.hsmErrorDescription;
            });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generatePinUnBlockScriptEmv4Form.reset();
    }
}
