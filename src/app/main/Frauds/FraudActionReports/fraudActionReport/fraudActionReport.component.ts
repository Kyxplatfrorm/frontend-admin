import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { FraudAction } from "../fraudActionReports/fraudActionReports.model";
import {
    ApplicationTypeEntity,
    FraudRuleActionStatuesEntity,
    FraudRuleActionTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/fraudActionReport";
import { SearchFraudActionReportsService } from "../searchFraudActionReports/searchFraudActionReports.service";
import { FraudActionReportsService } from "../fraudActionReports/fraudActionReports.service";
import { FraudActionReportService } from "./fraudActionReport.service";
import UpdateAlertFraudActionReport from "./updateFraudActionReport";

@Component({
    selector: "fraudActionReport",
    templateUrl: "./fraudActionReport.component.html",
    styleUrls: ["./fraudActionReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class FraudActionReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    fraudAction: FraudAction;
    pageType: string;
    fraudRuleActionType: FraudRuleActionTypeEntity[];
    fraudRuleActionStatus: FraudRuleActionStatuesEntity[];
    tenantDefinition: TenantDefinitionEntity[];
    applicationType: ApplicationTypeEntity[];
    fraudActionReportForm: FormGroup;
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
        private searchFraudActionReportsService: SearchFraudActionReportsService,
        private fraudActionReportsService: FraudActionReportsService,
        private fraudActionReportService: FraudActionReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private updateAlertFraudActionReport: UpdateAlertFraudActionReport,
        private router: Router,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.fraudAction = new FraudAction();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.fraudActionReportsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.fraudActionReportsService.applicationTypeApiResponse.ParameterList;
        });

        this.fraudActionReportsService.GetTenants().then(() => {
            this.tenantDefinition =
                this.fraudActionReportsService.tenantApiResponse.TenantDefinitionList;
        });

        this.fraudActionReportsService.GetFraudRuleActionStatues().then(() => {
            this.fraudRuleActionStatus =
                this.fraudActionReportsService.fraudRuleActionStatuesApiResponse.ParameterList;
        });

        this.fraudActionReportsService.GetFraudRuleActionTypes().then(() => {
            this.fraudRuleActionType =
                this.fraudActionReportsService.fraudRuleActionTypeApiResponse.ParameterList;
        });

        this.fraudActionReportService.onFraudActionReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((fraudAction) => {
                if (fraudAction) {
                    this.fraudAction = new FraudAction(fraudAction);
                    this.pageType = "edit";
                } else {
                    this.fraudAction = new FraudAction({});
                    this.pageType = "new";
                }
                this.fraudActionReportForm = this.createFraudActionReportForm();
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
     *  createFraudActionReportForm
     *
     * @returns {FormGroup}
     */
    createFraudActionReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.fraudAction.Id],
            TenantId: [this.fraudAction.TenantId],
            ApplicationTypeId: [this.fraudAction.ApplicationTypeId],
            InsertDate: [this.fraudAction.InsertDate],
            FraudApiId: [this.fraudAction.FraudApiId],
            FraudRuleId: [this.fraudAction.FraudRuleId],
            FraudRuleName: [this.fraudAction.FraudRuleName],
            FraudApiName: [this.fraudAction.FraudApiName],
            SessionId: [this.fraudAction.SessionId],
            UserId: [this.fraudAction.UserId],
            UserName: [this.fraudAction.UserName],
            CustomerId: [this.fraudAction.CustomerId],
            CompanyId: [this.fraudAction.CompanyId],
            CompanyPosId: [this.fraudAction.CompanyPosId],
            CardToken: [this.fraudAction.CardToken],
            FraudRuleActionTypeId: [this.fraudAction.FraudRuleActionTypeId],
            FraudRuleActionStatusId: [this.fraudAction.FraudRuleActionStatusId],
            FraudRuleActionDateTime: [this.fraudAction.FraudRuleActionDateTime],
            FraudRuleActionUser: [this.fraudAction.FraudRuleActionUser],
            ClientIp: [this.fraudAction.ClientIp],
            TransactionAmount: [this.fraudAction.TransactionAmount],
            TransactionCode: [this.fraudAction.TransactionCode],
            ReferenceNumber: [this.fraudAction.ReferenceNumber],
        });
    }

    
}
