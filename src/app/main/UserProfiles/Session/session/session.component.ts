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
import { Session } from "../sessions/sessions.model";
import { SessionService } from "./session.service";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { SessionsService } from "../sessions/sessions.service";
import { TenantDefinitionsService } from "app/main/Tenant/TenantDefinitions/tenantDefinitions/tenantDefinitions.service";

@Component({
    selector: "session",
    templateUrl: "./session.component.html",
    styleUrls: ["./session.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SessionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    session: Session;
    pageType: string;
    sessionForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    tenantList: TenantDefinitionEntity[];

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
        private sessionService: SessionService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private tenantDefinitionsservice: TenantDefinitionsService,
        private sessionsService: SessionsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.session = new Session();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.sessionsService.GetTenants().then(() => {
            this.tenantList =
                this.sessionsService.tenantDefApiResponse.TenantDefinitionList;
        });

        this.sessionService.onSessionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((session) => {
                this.session = new Session(session);
                this.pageType = "edit";
                this.sessionService.sessionList = session.SessionList;
                this.sessionForm = this.createSessionForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSessionForm
     *
     * @returns {FormGroup}
     */
    createSessionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.session.Id],
            UserId: [this.session.UserId],
            UserName: [this.session.UserName],
            UserFullName: [this.session.UserFullName],
            ChannelCode: [this.session.ChannelCode],
            UserType: [this.session.UserType],
            SessionStatus: [this.session.SessionStatus],
            Server: [this.session.Server],
            ClientIp: [this.session.ClientIp],
            ForwarderApi: [this.session.ForwarderApi],
            HasSessionTimeOut: [this.session.HasSessionTimeOut],
            SessionActiveTimeMinutes: [this.session.SessionActiveTimeMinutes],
            TenantId: [this.session.TenantId],
            CustomerType: [this.session.CustomerType],
            CustomerId: [this.session.CustomerId],
            UtcTimeOffset: [this.session.UtcTimeOffset],
            CheckIp: [this.session.CheckIp],
        });
    }
}
