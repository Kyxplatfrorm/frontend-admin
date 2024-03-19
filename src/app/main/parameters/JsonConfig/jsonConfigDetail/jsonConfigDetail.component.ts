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
import { JsonConfig } from "../jsonConfigs/jsonConfigs.model";
import { JsonConfigDetailService } from "./jsonConfigDetail.service";
import { JsonConfigsService } from "../jsonConfigs/jsonConfigs.service";
import { TenantDefinitionEntity } from "app/ui/tenant";
import AddAlertJson from "./addJson";
import UpdateAlertJson from "./updateJson";
import { TenantDefinitionsService } from "app/main/Tenant/TenantDefinitions/tenantDefinitions/tenantDefinitions.service";

@Component({
    selector: "jsonConfigDetail",
    templateUrl: "./jsonConfigDetail.component.html",
    styleUrls: ["./jsonConfigDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class JsonConfigDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    jsonConfig: JsonConfig;
    pageType: string;
    tenantList: TenantDefinitionEntity[];
    jsonConfigDetailForm: FormGroup;
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
        private jsonConfigsService: JsonConfigsService,
        private jsonConfigDetailservice: JsonConfigDetailService,
        private tenantservice: TenantDefinitionsService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        _router: ActivatedRoute,
        private addAlertJson: AddAlertJson,
        private updateAlertJson: UpdateAlertJson
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.jsonConfig = new JsonConfig();
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.jsonConfigsService.GetTenants().then(() => {
            this.tenantList =
                this.jsonConfigsService.tenantDefApiResponse.TenantDefinitionList;
        });

        this.jsonConfigDetailservice.onJsonConfigDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((jsonConfig) => {
                if (jsonConfig) {
                    this.jsonConfig = new JsonConfig(jsonConfig);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.jsonConfig = new JsonConfig();
                }
                this.jsonConfigDetailForm = this.createJsonConfigDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createJsonConfigDetailForm
     *
     * @returns {FormGroup}
     */
    createJsonConfigDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.jsonConfig.Id],
            TenantId: [this.jsonConfig.TenantId],
            ConfigCode: [this.jsonConfig.ConfigCode],
            Description: [this.jsonConfig.Description],
            ConfigValue: [this.jsonConfig.ConfigValue],
        });
    }

    /**
     * UpdateJsonConfigDetail
     */
    UpdateJsonConfigDetail(): void {
        const data = this.jsonConfigDetailForm.getRawValue();
        this.jsonConfigDetailservice.UpdateJsonConfigDetail(data).then(() => {
            this.jsonConfigDetailservice.onJsonConfigDetailChanged.next(data);
            this.router.navigate(["/Parameters/JsonConfig/jsonConfigs"]);
            this.updateAlertJson.UpdateAlertJsonShow();
            this.jsonConfigsService.GetJsonConfigs();
        });
    }

    /**
     * CreateJsonConfigDetail
     */
    CreateJsonConfigDetail(): void {
        const data = this.jsonConfigDetailForm.getRawValue();
        this.jsonConfigDetailservice.CreateJsonConfigDetail(data).then(() => {
            this.jsonConfigDetailservice.onJsonConfigDetailChanged.next(data);
            this.router.navigate(["/Parameters/JsonConfig/jsonConfigs"]);
            this.addAlertJson.AddAlertJsonShow();
            this.jsonConfigsService.GetJsonConfigs();
        });
    }
}
