import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialogRef } from "@angular/material/dialog";
import { AlertSnackBar } from "app/_helpers/AlertSnackbar";
import { Kcv } from "./generateKcv.model";
import { GenerateKcvService } from "./generateKcv.service";

@Component({
    selector: "generateKcv",
    templateUrl: "./generateKcv.component.html",
    styleUrls: ["./generateKcv.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenerateKcvComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    kcv: Kcv;
    pageType: string;
    visible: boolean = false;
    generateKcvForm: FormGroup;
    kcvResult: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generateKcvService: GenerateKcvService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generateKcvService.onGenerateKcvChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((kcv) => {
                this.kcv = new Kcv(kcv);
                this.generateKcvForm = this.createGenerateKcvForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGenerateKcvForm
     *
     * @returns {FormGroup}
     */
    createGenerateKcvForm(): FormGroup {
        return this._formBuilder.group({
            Key: [this.kcv.Key],
            Result: [this.kcv.Result],
        });
    }

    /**
     * GenerateKcvButton
     */
    GenerateKcvButton(): void {
        const data = this.generateKcvForm.getRawValue();
        if (data.Key === undefined || data.Key === "" || data.Key === null) {
            this.alertMessage.AlertShow();
            return;
        }
        this.generateKcvService.GenerateKcv(data).then(() => {
            this.generateKcvService.onGenerateKcvChanged.next(data);
            this.kcvResult = this.generateKcvService.result;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generateKcvForm.reset();
    }
}
