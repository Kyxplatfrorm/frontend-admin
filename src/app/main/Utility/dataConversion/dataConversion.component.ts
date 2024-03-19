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
import { DataConversionTypeEntity } from "app/ui/utility";
import { DataConversion } from "./dataConversion.model";
import { DataConversionService } from "./dataConversion.service";

@Component({
    selector: "dataConversion",
    templateUrl: "./dataConversion.component.html",
    styleUrls: ["./dataConversion.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class DataConversionComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    dataConversion: DataConversion;
    pageType: string;
    visible: boolean = false;
    dataConversionForm: FormGroup;
    dataConversionResult: string;
    dataConversionList: DataConversionTypeEntity[];

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private dataConversionService: DataConversionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataConversionService.GetDataConversionTypes().then(() => {
            this.dataConversionList =
                this.dataConversionService.dataConversionTypeApiResponse.ParameterList;
        });

        this.dataConversionService.onDataConversionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((dataConversion) => {
                this.dataConversion = new DataConversion(dataConversion);
                this.dataConversionForm = this.createDataConversionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createDataConversionForm
     *
     * @returns {FormGroup}
     */
    createDataConversionForm(): FormGroup {
        return this._formBuilder.group({
            DataConversionTypeId: [this.dataConversion.DataConversionTypeId],
            Data: [this.dataConversion.Data],
            Result: [this.dataConversion.Result],
        });
    }

    /**
     * DataConversionButton
     */
    DataConversionButton(): void {
        const data = this.dataConversionForm.getRawValue();
        this.dataConversionService.DataConversion(data).then(() => {
            this.dataConversionService.onDataConversionChanged.next(data);
            this.dataConversionResult = this.dataConversionService.result;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.dataConversionForm.reset();
    }
}
