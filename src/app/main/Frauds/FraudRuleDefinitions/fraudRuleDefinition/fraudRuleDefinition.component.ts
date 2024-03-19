import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { FraudRule } from "../fraudRuleDefinitions/fraudRuleDefinitions.model";
import {
    FraudGroupDefinitionEntity,
    FraudRuleActionTypeEntity,
    FraudRuleCheckTimeTypeEntity,
    NotificationTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/fraudRuleDefinitions";
import { FraudRuleDefinitionsService } from "../fraudRuleDefinitions/fraudRuleDefinitions.service";
import { FraudRuleDefinitionService } from "./fraudRuleDefinition.service";
import { SearchFraudRuleDefinitionsService } from "../searchFraudRuleDefinitions/searchFraudRuleDefinitions.service";
import AddAlertFraudRuleDefinition from "./addFraudRuleDefinition";
import UpdateAlertFraudRuleDefinition from "./updateFraudRuleDefinition";
import FraudRuleApiRelationDataSource from "./fraudRuleApiRelation.datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FraudRuleApiRelationFormDialogComponent } from "./fraudRuleApiRelationForm/fraudRuleApiRelationForm.component";

@Component({
    selector: "fraudRuleDefinition",
    templateUrl: "./fraudRuleDefinition.component.html",
    styleUrls: ["./fraudRuleDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class FraudRuleDefinitionComponent implements OnInit, OnDestroy {
    fraudRuleApiRelationDataSource: FraudRuleApiRelationDataSource;
    dialogRef: any;
    fraudRule: FraudRule;
    pageType: string;
    fraudGroupDefinition: FraudGroupDefinitionEntity[];
    tenantDefinition: TenantDefinitionEntity[];
    fraudRuleActionType: FraudRuleActionTypeEntity[];
    fraudRuleCheckTimeType: FraudRuleCheckTimeTypeEntity[];
    notificationType: NotificationTypeEntity[];
    fraudRuleDefinitionForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    fraudRuleApiRelationPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    fraudRuleApiRelationSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    displayedColumns = [
        "Id",
        "FraudRuleName",
        "IsActive",
        "Priority",
        "Buttons",
    ];

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
        private fraudRuleDefinitionsService: FraudRuleDefinitionsService,
        private fraudRuleDefinitionService: FraudRuleDefinitionService,
        private searchFraudRuleDefinitionsService: SearchFraudRuleDefinitionsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addAlertFraudRuleDefinition: AddAlertFraudRuleDefinition,
        private updateAlertFraudRuleDefinition: UpdateAlertFraudRuleDefinition,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudRule = new FraudRule();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.fraudRuleDefinitionsService.GetFraudGroups().then(() => {
            this.fraudGroupDefinition =
                this.fraudRuleDefinitionsService.fraudGroupDefinitionApiResponse.FraudGroupDefinitionList;
        });

        this.fraudRuleDefinitionsService.GetTenants().then(() => {
            this.tenantDefinition =
                this.fraudRuleDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.fraudRuleDefinitionsService.GetFraudRuleActionTypes().then(() => {
            this.fraudRuleActionType =
                this.fraudRuleDefinitionsService.fraudRuleActionTypeApiResponse.ParameterList;
        });

        this.fraudRuleDefinitionsService
            .GetFraudRuleCheckTimeTypes()
            .then(() => {
                this.fraudRuleCheckTimeType =
                    this.fraudRuleDefinitionsService.fraudRuleCheckTimeTypeApiResponse.ParameterList;
            });

        this.fraudRuleDefinitionsService.GetNotificationTypes().then(() => {
            this.notificationType =
                this.fraudRuleDefinitionsService.notificationTypeApiResponse.ParameterList;
        });

        this.fraudRuleApiRelationDataSource =
            new FraudRuleApiRelationDataSource(
                this.fraudRuleDefinitionService,
                this.fraudRuleApiRelationPaginator,
                this.fraudRuleApiRelationSort
            );
        if (this.filter?.nativeElement) {
            fromEvent(this.filter.nativeElement, "keyup")
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    debounceTime(150),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    if (!this.fraudRuleApiRelationDataSource) {
                        return;
                    }
                    this.fraudRuleApiRelationDataSource.filter =
                        this.filter.nativeElement.value;
                });
        }

        this.fraudRuleDefinitionService.onFraudRuleDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((fraudRule) => {
                if (fraudRule) {
                    this.fraudRule = new FraudRule(fraudRule);
                    this.pageType = "edit";
                    this.fraudRuleDefinitionService.fraudRuleApiRelation =
                        fraudRule.FraudRuleApiRelation;
                } else {
                    this.pageType = "new";
                    this.fraudRuleDefinitionService.fraudRuleApiRelation =
                        fraudRule.FraudRuleApiRelation;
                }
                this.fraudRuleDefinitionForm =
                    this.createFraudRuleDefinitionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshFraudRuleApiRelationDataSource(): void {
        this.fraudRuleApiRelationDataSource =
            new FraudRuleApiRelationDataSource(
                this.fraudRuleDefinitionService,
                this.fraudRuleApiRelationPaginator,
                this.fraudRuleApiRelationSort
            );
    }

    /**
     *  createFraudRuleDefinitionForm
     *
     * @returns {FormGroup}
     */
    createFraudRuleDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.fraudRule.Id],
            TenantId: [this.fraudRule.TenantId],
            Description: [this.fraudRule.Description],
            IsBuiltInDefinition: [this.fraudRule.IsBuiltInDefinition],
            IsActive: [this.fraudRule.IsActive],
            FraudGroupId: [this.fraudRule.FraudGroupId],
            HasFraudQuery: [this.fraudRule.HasFraudQuery],
            FraudQuery: [this.fraudRule.FraudQuery],
            FraudRuleActionTypeId: [this.fraudRule.FraudRuleActionTypeId],
            FraudRuleCheckTimeTypeId: [this.fraudRule.FraudRuleCheckTimeTypeId],
            FraudRuleCheckTime: [this.fraudRule.FraudRuleCheckTime],
            FraudRuleCheckCount: [this.fraudRule.FraudRuleCheckCount],
            FraudRuleCheckAmount: [this.fraudRule.FraudRuleCheckAmount],
            LogFraudRule: [this.fraudRule.LogFraudRule],
            ErrorCode: [this.fraudRule.ErrorCode],
            ErrorDescription: [this.fraudRule.ErrorDescription],
            SendNotification: [this.fraudRule.SendNotification],
            NotificationTypeId: [this.fraudRule.NotificationTypeId],
            NotificationTemplateCode: [this.fraudRule.NotificationTemplateCode],
        });
    }

    /**
     * CreateFraudRuleDefinition
     */
    CreateFraudRuleDefinition(): void {
        const data = this.fraudRuleDefinitionForm.getRawValue();
        this.fraudRuleDefinitionService
            .CreateFraudRuleDefinition(data)
            .then(() => {
                this.fraudRuleDefinitionService.onFraudRuleDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudRuleDefinitions/searchFraudRuleDefinitions",
                ]);
                this.searchFraudRuleDefinitionsService
                    .SearchFraudRuleDefinition(this.fraudRule)
                    .then(() => {
                        this.addAlertFraudRuleDefinition.AddAlertFraudRuleDefinitionShow();
                    });
            });
    }

    /**
     * UpdateFraudRuleDefinition
     */
    UpdateFraudRuleDefinition(): void {
        const data = this.fraudRuleDefinitionForm.getRawValue();
        this.fraudRuleDefinitionService
            .UpdateFraudRuleDefinition(data)
            .then(() => {
                this.fraudRuleDefinitionService.onFraudRuleDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Frauds/FraudRuleDefinitions/searchFraudRuleDefinitions",
                ]);
                this.searchFraudRuleDefinitionsService.SearchFraudRuleDefinition(
                    this.fraudRule
                );
                this.updateAlertFraudRuleDefinition.UpdateAlertFraudRuleDefinitionShow();
            });
    }

    onClearFraudRuleActionType(): void {
        this.fraudRuleDefinitionForm.patchValue({
            FraudRuleActionTypeId: 0,
        });
        this.fraudRule.FraudRuleActionTypeId = 0;
    }

    onClearFraudRuleCheckTimeType(): void {
        this.fraudRuleDefinitionForm.patchValue({
            FraudRuleCheckTimeTypeId: 0,
        });
        this.fraudRule.FraudRuleCheckTimeTypeId = 0;
    }

    onClearFraudGroup(): void {
        this.fraudRuleDefinitionForm.patchValue({
            FraudGroupId: 0,
        });
        this.fraudRule.FraudGroupId = 0;
    }

    onClearTenant(): void {
        this.fraudRuleDefinitionForm.patchValue({
            TenantId: 0,
        });
        this.fraudRule.TenantId = 0;
    }

    onClearNotificationType(): void {
        this.fraudRuleDefinitionForm.patchValue({
            NotificationTypeId: 0,
        });
        this.fraudRule.NotificationTypeId = 0;
    }

    /**
     * FraudRuleApiRelationForm
     */
    FraudRuleApiRelationForm(): void {
        this.dialogRef = this._matDialog.open(
            FraudRuleApiRelationFormDialogComponent,
            {
                panelClass: "fraudRuleApiRelationForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var fraudRuleApiRelationRequest = response.getRawValue();
            this.fraudRuleDefinitionService
                .CreateFraudRuleApiRelation(fraudRuleApiRelationRequest)
                .then(() => {
                    this.fraudRuleDefinitionService
                        .GetFraudRuleDefinition()
                        .then(() => {
                            this.refreshFraudRuleApiRelationDataSource();
                        });
                });
        });
    }

    /**
     * EditSchedulerJob
     *
     * @param fraudRule
     */
    EditFraudRuleApiRelation(fraudRule): void {
        this.dialogRef = this._matDialog.open(
            FraudRuleApiRelationFormDialogComponent,
            {
                panelClass: "fraudRuleApiRelationForm-dialog",
                data: {
                    fraudRule: fraudRule,
                    action: "edit",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var fraudRuleApiRelationRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.fraudRuleDefinitionService
                        .UpdateFraudRuleApiRelation(fraudRuleApiRelationRequest)
                        .then(() => {
                            this.fraudRuleDefinitionService
                                .GetFraudRuleDefinition()
                                .then(() => {
                                    this.refreshFraudRuleApiRelationDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteFraudRuleApiRelation
                 */
                case "delete":
                    this.DeleteFraudRuleApiRelation(fraudRule);
                    break;
            }
        });
    }

    /**
     * DeleteFraudRuleApiRelation
     */
    DeleteFraudRuleApiRelation(fraudRule): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.fraudRuleDefinitionService
                    .DeleteFraudRuleApiRelation(fraudRule)
                    .then(() => {
                        this.fraudRuleDefinitionService
                            .GetFraudRuleDefinition()
                            .then(() => {
                                this.refreshFraudRuleApiRelationDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
