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
import { HsmTransaction } from "../hsmTransactionReports/hsmTransactionReports.model";
import { HsmTransactionReportService } from "./hsmTransactionReport.service";
import { SearchHsmTransactionService } from "../searchHsmTransaction/searchHsmTransaction.service";

@Component({
    selector: "hsmTransactionReport",
    templateUrl: "./hsmTransactionReport.component.html",
    styleUrls: ["./hsmTransactionReport.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class HsmTransactionReportComponent implements OnInit, OnDestroy {
    dialogRef: any;
    hsmTransaction: HsmTransaction;
    pageType: string;
    hsmTransactionReportForm: FormGroup;
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
        private hsmTransactionReportService: HsmTransactionReportService,
        private searchHsmTransactionService: SearchHsmTransactionService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.hsmTransaction = new HsmTransaction();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.hsmTransactionReportService.onHsmTransactionReportChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((hsmTransaction) => {
                this.hsmTransaction = new HsmTransaction(hsmTransaction);
                this.pageType = "edit";

                this.hsmTransactionReportForm =
                    this.createHsmTransactionReportForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createHsmTransactionReportForm
     *
     * @returns {FormGroup}
     */
    createHsmTransactionReportForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.hsmTransaction.Id],
            CommandCode: [this.hsmTransaction.CommandCode],
            CommandName: [this.hsmTransaction.CommandName],
            ResponseCode: [this.hsmTransaction.ResponseCode],
            ResponseDescription: [this.hsmTransaction.ResponseDescription],
            ServerType: [this.hsmTransaction.ServerType],
            ServerName: [this.hsmTransaction.ServerName],
            ServiceName: [this.hsmTransaction.ServiceName],
            TotalElapsed: [this.hsmTransaction.TotalElapsed],
            RawRequest: [this.hsmTransaction.RawRequest],
            RawResponse: [this.hsmTransaction.RawResponse],
            EndPointAddress: [this.hsmTransaction.EndPointAddress],
            HsmIpAddress: [this.hsmTransaction.HsmIpAddress],
            HsmPort: [this.hsmTransaction.HsmPort],
        });
    }
}
