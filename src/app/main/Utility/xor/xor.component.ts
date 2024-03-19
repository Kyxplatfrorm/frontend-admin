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
import { Xor } from "./xor.model";
import { XorService } from "./xor.service";

@Component({
    selector: "xor",
    templateUrl: "./xor.component.html",
    styleUrls: ["./xor.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class XorComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    xor: Xor;
    pageType: string;
    visible: boolean = false;
    xorForm: FormGroup;
    xorResult: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private xorService: XorService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.xorService.onXorChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((xor) => {
                this.xor = new Xor(xor);
                this.xorForm = this.createXorForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createXorForm
     *
     * @returns {FormGroup}
     */
    createXorForm(): FormGroup {
        return this._formBuilder.group({
            XorData1: [this.xor.XorData1],
            XorData2: [this.xor.XorData2],
            Result: [this.xor.Result],
        });
    }

    /**
     * XorButton
     */
    XorButton(): void {
        const data = this.xorForm.getRawValue();
        this.xorService.ExOr(data).then(() => {
            this.xorService.onXorChanged.next(data);
            this.xorResult = this.xorService.result;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.xorForm.reset();
    }
}
