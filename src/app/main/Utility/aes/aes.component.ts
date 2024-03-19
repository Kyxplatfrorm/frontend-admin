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
import { EncryptionModesEntity, EncryptionTypeEntity } from "app/ui/utility";
import { Aes } from "./aes.model";
import { AesService } from "./aes.service";

@Component({
    selector: "aes",
    templateUrl: "./aes.component.html",
    styleUrls: ["./aes.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AesComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    aes: Aes;
    pageType: string;
    visible: boolean = false;
    aesForm: FormGroup;
    aesResult: string;
    encryptionType: EncryptionTypeEntity[];
    encryptionMode: EncryptionModesEntity[];

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private aesService: AesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.aesService.GetEncryptionTypes().then(() => {
            this.encryptionType =
                this.aesService.encryptionTypeApiResponse.ParameterList;
        });
        this.aesService.GetEncryptionModes().then(() => {
            this.encryptionMode =
                this.aesService.encryptionModesApiResponse.ParameterList;
        });
        this.aesService.onAesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((aes) => {
                this.aes = new Aes(aes);
                this.aesForm = this.createAesForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createAesForm
     *
     * @returns {FormGroup}
     */
    createAesForm(): FormGroup {
        return this._formBuilder.group({
            EncryptionTypeId: [this.aes.EncryptionTypeId],
            Data: [this.aes.Data],
            Key: [this.aes.Key],
            EncryptionModeId: [this.aes.EncryptionModeId],
            Iv: [this.aes.Iv],
            Result: [this.aes.Result],
        });
    }

    /**
     * AesButton
     */
    AesButton(): void {
        const data = this.aesForm.getRawValue();
        this.aesService.Aes(data).then(() => {
            this.aesService.onAesChanged.next(data);
            this.aesResult = this.aesService.result;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.aesForm.reset();
    }
}
