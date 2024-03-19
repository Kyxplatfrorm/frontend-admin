import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { FraudApiDefinitionService } from "./fraudApiDefinition.service";
import { FraudApiDefinitionsService } from "../fraudApiDefinitions/fraudApiDefinitions.service";
import { SearchFraudApiDefinitionsService } from "../searchFraudApiDefinitions/searchFraudApiDefinitions.service";
import { FraudApi } from "../fraudApiDefinitions/fraudApiDefinitions.model";
import { ApplicationTypeEntity } from "app/ui/fraudApiDefinition";
import AddAlertFraudApiDefinition from "./addFraudApiDefinitionAlert";
import UpdateAlertFraudApiDefinition from "./updateFraudApiDefinitionAlert";

@Component({
    selector: "fraudApiDefinition",
    templateUrl: "./fraudApiDefinition.component.html",
    styleUrls: ["./fraudApiDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class FraudApiDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    fraudApi: FraudApi;
    pageType: string;
    applicationType: ApplicationTypeEntity[];
    fraudApiDefinitionForm: FormGroup;
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
        private fraudApiDefinitionsService: FraudApiDefinitionsService,
        private fraudApiDefinitionService: FraudApiDefinitionService,
        private searchFraudApiDefinitionsService: SearchFraudApiDefinitionsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addAlertFraudApiDefinition: AddAlertFraudApiDefinition,
        private updateAlertFraudApiDefinition: UpdateAlertFraudApiDefinition,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudApi = new FraudApi();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.fraudApiDefinitionsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.fraudApiDefinitionsService.applicationTypeApiResponse.ParameterList;
        });

        this.fraudApiDefinitionService.onFraudApiDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((fraudApi) => {
                if (fraudApi) {
                    this.fraudApi = new FraudApi(fraudApi);
                    this.pageType = "edit";
                } else {
                    this.fraudApi = new FraudApi({});
                    this.pageType = "new";
                }
                this.fraudApiDefinitionForm =
                    this.createFraudApiDefinitionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     *  createFraudApiDefinitionForm
     *
     * @returns {FormGroup}
     */
    createFraudApiDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.fraudApi.Id],
            HasFraudRule: [this.fraudApi.HasFraudRule],
            ApplicationTypeId: [this.fraudApi.ApplicationTypeId],
            ControllerName: [this.fraudApi.ControllerName],
            ActionName: [this.fraudApi.ActionName],
            Description: [this.fraudApi.Description],
            LogApiCallCounts: [this.fraudApi.LogApiCallCounts],
        });
    }

    /**
     * CreateFraudApiDefinition
     */
    CreateFraudApiDefinition(): void {
        const data = this.fraudApiDefinitionForm.getRawValue();
        this.fraudApiDefinitionService
            .CreateFraudApiDefinition(data)
            .then(() => {
                this.fraudApiDefinitionService.onFraudApiDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudApiDefinitions/searchFraudApiDefinitions",
                ]);
                this.searchFraudApiDefinitionsService
                    .SearchFraudApiDefinition(this.fraudApi)
                    .then(() => {
                        this.addAlertFraudApiDefinition.AddAlertFraudApiDefinitionShow();
                    });
            });
    }

    /**
     * UpdateFraudApiDefinition
     */
    UpdateFraudApiDefinition(): void {
        const data = this.fraudApiDefinitionForm.getRawValue();
        this.fraudApiDefinitionService
            .UpdateFraudApiDefinition(data)
            .then(() => {
                this.fraudApiDefinitionService.onFraudApiDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudApiDefinitions/searchFraudApiDefinitions",
                ]);
                this.searchFraudApiDefinitionsService.SearchFraudApiDefinition(
                    this.fraudApi
                );
                this.updateAlertFraudApiDefinition.UpdateAlertFraudApiDefinitionShow();
            });
    }

    onClearApplicaitonType(): void {
        this.fraudApiDefinitionForm.patchValue({
            ApplicationTypeId: 0,
        });
        this.fraudApi.ApplicationTypeId = 0;
    }
}
