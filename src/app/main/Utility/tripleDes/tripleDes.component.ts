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
import { TripleDes } from "./tripleDes.model";
import { TripleDesService } from "./tripleDes.service";
import { EncryptionModesEntity, EncryptionTypeEntity } from "app/ui/utility";

@Component({
    selector: "tripleDes",
    templateUrl: "./tripleDes.component.html",
    styleUrls: ["./tripleDes.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TripleDesComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    tripleDes: TripleDes;
    pageType: string;
    visible: boolean = false;
    tripleDesForm: FormGroup;
    tripleDesResult: string;
    encryptionType: EncryptionTypeEntity[];
    encryptionMode: EncryptionModesEntity[];

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tripleDesService: TripleDesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tripleDesService.GetEncryptionTypes().then(() => {
            this.encryptionType =
                this.tripleDesService.encryptionTypeApiResponse.ParameterList;
        });
        this.tripleDesService.GetEncryptionModes().then(() => {
            this.encryptionMode =
                this.tripleDesService.encryptionModesApiResponse.ParameterList;
        });
        this.tripleDesService.onTripleDesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tripleDes) => {
                this.tripleDes = new TripleDes(tripleDes);
                this.tripleDesForm = this.createTripleDesForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTripleDesForm
     *
     * @returns {FormGroup}
     */
    createTripleDesForm(): FormGroup {
        return this._formBuilder.group({
            EncryptionTypeId: [this.tripleDes.EncryptionTypeId],
            Data: [this.tripleDes.Data],
            Key: [this.tripleDes.Key],
            EncryptionModeId: [this.tripleDes.EncryptionModeId],
            Iv: [this.tripleDes.Iv],
            Result: [this.tripleDes.Result],
        });
    }

    /**
     * TripleDesButton
     */
    TripleDesButton(): void {
        const data = this.tripleDesForm.getRawValue();
        this.tripleDesService.TripleDes(data).then(() => {
            this.tripleDesService.onTripleDesChanged.next(data);
            this.tripleDesResult = this.tripleDesService.result;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.tripleDesForm.reset();
    }
}
