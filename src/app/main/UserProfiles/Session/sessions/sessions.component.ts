import {
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Session } from "./sessions.model";
import { SearchSessionService } from "../searchSession/searchSession.service";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { ParameterUserTypeEntity } from "app/ui/applicationDefinition";
import { Subject } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import { User } from "../../User/users/users.model";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SessionStatusEntity } from "app/ui/session";
import { SessionsService } from "./sessions.service";
import { Router } from "@angular/router";

@Component({
    selector: "sessions",
    templateUrl: "./sessions.component.html",
    styleUrls: ["./sessions.component.scss"],
})
export class SessionsComponent {
    session: Session;
    user: User;
    sessionForm: FormGroup;
    tenantList: TenantDefinitionEntity[];
    parameterUserList: ParameterUserTypeEntity[];
    sessionStatusList: SessionStatusEntity[];
    private _unsubscribeAll: Subject<any>;
    isIndeterminate = true;
    isChecked = undefined;
    isLastIndeterminate = true;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchSessionService: SearchSessionService,
        private sessionsService: SessionsService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.session = new Session();
        this._unsubscribeAll = new Subject();
        this.session.SearchStartDate = new Date();
    }
    onChangeCheckbox(checkbox: MatCheckbox): void {
        this.isIndeterminate = checkbox.indeterminate;
        if (checkbox.indeterminate) {
            checkbox.indeterminate = false;
            checkbox.checked = true;
        } else if (!checkbox.indeterminate && !checkbox.checked) {
            checkbox.checked = false;
        } else if (!checkbox.indeterminate && checkbox.checked) {
            checkbox.indeterminate = true;
        }
        this.isLastIndeterminate = checkbox.indeterminate;
    }

    ngOnInit(): void {
        this.searchSessionService.ClearSearchSessionDataSource();
        this.sessionsService.GetTenants().then(() => {
            this.tenantList =
                this.sessionsService.tenantDefApiResponse.TenantDefinitionList;
        });

        this.sessionsService.GetUserTypes().then(() => {
            this.parameterUserList =
                this.sessionsService.userTypeApiResponse.ParameterList;
        });
        this.sessionsService.GetSessionStatus().then(() => {
            this.sessionStatusList =
                this.sessionsService.sessionStatusApiResponse.ParameterList;
        });

        this.sessionForm = this.createSessionForm();
    }

    /**
     *  createSessionForm
     *
     * @returns {FormGroup}
     */
    createSessionForm(): FormGroup {
        return this._formBuilder.group({
            TenantId: [this.session.TenantId],
            UserName: [this.session.UserName],
            UserId: [this.session.UserId],
            Server: [this.session.Server],
            UserTypeId: [this.session.UserTypeId],
            CustomerId: [this.session.CustomerId],
            SelectedSessionStatus: [this.session.SelectedSessionStatus],
            SearchStartDate: [this.session.SearchStartDate],
            SearchEndDate: [this.session.SearchEndDate],
            SearchStartTime: [this.session.SearchStartTime],
            SearchEndTime: [this.session.SearchEndTime],
            ShowActiveSessions: [this.session.ShowActiveSessions],
            ClientIp: [this.session.ClientIp],
        });
    }

    /**
     * SearchSession
     */
    SearchSession(): void {
        const data = this.sessionForm.getRawValue();
        if (this.isLastIndeterminate) {
            data.ShowActiveSessions = null;
        }
        this.searchSessionService.SearchSession(data).then(() => {
            this.searchSessionService.onSearchSessionChanged.next(data);
            this.router.navigate(["/UserProfiles/Session/searchSession"]);
        });
    }

    ClearButton() {
        this.sessionForm.controls["TenantId"].reset();
        this.sessionForm.controls["UserName"].reset();
        this.sessionForm.controls["UserId"].reset();
        this.sessionForm.controls["Server"].reset();
        this.sessionForm.controls["UserTypeId"].reset();
        this.sessionForm.controls["CustomerId"].reset();
        this.sessionForm.controls["SearchStartDate"].reset();
        this.sessionForm.controls["SearchEndDate"].reset();
        this.sessionForm.controls["SearchStartTime"].reset();
        this.sessionForm.controls["SearchEndTime"].reset();
        this.sessionForm.controls["ClientIp"].reset();
        this.sessionForm.controls["SelectedSessionStatus"].reset();
        this.sessionForm.controls["ShowActiveSessions"].reset();
        this.isIndeterminate = true;
        this.isLastIndeterminate = true;
        this.isChecked = undefined;
    }

    onDateChange(event: MatDatepickerInputEvent<Date>) {
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
        this.session.SearchStartDate = utcDate;
        const searchStartDate = new Date(this.session.SearchStartDate);
        const searchStartDateString = searchStartDate.toISOString();
    }
    onDateEndChange(event: MatDatepickerInputEvent<Date>) {
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

        this.session.SearchEndDate = utcDate;
        const searchEndDate = new Date(this.session.SearchEndDate);
        const searchEndDateString = searchEndDate.toISOString();
    }
}
