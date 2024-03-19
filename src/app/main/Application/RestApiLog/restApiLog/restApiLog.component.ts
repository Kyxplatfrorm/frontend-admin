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
import { RestApiLog } from "../restApiLogs/restApiLogs.model";
import { RestApiLogService } from "./restApiLog.service";
import { SearchRestApiLogService } from "../searchRestApiLog/searchRestApiLog.service";
import { HttpMethodEntity } from "app/ui/restApiLog";
import { RestApiLogsService } from "../restApiLogs/restApiLogs.service";

@Component({
    selector: "restApiLog",
    templateUrl: "./restApiLog.component.html",
    styleUrls: ["./restApiLog.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RestApiLogComponent implements OnInit, OnDestroy {
    dialogRef: any;
    restApiLog: RestApiLog;
    pageType: string;
    restApiLogForm: FormGroup;
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
        private restApiLogService: RestApiLogService,
        private searchRestApiLogService: SearchRestApiLogService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private restApiLogsService: RestApiLogsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.restApiLog = new RestApiLog();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.restApiLogService.onRestApiLogChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((restApiLog) => {
                this.restApiLog = new RestApiLog(restApiLog);
                this.pageType = "edit";
                this.restApiLogService.restApiLogList =
                    restApiLog.RestApiLogList;

                this.restApiLogForm = this.createRestApiLogForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createRestApiLogForm
     *
     * @returns {FormGroup}
     */
    createRestApiLogForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.restApiLog.Id],
            UniqueReferenceId: [this.restApiLog.UniqueReferenceId],
            ApiReferenceNumber: [this.restApiLog.ApiReferenceNumber],
            IsExternalCall: [this.restApiLog.IsExternalCall],
            ProcessId: [this.restApiLog.ProcessId],
            ApiChannel: [this.restApiLog.ApiChannel],
            ApiStepNumber: [this.restApiLog.ApiStepNumber],
            HttpResponseCode: [this.restApiLog.HttpResponseCode],
            SessionId: [this.restApiLog.SessionId],
            UserId: [this.restApiLog.UserId],
            ServiceName: [this.restApiLog.ServiceName],
            UserName: [this.restApiLog.UserName],
            UserFullName: [this.restApiLog.UserFullName],
            ServerType: [this.restApiLog.ServerType],
            ServerName: [this.restApiLog.ServerName],
            ApiUrl: [this.restApiLog.ApiUrl],
            ApiHost: [this.restApiLog.ApiHost],
            ApiName: [this.restApiLog.ApiName],
            ApiStatus: [this.restApiLog.ApiStatus],
            ErrorCode: [this.restApiLog.ErrorCode],
            ErrorDescription: [this.restApiLog.ErrorDescription],
            UserAgent: [this.restApiLog.UserAgent],
            ClientIp: [this.restApiLog.ClientIp],
            ForwarderIp: [this.restApiLog.ForwarderIp],
            Request: [this.restApiLog.Request],
            Response: [this.restApiLog.Response],
            DebugLog: [this.restApiLog.DebugLog],
            Exception: [this.restApiLog.Exception],
            TotalElapsed: [this.restApiLog.TotalElapsed],
            TotalExternalElapsed: [this.restApiLog.TotalExternalElapsed],
            ApiFullName: [this.restApiLog.ApiFullName],
            ControllerName: [this.restApiLog.ControllerName],
            HttpMethod: [this.restApiLog.HttpMethod],
            InsertDateTime: [this.restApiLog.InsertDateTime],
        });
    }
}
