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
import { GenerateZpk } from "./generateZpk.model";
import { GenerateZpkService } from "./generateZpk.service";

@Component({
    selector: "generateZpk",
    templateUrl: "./generateZpk.component.html",
    styleUrls: ["./generateZpk.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenerateZpkComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generateZpk: GenerateZpk;
    pageType: string;
    visible: boolean = false;
    generateZpkForm: FormGroup;
    hsmZpkUnderLmk: string;
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
        private generateZpkService: GenerateZpkService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generateZpkService.onGenerateZpkChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generateZpk) => {
                this.generateZpk = new GenerateZpk(generateZpk);
                this.generateZpkForm = this.createGenerateZpkForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGenerateZpkForm
     *
     * @returns {FormGroup}
     */
    createGenerateZpkForm(): FormGroup {
        return this._formBuilder.group({
            ZmkUnderLmk: [this.generateZpk.ZmkUnderLmk],
            AtallaVariant: [this.generateZpk.AtallaVariant],
            ZpkUnderLmk: [this.generateZpk.ZpkUnderLmk],
            ZpkUnderZmk: [this.generateZpk.ZpkUnderZmk],
            ZpkKcv: [this.generateZpk.ZpkKcv],
            HsmErrorCode: [this.generateZpk.HsmErrorCode],
            HsmErrorDescription: [this.generateZpk.HsmErrorDescription],
        });
    }

    /**
     * GenerateZpkButton
     */
    GenerateZpkButton(): void {
        const data = this.generateZpkForm.getRawValue();
        this.generateZpkService.GenerateZpk(data).then(() => {
            this.generateZpkService.onGenerateZpkChanged.next(data);
            this.hsmZpkUnderLmk = this.generateZpkService.zpkUnderLmk;
            this.hsmZpkUnderZmk = this.generateZpkService.zpkUnderZmk;
            this.hsmZpkKcv = this.generateZpkService.zpkKcv;
            this.generateHsmErrorCode = this.generateZpkService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generateZpkService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generateZpkForm.reset();
    }
}
