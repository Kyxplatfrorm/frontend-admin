import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Occupation } from "./occupationDetail.model";
import { OccupationDetailService } from "./occupationDetail.service";
import { OccupationDefinitionsService } from "../occupationDefinitions/occupationDefinitions.service";
import AddAlertOccupation from "./addOccupation";
import UpdateAlertOccupation from "./updateOccupation";

@Component({
    selector: "occupationDetail",
    templateUrl: "./occupationDetail.component.html",
    styleUrls: ["./occupationDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class OccupationDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    occupation: Occupation;
    pageType: string;
    occupationDetailForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private occupationdefinitionsservice: OccupationDefinitionsService,
        private occupationdetailservice: OccupationDetailService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private addAlertOccupation: AddAlertOccupation,
        private updateAlertOccupation: UpdateAlertOccupation
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.occupation = new Occupation();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.occupationdetailservice.onOccupationDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((occupation) => {
                if (occupation) {
                    this.occupation = new Occupation(occupation);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.occupation = new Occupation();
                }
                this.occupationDetailForm = this.createOccupationDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createOccupationDetailForm
     *
     * @returns {FormGroup}
     */
    createOccupationDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.occupation.Id],
            Description: [this.occupation.Description],
            OccupationCode: [this.occupation.OccupationCode],
        });
    }

    /**
     * UpdateOccupation
     */
    updateOccupation(): void {
        const data = this.occupationDetailForm.getRawValue();
        this.occupationdetailservice.updateOccupation(data).then(() => {
            this.occupationdetailservice.onOccupationDetailChanged.next(data);
            this.router.navigate([
                "Parameters/OccupationDefinitions/occupationDefinitions",
            ]);
            this.updateAlertOccupation.UpdateAlertOccupationShow();
            this.occupationdefinitionsservice.getOccupations();
        });
    }

    /**
     * CreateOccupation
     */
    createOccupation(): void {
        const data = this.occupationDetailForm.getRawValue();
        this.occupationdetailservice.createOccupation(data).then(() => {
            this.occupationdetailservice.onOccupationDetailChanged.next(data);
            this.router.navigate([
                "Parameters/OccupationDefinitions/occupationDefinitions",
            ]);
            this.addAlertOccupation.AddAlertOccupationShow();
            this.occupationdefinitionsservice.getOccupations();
        });
    }
}
