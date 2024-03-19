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
import { ImportKey } from "./importZpkForKeyBlock.model";
import { ImportZpkForKeyBlockService } from "./importZpkForKeyBlock.service";

@Component({
    selector: "importZpkForKeyBlock",
    templateUrl: "./importZpkForKeyBlock.component.html",
    styleUrls: ["./importZpkForKeyBlock.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ImportZpkForKeyBlockComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    importKey: ImportKey;
    pageType: string;
    visible: boolean = false;
    importZpkForKeyBlockForm: FormGroup;
    hsmKeyUnderLmkWithKcv: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private importZpkForKeyBlockService: ImportZpkForKeyBlockService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.importZpkForKeyBlockService.onImportZpkForKeyBlockChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((importKey) => {
                this.importKey = new ImportKey(importKey);
                this.importZpkForKeyBlockForm =
                    this.createImportZpkForKeyBlockForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createImportZpkForKeyBlockForm
     *
     * @returns {FormGroup}
     */
    createImportZpkForKeyBlockForm(): FormGroup {
        return this._formBuilder.group({
            ZpkUnderZmk: [this.importKey.ZpkUnderZmk],
            ZmkUnderLmk: [this.importKey.ZmkUnderLmk],
            KeyUnderLmkWithKcv: [this.importKey.KeyUnderLmkWithKcv],
            HsmErrorCode: [this.importKey.HsmErrorCode],
            HsmErrorDescription: [this.importKey.HsmErrorDescription],
        });
    }

    /**
     * ImportZpkForKeyBlockButton
     */
    ImportZpkForKeyBlockButton(): void {
        const data = this.importZpkForKeyBlockForm.getRawValue();
        this.importZpkForKeyBlockService.ImportZpkForKeyBlock(data).then(() => {
            this.importZpkForKeyBlockService.onImportZpkForKeyBlockChanged.next(
                data
            );
            this.hsmKeyUnderLmkWithKcv =
                this.importZpkForKeyBlockService.keyUnderLmkWithKcv;
            this.generateHsmErrorCode =
                this.importZpkForKeyBlockService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.importZpkForKeyBlockService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.importZpkForKeyBlockForm.reset();
    }
}
