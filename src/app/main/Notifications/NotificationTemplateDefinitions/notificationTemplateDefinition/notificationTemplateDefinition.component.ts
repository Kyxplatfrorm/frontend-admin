import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
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
import { NotificationTemplate } from "../notificationTemplateDefinitions/notificationTemplateDefinitions.model";
import {
    LanguageCodeEntity,
    NotificationTypeEntity,
    TemplateTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/notificationTemplateDefinition";
import { NotificationTemplateDefinitionsService } from "../notificationTemplateDefinitions/notificationTemplateDefinitions.service";
import { NotificationTemplateDefinitionService } from "./notificationTemplateDefinition.service";
import { SearchNotificationTemplateDefinitionService } from "../searchNotificationTemplateDefinition/searchNotificationTemplateDefinition.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import AddAlertNotificationTemplate from "./addNotificationTemplateAlert";
import UpdateAlertNotificationTemplate from "./updateNotificationTemplateAlert";

@Component({
    selector: "notificationTemplateDefinition",
    templateUrl: "./notificationTemplateDefinition.component.html",
    styleUrls: ["./notificationTemplateDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class NotificationTemplateDefinitionComponent
    implements OnInit, OnDestroy
{
    dialogRef: any;
    notificationTemplate: NotificationTemplate;
    pageType: string;
    languageCode: LanguageCodeEntity[];
    templateType: TemplateTypeEntity[];
    notificationType: NotificationTypeEntity[];
    tenant: TenantDefinitionEntity[];
    notificationTemplateDefinitionForm: FormGroup;
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
        private notificationTemplateDefinitionService: NotificationTemplateDefinitionService,
        private notificationTemplateDefinitionsService: NotificationTemplateDefinitionsService,
        private searchNotificationTemplateDefinitionService: SearchNotificationTemplateDefinitionService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addAlertNotificationTemplate: AddAlertNotificationTemplate,
        private updateAlertNotificationTemplate: UpdateAlertNotificationTemplate,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.notificationTemplate = new NotificationTemplate();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.notificationTemplateDefinitionsService
            .GetLanguageCodes()
            .then(() => {
                this.languageCode =
                    this.notificationTemplateDefinitionsService.languageCodeApiResponse.ParameterList;
            });

        this.notificationTemplateDefinitionsService
            .GetNotificationTypes()
            .then(() => {
                this.notificationType =
                    this.notificationTemplateDefinitionsService.notificationTypeApiResponse.ParameterList;
            });

        this.notificationTemplateDefinitionsService.GetTenants().then(() => {
            this.tenant =
                this.notificationTemplateDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });

        this.notificationTemplateDefinitionService.onNotificationTemplateDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notificationTemplate) => {
                if (notificationTemplate) {
                    this.notificationTemplate = new NotificationTemplate(
                        notificationTemplate
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.notificationTemplate = new NotificationTemplate();
                }
                this.notificationTemplateDefinitionForm =
                    this.createNotificationTemplateDefinitionForm();
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
     *  createNotificationTemplateDefinitionForm
     *
     * @returns {FormGroup}
     */
    createNotificationTemplateDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.notificationTemplate.Id],
            CompanyId: [this.notificationTemplate.CompanyId],
            TenantId: [this.notificationTemplate.TenantId],
            IsDefaultTemplate: [this.notificationTemplate.IsDefaultTemplate],
            IsCompanyTemplate: [this.notificationTemplate.IsCompanyTemplate],
            TemplateCode: [this.notificationTemplate.TemplateCode],
            LanguageCodeId: [this.notificationTemplate.LanguageCodeId],
            TemplateTypeId: [this.notificationTemplate.TemplateTypeId],
            Subject: [this.notificationTemplate.Subject],
            Content: [this.notificationTemplate.Content],
            ExpirySecondCount: [this.notificationTemplate.ExpirySecondCount],
            IsEncrypted: [this.notificationTemplate.IsEncrypted],
            HasExpiryDateTime: [this.notificationTemplate.HasExpiryDateTime],
            ExpiryDateTime: [this.notificationTemplate.ExpiryDateTime],
        });
    }

    /**
     * CreateNotificationTemplateDefinition
     */
    CreateNotificationTemplateDefinition(): void {
        const data = this.notificationTemplateDefinitionForm.getRawValue();
        this.notificationTemplateDefinitionService
            .CreateNotificationTemplateDefinition(data)
            .then(() => {
                this.notificationTemplateDefinitionService.onNotificationTemplateDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Notifications/NotificationTemplateDefinitions/searchNotificationTemplateDefinition",
                ]);
                this.searchNotificationTemplateDefinitionService.SearchNotificationTemplateDefinition(
                    this.notificationTemplate
                );
                this.addAlertNotificationTemplate.AddAlertNotificationTemplateShow();
            });
    }

    /**
     * UpdateNotificationTemplateDefinition
     */
    UpdateNotificationTemplateDefinition(): void {
        const data = this.notificationTemplateDefinitionForm.getRawValue();
        this.notificationTemplateDefinitionService
            .UpdateNotificationTemplateDefinition(data)
            .then(() => {
                this.notificationTemplateDefinitionService.onNotificationTemplateDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/Notifications/NotificationTemplateDefinitions/searchNotificationTemplateDefinition",
                ]);
                this.searchNotificationTemplateDefinitionService.SearchNotificationTemplateDefinition(
                    this.notificationTemplate
                );
                this.updateAlertNotificationTemplate.UpdateAlertNotificationTemplateShow();
            });
    }

    onExpiryDateTimeChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );
        this.notificationTemplate.ExpiryDateTime = utcDate;
        const expiryDateTime = new Date(
            this.notificationTemplate.ExpiryDateTime
        );
        const expiryDateTimeString = expiryDateTime.toISOString();
    }

    onClearTenant(): void {
        this.notificationTemplateDefinitionForm.patchValue({
            TenantId: 0,
        });
        this.notificationTemplate.TenantId = 0;
    }
}
