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
import { CardMemoReport } from "../cardMemoReports/cardMemoReports.model";
import { CardMemoReportService } from "./cardMemoReport.service";
import { SearchCardMemoReportService } from "../searchCardMemoReport/searchCardMemoReport.service";
import { CardMemoReportsService } from "../cardMemoReports/cardMemoReports.service";
import {
    ApplicationTypeEntity,
    MemoChannelTypeEntity,
    MemoCodeEntity,
    MemoKeyTypeEntity,
    MemoTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/cardMemoReport";

@Component({
    selector: "cardMemoReport",
    templateUrl: "./cardMemoReport.component.html",
    styleUrls: ["./cardMemoReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CardMemoReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    cardMemoReport: CardMemoReport;
    pageType: string;
    cardMemoReportForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    applicationType: ApplicationTypeEntity[];
    memoChannelType: MemoChannelTypeEntity[];
    memoKeyType: MemoKeyTypeEntity[];
    memoType: MemoTypeEntity[];
    memoCode: MemoCodeEntity[];
    tenant: TenantDefinitionEntity[];

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
        private cardMemoReportService: CardMemoReportService,
        private searchCardMemoReportService: SearchCardMemoReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private cardMemoReportsService: CardMemoReportsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardMemoReport = new CardMemoReport();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.cardMemoReportsService.GetTenants().then(() => {
            this.tenant =
                this.cardMemoReportsService.tenantApiResponse.TenantDefinitionList;
        });
        this.cardMemoReportsService.GetApplicationTypes().then(() => {
            this.applicationType =
                this.cardMemoReportsService.applicationTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoChannelTypes().then(() => {
            this.memoChannelType =
                this.cardMemoReportsService.memoChannelTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoCodes().then(() => {
            this.memoCode =
                this.cardMemoReportsService.memoCodeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoKeyTypes().then(() => {
            this.memoKeyType =
                this.cardMemoReportsService.memoKeyTypeApiResponse.ParameterList;
        });
        this.cardMemoReportsService.GetMemoTypes().then(() => {
            this.memoType =
                this.cardMemoReportsService.memoTypeApiResponse.ParameterList;
        });
        this.cardMemoReportService.onCardMemoReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cardMemoReport) => {
                this.cardMemoReport = new CardMemoReport(cardMemoReport);
                this.pageType = "edit";

                this.cardMemoReportForm = this.createCardMemoReportForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createCardMemoReportForm
     *
     * @returns {FormGroup}
     */
    createCardMemoReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.cardMemoReport.Id],
            ApplicationTypeId: [this.cardMemoReport.ApplicationTypeId],
            TenantId: [this.cardMemoReport.TenantId],
            CustomerId: [this.cardMemoReport.CustomerId],
            MemoChannelTypeId: [this.cardMemoReport.MemoChannelTypeId],
            MemoKeyTypeId: [this.cardMemoReport.MemoKeyTypeId],
            MemoTypeId: [this.cardMemoReport.MemoTypeId],
            MemoCodeId: [this.cardMemoReport.MemoCodeId],
            Description: [this.cardMemoReport.Description],
            InsertDateTime: [this.cardMemoReport.InsertDateTime],
            MemoDate: [this.cardMemoReport.MemoDate],
            MemoKey: [this.cardMemoReport.MemoKey],
            OldValue: [this.cardMemoReport.OldValue],
            NewValue: [this.cardMemoReport.NewValue],
            InsertUserName: [this.cardMemoReport.InsertUserName],
        });
    }
}
