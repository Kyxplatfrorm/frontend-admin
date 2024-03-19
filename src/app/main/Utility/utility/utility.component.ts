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
import { UtilityService } from "./utility.service";
import { Utility } from "./utility.model";
import { AlertSnackBar } from "app/_helpers/AlertSnackbar";

@Component({
    selector: "utility",
    templateUrl: "./utility.component.html",
    styleUrls: ["./utility.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UtilityComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    utility: Utility;
    pageType: string;
    visible: boolean = false;
    utilityDetailForm: FormGroup;
    encryptionResult: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private utilityService: UtilityService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.utilityService.onUtilityChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((utility) => {
                this.utility = new Utility(utility);
                this.utilityDetailForm = this.createUtilityForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createUtilityForm
     *
     * @returns {FormGroup}
     */
    createUtilityForm(): FormGroup {
        return this._formBuilder.group({
            Data: [this.utility.Data],
            EncryptedData: [this.utility.EncryptedData],
        });
    }

    /**
     * EncryptButton
     */
    EncryptButton(): void {
        const data = this.utilityDetailForm.getRawValue();
        if (data.Data === undefined || data.Data === "" || data.Data === null) {
            this.alertMessage.AlertShow();
            return;
        }
        this.utilityService.encryptData(data).then(() => {
            this.utilityService.onUtilityChanged.next(data);
            this.encryptionResult = this.utilityService.encryptedData;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.utilityDetailForm.reset();
    }
}
