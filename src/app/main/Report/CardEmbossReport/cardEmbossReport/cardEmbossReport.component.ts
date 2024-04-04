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
import { CardEmbossReport } from "../cardEmbossReports/cardEmbossReports.model";
import { CardEmbossReportService } from "./cardEmbossReport.service";
import { SearchCardEmbossReportService } from "../searchCardEmbossReport/searchCardEmbossReport.service";
import { CardEmbossReportsService } from "../cardEmbossReports/cardEmbossReports.service";
import { TenantDefinitionEntity } from "app/ui/cardEmbossReport";

@Component({
    selector: "cardEmbossReport",
    templateUrl: "./cardEmbossReport.component.html",
    styleUrls: ["./cardEmbossReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CardEmbossReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    cardEmbossReport: CardEmbossReport;
    pageType: string;
    cardEmbossReportForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
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
        private cardEmbossReportService: CardEmbossReportService,
        private searchCardEmbossReportService: SearchCardEmbossReportService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private cardEmbossReportsService: CardEmbossReportsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardEmbossReport = new CardEmbossReport();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.cardEmbossReportsService.GetTenants().then(() => {
            this.tenant =
                this.cardEmbossReportsService.tenantApiResponse.TenantDefinitionList;
        });
        this.cardEmbossReportService.onCardEmbossReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cardEmbossReport) => {
                this.cardEmbossReport = new CardEmbossReport(cardEmbossReport);
                this.pageType = "edit";

                this.cardEmbossReportForm = this.createCardEmbossReportForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createCardEmbossReportForm
     *
     * @returns {FormGroup}
     */
    createCardEmbossReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.cardEmbossReport.Id],
            CardId: [this.cardEmbossReport.CardId],
            TenantId: [this.cardEmbossReport.TenantId],
            InsertDate: [this.cardEmbossReport.InsertDate],
            CustomerId: [this.cardEmbossReport.CustomerId],
            IsNoNameCard: [this.cardEmbossReport.IsNoNameCard],
            CardOrderId: [this.cardEmbossReport.CardOrderId],
            BranchId: [this.cardEmbossReport.BranchId],
            CardTokenNumber: [this.cardEmbossReport.CardTokenNumber],
            PanSequenceNumber: [this.cardEmbossReport.PanSequenceNumber],
            IsExported: [this.cardEmbossReport.IsExported],
            ExportDateTime: [this.cardEmbossReport.ExportDateTime],
            ExportCount: [this.cardEmbossReport.ExportCount],
            FileId: [this.cardEmbossReport.FileId],
            FileName: [this.cardEmbossReport.FileName],
            EmbossStatus: [this.cardEmbossReport.EmbossStatus],
            ProductId: [this.cardEmbossReport.ProductId],
            CardIssuingReasonType: [
                this.cardEmbossReport.CardIssuingReasonType,
            ],
            ExpiryDate: [this.cardEmbossReport.ExpiryDate],
            EmbossName1: [this.cardEmbossReport.EmbossName1],
            ErrorCode: [this.cardEmbossReport.ErrorCode],
            EmbossName2: [this.cardEmbossReport.EmbossName2],
            ErrorDescription: [this.cardEmbossReport.ErrorDescription],
            CountryId: [this.cardEmbossReport.CountryId],
            StateCode: [this.cardEmbossReport.StateCode],
            CityId: [this.cardEmbossReport.CityId],
            CountyId: [this.cardEmbossReport.CountyId],
            Address: [this.cardEmbossReport.Address],
            ZipCode: [this.cardEmbossReport.ZipCode],
            ContractType: [this.cardEmbossReport.ContractType],
            InsertDateTime: [this.cardEmbossReport.InsertDateTime],
        });
    }
}
