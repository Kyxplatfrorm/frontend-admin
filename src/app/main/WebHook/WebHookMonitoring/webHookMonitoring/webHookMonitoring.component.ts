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
import { WebHookMonitoring } from "../webHookMonitorings/webHookMonitorings.model";
import {
    WebHookRunStatusEntity,
    TenantDefinitionEntity,
    WebHookTypeEntity,
} from "app/ui/webHookMonitoring";
import { WebHookMonitoringService } from "./webHookMonitoring.service";
import { WebHookMonitoringsService } from "../webHookMonitorings/webHookMonitorings.service";
import AddAlertWebHookMonitoring from "./addWebHookMonitoring";
import UpdateAlertWebHookMonitoring from "./updateWebHookMonitoring";

@Component({
    selector: "webHookMonitoring",
    templateUrl: "./webHookMonitoring.component.html",
    styleUrls: ["./webHookMonitoring.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class WebHookMonitoringComponent implements OnInit, OnDestroy {
    dialogRef: any;
    webHookMonitoring: WebHookMonitoring;
    pageType: string;
    webHookType: WebHookTypeEntity[];
    webHookRunStatus: WebHookRunStatusEntity[];
    tenant: TenantDefinitionEntity[];
    webHookMonitoringForm: FormGroup;
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
        private webHookMonitoringService: WebHookMonitoringService,
        private webHookMonitoringsService: WebHookMonitoringsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertWebHookMonitoring: AddAlertWebHookMonitoring,
        private updateAlertWebHookMonitoring: UpdateAlertWebHookMonitoring
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.webHookMonitoring = new WebHookMonitoring();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.webHookMonitoringsService.GetWebHookRunStatues().then(() => {
            this.webHookRunStatus =
                this.webHookMonitoringsService.webHookRunStatusApiResponse.ParameterList;
        });

        this.webHookMonitoringsService.GetTenants().then(() => {
            this.tenant =
                this.webHookMonitoringsService.tenantApiResponse.TenantDefinitionList;
        });

        this.webHookMonitoringsService.GetWebHookTypes().then(() => {
            this.webHookType =
                this.webHookMonitoringsService.webHookTypeApiResponse.ParameterList;
        });

        this.webHookMonitoringService.onWebHookMonitoringChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((webHookMonitoring) => {
                if (webHookMonitoring) {
                    this.webHookMonitoring = new WebHookMonitoring(
                        webHookMonitoring
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.webHookMonitoring = new WebHookMonitoring();
                }
                this.webHookMonitoringForm = this.createWebHookMonitoringForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createWebHookMonitoringForm
     *
     * @returns {FormGroup}
     */
    createWebHookMonitoringForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.webHookMonitoring.Id],
            WebHookProfileId: [this.webHookMonitoring.WebHookProfileId],
            CompanyId: [this.webHookMonitoring.CompanyId],
            TenantId: [this.webHookMonitoring.TenantId],
            WebHookTypeId: [this.webHookMonitoring.WebHookTypeId],
            RunStatusId: [this.webHookMonitoring.RunStatusId],
            HttpStatusCode: [this.webHookMonitoring.HttpStatusCode],
            RetryCount: [this.webHookMonitoring.RetryCount],
            ApplicationId: [this.webHookMonitoring.ApplicationId],
            MachineName: [this.webHookMonitoring.MachineName],
            HttpPostUrl: [this.webHookMonitoring.HttpPostUrl],
            ResultMessage: [this.webHookMonitoring.ResultMessage],
            RecordType: [this.webHookMonitoring.RecordType],
            ReferenceNumberType: [this.webHookMonitoring.ReferenceNumberType],
            ReferenceNumber: [this.webHookMonitoring.ReferenceNumber],
            WebHookPayLoad: [this.webHookMonitoring.WebHookPayLoad],
        });
    }

    /**
     * CreateWebHookMonitoring
     */
    CreateWebHookMonitoring(): void {
        const data = this.webHookMonitoringForm.getRawValue();
        this.webHookMonitoringService.CreateWebHookMonitoring(data).then(() => {
            this.webHookMonitoringService.onWebHookMonitoringChanged.next(data);
            this.router.navigate([
                "/WebHooks/WebHookMonitoring/webHookMonitoring",
            ]);
            this.addAlertWebHookMonitoring.AddAlertWebHookMonitoringShow();
            this.webHookMonitoringsService.GetWebHookMonitorings();
        });
    }

    /**
     * UpdateWebHookMonitoring
     */
    UpdateWebHookMonitoring(): void {
        const data = this.webHookMonitoringForm.getRawValue();
        this.webHookMonitoringService.UpdateWebHookMonitoring(data).then(() => {
            this.webHookMonitoringService.onWebHookMonitoringChanged.next(data);

            this.router.navigate([
                "/WebHooks/WebHookMonitoring/webHookMonitoring",
            ]);
            this.updateAlertWebHookMonitoring.UpdateAlertWebHookMonitoringShow();
            this.webHookMonitoringsService.GetWebHookMonitorings();
        });
    }
}
