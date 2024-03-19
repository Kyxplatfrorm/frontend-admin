import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { FraudGroupDefinitionService } from "./fraudGroupDefinition.service";
import { FraudGroup } from "../fraudGroupDefinitions/fraudGroupDefinitions.model";
import UpdateAlertFraudGroupDefinition from "./updateFraudGroupDefinition";
import AddAlertFraudGroupDefinition from "./addFraudGroupDefinition";

@Component({
    selector: "fraudGroupDefinition",
    templateUrl: "./fraudGroupDefinition.component.html",
    styleUrls: ["./fraudGroupDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class FraudGroupDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    fraudGroup: FraudGroup;
    pageType: string;
    fraudGroupDefinitionForm: FormGroup;
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
        private fraudGroupDefinitionService: FraudGroupDefinitionService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertFraudGroupDefinition: AddAlertFraudGroupDefinition,
        private updateAlertFraudGroupDefinition: UpdateAlertFraudGroupDefinition
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudGroup = new FraudGroup();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.fraudGroupDefinitionService.onFraudGroupDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((fraudGroup) => {
                if (fraudGroup) {
                    this.fraudGroup = new FraudGroup(fraudGroup);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.fraudGroup = new FraudGroup();
                }
                this.fraudGroupDefinitionForm =
                    this.createFraudGroupDefinitionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createFraudGroupDefinitionForm
     *
     * @returns {FormGroup}
     */
    createFraudGroupDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.fraudGroup.Id],
            IsBuiltInDefinition: [this.fraudGroup.IsBuiltInDefinition],
            Description: [this.fraudGroup.Description],
        });
    }

    /**
     * CreateFraudGroupDefinition
     */
    CreateFraudGroupDefinition(): void {
        const data = this.fraudGroupDefinitionForm.getRawValue();
        this.fraudGroupDefinitionService
            .CreateFraudGroupDefinition(data)
            .then(() => {
                this.fraudGroupDefinitionService.onFraudGroupDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudGroupDefinitions/fraudGroupDefinitions",
                ]);
                this.addAlertFraudGroupDefinition.AddAlertFraudGroupDefinitionShow();
            });
    }

    /**
     * UpdateFraudGroupDefinition
     */
    UpdateFraudGroupDefinition(): void {
        const data = this.fraudGroupDefinitionForm.getRawValue();
        this.fraudGroupDefinitionService
            .UpdateFraudGroupDefinition(data)
            .then(() => {
                this.fraudGroupDefinitionService.onFraudGroupDefinitionChanged.next(
                    data
                );

                this.router.navigate([
                    "/Frauds/FraudGroupDefinitions/fraudGroupDefinitions",
                ]);
                this.updateAlertFraudGroupDefinition.UpdateAlertFraudGroupDefinitionsShow();
            });
    }
}
