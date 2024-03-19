import { FormBuilder, FormGroup } from "@angular/forms";
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
import { Tenant } from "./tenantDetail.model";
import { TenantDefinitionsService } from "../tenantDefinitions/tenantDefinitions.service";
import { TenantDetailService } from "./tenantDetail.service";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import AddAlertTenant from "./addAlertTenant";
import UpdateAlertTenant from "./updateAlertTenant";

@Component({
    selector: "tenantDetail",
    templateUrl: "./tenantDetail.component.html",
    styleUrls: ["./tenantDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TenantDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    tenant: Tenant;
    pageType: string;
    tenantDetailForm: FormGroup;
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
        private tenantdefinitionsservice: TenantDefinitionsService,
        private tenantdetailservice: TenantDetailService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertTenant: AddAlertTenant,
        private updateAlertTenant: UpdateAlertTenant
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.tenant = new Tenant();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantdetailservice.onTenantDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tenant) => {
                if (tenant) {
                    this.tenant = new Tenant(tenant);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.tenant = new Tenant();
                }
                this.tenantDetailForm = this.createTenantDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createTenantDetailForm
     *
     * @returns {FormGroup}
     */
    createTenantDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenant.Id],
            TenantName: [this.tenant.TenantName],
            TenantCode: [this.tenant.TenantCode],
            DefaultCurrencyCode: [this.tenant.DefaultCurrencyCode],
            TenantLogoUrl: [this.tenant.TenantLogoUrl],
        });
    }

    /**
     * updateTenant
     */
    UpdateTenant(): void {
        const data = this.tenantDetailForm.getRawValue();
        this.tenantdetailservice.UpdateTenant(data).then(() => {
            this.tenantdetailservice.onTenantDetailChanged.next(data);
            this.router.navigate(["Tenant/TenantDefinition/tenantDefinitions"]);
            this.updateAlertTenant.UpdateAlertTenantShow();

            this.tenantdefinitionsservice.GetTenants();
        });
    }

    /**
     * createTenant
     */
    CreateTenant(): void {
        const data = this.tenantDetailForm.getRawValue();
        this.tenantdetailservice.CreateTenant(data).then(() => {
            this.tenantdetailservice.onTenantDetailChanged.next(data);
            this.router.navigate(["Tenant/TenantDefinition/tenantDefinitions"]);
            this.addAlertTenant.AddAlertTenantShow();

            this.tenantdefinitionsservice.GetTenants();
        });
    }
}
