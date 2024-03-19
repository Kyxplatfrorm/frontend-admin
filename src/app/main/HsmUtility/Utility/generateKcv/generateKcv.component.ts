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
import { GenerateKcv } from "./generateKcv.model";
import { GenerateKcvService } from "./generateKcv.service";
import {
    HsmKcvKeyLengthFlagTypeEntity,
    HsmKcvKeyTypeEntity,
} from "app/ui/hsmUtility";

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
    generateKcv: GenerateKcv;
    pageType: string;
    visible: boolean = false;
    genereateKcvForm: FormGroup;
    keyCheckValue: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    hsmKcvKeyTpyeList: HsmKcvKeyTypeEntity[];
    hsmKcvLengthFlagList: HsmKcvKeyLengthFlagTypeEntity[];

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
        this.generateKcvService.GetHsmKcvKeyType().then(() => {
            this.hsmKcvKeyTpyeList =
                this.generateKcvService.hsmKcvKeyTypeApiResponse.ParameterList;
        });
        this.generateKcvService.GetHsmKeyLengthFlagType().then(() => {
            this.hsmKcvLengthFlagList =
                this.generateKcvService.hsmKcvKeyLengthFlagTypeApiResponse.ParameterList;
        });
        this.generateKcvService.onGenerateKcvChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generateKcv) => {
                this.generateKcv = new GenerateKcv(generateKcv);
                this.genereateKcvForm = this.createGenerateKcvForm();
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
            KeyTypeId: [this.generateKcv.KeyTypeId],
            KeyLengthTypeId: [this.generateKcv.KeyLengthTypeId],
            KeyUnderLmk: [this.generateKcv.KeyUnderLmk],
            HsmErrorCode: [this.generateKcv.HsmErrorCode],
            HsmErrorDescription: [this.generateKcv.HsmErrorDescription],
            KeyCheckValue: [this.generateKcv.KeyCheckValue],
        });
    }

    /**
     * GenerateKcvButton
     */
    GenerateKcvButton(): void {
        const data = this.genereateKcvForm.getRawValue();
        this.generateKcvService.GenerateKcv(data).then(() => {
            this.generateKcvService.onGenerateKcvChanged.next(data);
            this.keyCheckValue = this.generateKcvService.hsmkeyCheckValue;
            this.generateHsmErrorCode = this.generateKcvService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generateKcvService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.genereateKcvForm.reset();
    }
}
