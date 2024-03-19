import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ApplicationUrl } from "../applicationUrlDefinitions/applicationUrlDefinitions.model";
import {
    ApplicationTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/urlDefinition";
import AddAlertApplicationUrlDefinition from "./addApplicationUrlDefinitionAlert";
import UpdateAlertApplicationUrlDefinition from "./updateApplicationUrlDefinitionAlert";
import { ApplicationUrlDefinitionsService } from "../applicationUrlDefinitions/applicationUrlDefinitions.service";
import { ApplicationUrlDefinitionService } from "./applicationUrlDefinition.service";
import { SearchApiUserDefinitionService } from "app/main/ApiUser/ApiUserDefinition/searchApiUserDefinition/searchApiUserDefinition.service";
import { SearchApplicationUrlDefinitionsService } from "../searchApplicationUrlDefinitions/searchApplicationUrlDefinitions.service";

@Component({
    selector: "applicationUrlDefinition",
    templateUrl: "./applicationUrlDefinition.component.html",
    styleUrls: ["./applicationUrlDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApplicationUrlDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    applicationUrl: ApplicationUrl;
    pageType: string;
    applicationType: ApplicationTypeEntity[];
    tenant: TenantDefinitionEntity[];
    applicationUrlDefinitionForm: FormGroup;
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
        private applicationUrlDefinitionsService: ApplicationUrlDefinitionsService,
        private applicationUrlDefinitionService: ApplicationUrlDefinitionService,
        private searchApplicationUrlDefinitionService: SearchApplicationUrlDefinitionsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addAlertApplicationUrlDefinition: AddAlertApplicationUrlDefinition,
        private updateAlertApplicationUrlDefinition: UpdateAlertApplicationUrlDefinition,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.applicationUrl = new ApplicationUrl();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.applicationUrlDefinitionsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.applicationUrlDefinitionsService.applicationTypeApiResponse.ParameterList;
        });

        this.applicationUrlDefinitionsService.GetTenants().then(() => {
            this.tenant =
                this.applicationUrlDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.applicationUrlDefinitionService.onApplicationUrlDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((applicationUrl) => {
                if (applicationUrl) {
                    this.applicationUrl = new ApplicationUrl(applicationUrl);
                    this.pageType = "edit";
                } else {
                    this.applicationUrl = new ApplicationUrl({});
                    this.pageType = "new";
                }
                this.applicationUrlDefinitionForm =
                    this.createApplicationUrlDefinitionForm();
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
     *  createApplicationUrlDefinitionForm
     *
     * @returns {FormGroup}
     */
    createApplicationUrlDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.applicationUrl.Id],
            IsDefaultDefinition: [this.applicationUrl.IsDefaultDefinition],
            ApplicationTypeId: [this.applicationUrl.ApplicationTypeId],
            TenantId: [this.applicationUrl.TenantId],
            Url: [this.applicationUrl.Url],
            Description: [this.applicationUrl.Description],
        });
    }

    /**
     * CreateApplicationUrlDefinition
     */
    CreateApplicationUrlDefinition(): void {
        const data = this.applicationUrlDefinitionForm.getRawValue();
        this.applicationUrlDefinitionService
            .CreateApplicationUrlDefinition(data)
            .then(() => {
                this.applicationUrlDefinitionService.onApplicationUrlDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Parameters/ApplicationUrlDefinitions/searchApplicationUrlDefinitions",
                ]);
                this.searchApplicationUrlDefinitionService
                    .SearchApplicationUrlDefinition(this.applicationUrl)
                    .then(() => {
                        this.addAlertApplicationUrlDefinition.AddAlertApplicationUrlDefinitionShow();
                    });
            });
    }

    /**
     * UpdateApplicationUrlDefinition
     */
    UpdateApplicationUrlDefinition(): void {
        const data = this.applicationUrlDefinitionForm.getRawValue();
        this.applicationUrlDefinitionService
            .UpdateApplicationUrlDefinition(data)
            .then(() => {
                this.applicationUrlDefinitionService.onApplicationUrlDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Parameters/ApplicationUrlDefinitions/searchApplicationUrlDefinitions",
                ]);
                this.searchApplicationUrlDefinitionService.SearchApplicationUrlDefinition(
                    this.applicationUrl
                );
                this.updateAlertApplicationUrlDefinition.UpdateAlertApplicationUrlDefinitionShow();
            });
    }
}
