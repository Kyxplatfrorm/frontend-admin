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
import { GenerateMac } from "./generateMac.model";
import { GenerateMacService } from "./generateMac.service";

@Component({
    selector: "generateMac",
    templateUrl: "./generateMac.component.html",
    styleUrls: ["./generateMac.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenerateMacComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generateMac: GenerateMac;
    pageType: string;
    visible: boolean = false;
    generateMacForm: FormGroup;
    hsmMac: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generateMacService: GenerateMacService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generateMacService.onGenerateMacChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generateMac) => {
                this.generateMac = new GenerateMac(generateMac);
                this.generateMacForm = this.createGenerateMacForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGenerateMacForm
     *
     * @returns {FormGroup}
     */
    createGenerateMacForm(): FormGroup {
        return this._formBuilder.group({
            MacKeyUnderLmk: [this.generateMac.MacKeyUnderLmk],
            MacData: [this.generateMac.MacData],
            Mac: [this.generateMac.Mac],
            HsmErrorCode: [this.generateMac.HsmErrorCode],
            HsmErrorDescription: [this.generateMac.HsmErrorDescription],
        });
    }

    /**
     * GenerateMacButton
     */
    GenerateMacButton(): void {
        const data = this.generateMacForm.getRawValue();
        this.generateMacService.GenerateMac(data).then(() => {
            this.generateMacService.onGenerateMacChanged.next(data);
            this.hsmMac = this.generateMacService.mac;
            this.generateHsmErrorCode = this.generateMacService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generateMacService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generateMacForm.reset();
    }
}
