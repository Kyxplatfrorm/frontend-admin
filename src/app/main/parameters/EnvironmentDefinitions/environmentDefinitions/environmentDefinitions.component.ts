import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { TenantDefinitionsService } from "app/main/Tenant/TenantDefinitions/tenantDefinitions/tenantDefinitions.service";
import { EnvironmentDefinition } from "./environmentDefinitions.model";
import {
    EnvironmentDefinitionEntity,
    EnvironmentTypeEntity,
} from "app/ui/environmentDefinition";
import { EnvironmentDefinitionsService } from "./environmentDefinitions.service";
import UpdateAlertEnvironmentDefinition from "./updateEnvironmentDefinitionAlert";

@Component({
    selector: "environmentDefinitions",
    templateUrl: "./environmentDefinitions.component.html",
    styleUrls: ["./environmentDefinitions.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class EnvironmentDefinitionsComponent implements OnInit, OnDestroy {
    dialogRef: any;
    environmentDefinition: EnvironmentDefinition;
    pageType: string;
    environmentType: EnvironmentTypeEntity[];
    environmentDefinitionEntity: EnvironmentDefinitionEntity[];
    environmentDefinitionsForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    routeParams: any;

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
        private environmentDefinitionsService: EnvironmentDefinitionsService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        _router: ActivatedRoute,
        private updateAlertEnvironmentDefinition: UpdateAlertEnvironmentDefinition
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.environmentDefinition = new EnvironmentDefinition();
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.environmentDefinitionsService.GetEnvironmentType().then(() => {
            this.environmentType =
                this.environmentDefinitionsService.environmentTypeApiResponse.ParameterList;
        });

        this.environmentDefinitionsService
            .GetEnvironmentDefinitions()
            .then(() => {
                this.environmentDefinitionEntity =
                    this.environmentDefinitionsService.environmentDefinitionApiResponse.EnvironmentDefinition;
            });

        this.environmentDefinitionsService.onEnvironmentDefinitionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((environmentDefinition) => {
                this.environmentDefinition = new EnvironmentDefinition(
                    environmentDefinition
                );
                this.environmentDefinitionsForm =
                    this.createEnvironmentDefinitionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createEnvironmentDefinitionForm
     *
     * @returns {FormGroup}
     */
    createEnvironmentDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.environmentDefinition.Id],
            EnvironmentTypeId: [this.environmentDefinition.EnvironmentTypeId],
            IsProduction: [this.environmentDefinition.IsProduction],
            Description: [this.environmentDefinition.Description],
        });
    }

    /**
     * UpdateEnvironmentDefinition
     */
    UpdateEnvironmentDefinition(): void {
        const data = this.environmentDefinitionsForm.getRawValue();
        this.environmentDefinitionsService
            .UpdateEnvironmentDefinition(data)
            .then(() => {
                this.environmentDefinitionsService.onEnvironmentDefinitionsChanged.next(
                    data
                );
                this.router.navigate([
                    "/Parameters/EnvironmentDefinitions/environmentDefinitions",
                ]);
                this.updateAlertEnvironmentDefinition.UpdateAlertEnvironmentDefinitionShow();
                this.environmentDefinitionsService.GetEnvironmentDefinitions();
            });
    }
}
