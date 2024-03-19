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
import { NotificationMonitoring } from "../notificationMonitorings/notificationMonitorings.model";
import {
    LanguageCodeEntity,
    NotificationTemplateEntity,
    NotificationTypeEntity,
    SentStatusEntity,
} from "app/ui/notificationMonitoring";
import { NotificationMonitoringService } from "./notificationMonitoring.service";
import AddAlertNotificationMonitoring from "./addNotificationMonitoring";
import UpdateAlertNotificationMonitoring from "./updateNotificationMonitoring";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { NotificationMonitoringsService } from "../notificationMonitorings/notificationMonitorings.service";

@Component({
    selector: "notificationMonitoring",
    templateUrl: "./notificationMonitoring.component.html",
    styleUrls: ["./notificationMonitoring.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class NotificationMonitoringComponent implements OnInit, OnDestroy {
    dialogRef: any;
    notificationMonitoring: NotificationMonitoring;
    pageType: string;
    notificationType: NotificationTypeEntity[];
    languageCode: LanguageCodeEntity[];
    sentStatus: SentStatusEntity[];
    notificationTemplate: NotificationTemplateEntity[];
    notificationMonitoringForm: FormGroup;
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
        private notificationMonitoringService: NotificationMonitoringService,
        private notificationMonitoringsService: NotificationMonitoringsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertNotificationMonitoring: AddAlertNotificationMonitoring,
        private updateAlertNotificationMonitoring: UpdateAlertNotificationMonitoring
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.notificationMonitoring = new NotificationMonitoring();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.notificationMonitoringsService.GetLanguageCodes().then(() => {
            this.languageCode =
                this.notificationMonitoringsService.languageCodeApiResponse.ParameterList;
        });

        this.notificationMonitoringsService
            .GetNotificationTemplates()
            .then(() => {
                this.notificationTemplate =
                    this.notificationMonitoringsService.notificationTemplateApiResponse.ParameterList;
            });

        this.notificationMonitoringsService.GetNotificationTypes().then(() => {
            this.notificationType =
                this.notificationMonitoringsService.notificationTypeApiResponse.ParameterList;
        });

        this.notificationMonitoringsService
            .GetNotificationSentStatus()
            .then(() => {
                this.sentStatus =
                    this.notificationMonitoringsService.sentStatusApiResponse.ParameterList;
            });

        this.notificationMonitoringService.onNotificationMonitoringChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notificationMonitoring) => {
                if (notificationMonitoring) {
                    this.notificationMonitoring = new NotificationMonitoring(
                        notificationMonitoring
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.notificationMonitoring = new NotificationMonitoring();
                }
                this.notificationMonitoringForm =
                    this.createNotificationMonitoringForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createNotificationMonitoringForm
     *
     * @returns {FormGroup}
     */
    createNotificationMonitoringForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.notificationMonitoring.Id],
            CustomerName: [this.notificationMonitoring.CustomerName],
            CompanyId: [this.notificationMonitoring.CompanyId],
            SessionId: [this.notificationMonitoring.SessionId],
            NotificationTypeId: [
                this.notificationMonitoring.NotificationTypeId,
            ],
            TemplateId: [this.notificationMonitoring.TemplateId],
            LanguageCodeId: [this.notificationMonitoring.LanguageCodeId],
            ReceiverAddress: [this.notificationMonitoring.ReceiverAddress],
            Subject: [this.notificationMonitoring.Subject],
            Content: [this.notificationMonitoring.Content],
            SentStatusId: [this.notificationMonitoring.SentStatusId],
            IsEncrypted: [this.notificationMonitoring.IsEncrypted],
            MaxRetryCount: [this.notificationMonitoring.MaxRetryCount],
            AttemptCount: [this.notificationMonitoring.AttemptCount],
            Priority: [this.notificationMonitoring.Priority],
            HasExpiryDateTime: [this.notificationMonitoring.HasExpiryDateTime],
            ExpiryDateTime: [this.notificationMonitoring.ExpiryDateTime],
        });
    }

    /**
     * CreateNotificationMonitoring
     */
    CreateNotificationMonitoring(): void {
        const data = this.notificationMonitoringForm.getRawValue();
        this.notificationMonitoringService
            .CreateNotificationMonitoring(data)
            .then(() => {
                this.notificationMonitoringService.onNotificationMonitoringChanged.next(
                    data
                );
                this.router.navigate([
                    "/Notifications/NotificationMonitoring/notificationMonitoring",
                ]);
                this.addAlertNotificationMonitoring.AddAlertNotificationMonitoringShow();
                this.notificationMonitoringsService.GetNotificationMonitorings();
            });
    }

    /**
     * UpdateNotificationMonitoring
     */
    UpdateNotificationMonitoring(): void {
        const data = this.notificationMonitoringForm.getRawValue();
        this.notificationMonitoringService
            .UpdateNotificationMonitoring(data)
            .then(() => {
                this.notificationMonitoringService.onNotificationMonitoringChanged.next(
                    data
                );

                this.router.navigate([
                    "/Notifications/NotificationMonitoring/notificationMonitoring",
                ]);
                this.updateAlertNotificationMonitoring.UpdateAlertNotificationMonitoringShow();
                this.notificationMonitoringsService.GetNotificationMonitorings();
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
        this.notificationMonitoring.ExpiryDateTime = utcDate;
        const expiryDateTime = new Date(
            this.notificationMonitoring.ExpiryDateTime
        );
        const expiryDateTimeString = expiryDateTime.toISOString();
    }
}
