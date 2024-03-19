import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
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
import { SwitchParseError } from "../switchParseErrorLogs/switchParseErrorLogs.model";
import { SwitchParseErrorLogService } from "./switchParseErrorLog.service";
import { SearchSwitchParseErrorLogsService } from "../searchParseErrorLogs/searchParseErrorLogs.service";
import {
    SwitchApplicationSessionEntity,
    SwitchApplicationsEntity,
} from "app/ui/switchReport";

@Component({
    selector: "switchParseErrorLog",
    templateUrl: "./switchParseErrorLog.component.html",
    styleUrls: ["./switchParseErrorLog.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchParseErrorLogComponent implements OnInit, OnDestroy {
    dialogRef: any;
    switchParseError: SwitchParseError;
    pageType: string;
    switchParseErrorLogForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    switchApplicationsList: SwitchApplicationsEntity[];
    switchApplicationSessionList: SwitchApplicationSessionEntity[];

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
        private switchParseErrorLogService: SwitchParseErrorLogService,
        private searchSwitchParseErrorLogsService: SearchSwitchParseErrorLogsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchParseError = new SwitchParseError();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.searchSwitchParseErrorLogsService
            .GetSwitchApplicationSessions()
            .then(() => {
                this.switchApplicationSessionList =
                    this.searchSwitchParseErrorLogsService.switchApplicationSessionApiResponse.ParameterList;
            });
        this.searchSwitchParseErrorLogsService
            .GetSwitchApplications()
            .then(() => {
                this.switchApplicationsList =
                    this.searchSwitchParseErrorLogsService.switchApplicationsApiResponse.ParameterList;
            });
        this.switchParseErrorLogService.onSwitchParseErrorLogChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchParseError) => {
                this.switchParseError = new SwitchParseError(switchParseError);
                this.pageType = "edit";

                this.switchParseErrorLogForm =
                    this.createSwitchParseErrorLogForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSwitchParseErrorLogForm
     *
     * @returns {FormGroup}
     */
    createSwitchParseErrorLogForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchParseError.Id],
            ApplicationType: [this.switchParseError.ApplicationType],
            TransactionType: [this.switchParseError.TransactionType],
            ApplicationId: [this.switchParseError.ApplicationId],
            SessionId: [this.switchParseError.SessionId],
            ServerName: [this.switchParseError.ServerName],
            RemoteIpAddress: [this.switchParseError.RemoteIpAddress],
            RemotePort: [this.switchParseError.RemotePort],
            LocalIpAddress: [this.switchParseError.LocalIpAddress],
            LocalPort: [this.switchParseError.LocalPort],
            HexMessage: [this.switchParseError.HexMessage],
            InsertDate: [this.switchParseError.InsertDate],
        });
    }
}
