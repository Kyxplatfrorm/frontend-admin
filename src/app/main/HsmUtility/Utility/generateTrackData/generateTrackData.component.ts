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
import { GenerateTrackData } from "./generateTrackData.model";
import { GenerateTrackDataService } from "./generateTrackData.service";

@Component({
    selector: "generateTrackData",
    templateUrl: "./generateTrackData.component.html",
    styleUrls: ["./generateTrackData.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenerateTrackDataComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    generateTrackData: GenerateTrackData;
    pageType: string;
    visible: boolean = false;
    generateTrackDataForm: FormGroup;
    hsmTrack1: string;
    hsmTrack2: string;
    hsmTrack2Chip: string;
    hsmCvv: string;
    hsmICvv: string;
    hsmCvv2: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private generateTrackDataService: GenerateTrackDataService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.generateTrackDataService.onGenerateTrackDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((generateTrackData) => {
                this.generateTrackData = new GenerateTrackData(
                    generateTrackData
                );
                this.generateTrackDataForm = this.createGenerateTrackDataForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createGenerateTrackDataForm
     *
     * @returns {FormGroup}
     */
    createGenerateTrackDataForm(): FormGroup {
        return this._formBuilder.group({
            CvkUnderLmk: [this.generateTrackData.CvkUnderLmk],
            CardNumber: [this.generateTrackData.CardNumber],
            HsmErrorCode: [this.generateTrackData.HsmErrorCode],
            HsmErrorDescription: [this.generateTrackData.HsmErrorDescription],
            ExpiryDateYYMM: [this.generateTrackData.ExpiryDateYYMM],
            ServiceCode: [this.generateTrackData.ServiceCode],
            EmbossName: [this.generateTrackData.EmbossName],
            Pvv: [this.generateTrackData.Pvv],
            PvvKeyIndex: [this.generateTrackData.PvvKeyIndex],
            CvvOffset: [this.generateTrackData.CvvOffset],
            Track1: [this.generateTrackData.Track1],
            Track2: [this.generateTrackData.Track2],
            Track2Chip: [this.generateTrackData.Track2Chip],
            Cvv: [this.generateTrackData.Cvv],
            ICvv: [this.generateTrackData.ICvv],
            Cvv2: [this.generateTrackData.Cvv2],
        });
    }

    /**
     * GenerateTrackDataButton
     */
    GenerateTrackDataButton(): void {
        const data = this.generateTrackDataForm.getRawValue();
        this.generateTrackDataService.GenerateTrackData(data).then(() => {
            this.generateTrackDataService.onGenerateTrackDataChanged.next(data);
            this.hsmTrack1 = this.generateTrackDataService.track1;
            this.hsmTrack2 = this.generateTrackDataService.track2;
            this.hsmTrack2Chip = this.generateTrackDataService.track2Chip;
            this.hsmCvv = this.generateTrackDataService.cvv;
            this.hsmICvv = this.generateTrackDataService.ıCvv;
            this.hsmCvv2 = this.generateTrackDataService.cvv2;
            this.generateHsmErrorCode =
                this.generateTrackDataService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.generateTrackDataService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.generateTrackDataForm.reset();
    }
}
