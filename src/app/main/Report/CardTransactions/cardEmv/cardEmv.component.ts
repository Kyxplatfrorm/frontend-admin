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
import { CardTransaction } from "../cardTransactions/cardTransactions.model";
import { CardTransactionService } from "../cardTransaction/cardTransaction.service";

@Component({
    selector: "cardEmv",
    templateUrl: "./cardEmv.component.html",
    styleUrls: ["./cardEmv.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CardEmvComponent implements OnInit, OnDestroy {
    dialogRef: any;
    cardTransaction: CardTransaction;
    pageType: string;
    cardEmvForm: FormGroup;
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
        private cardTransactionService: CardTransactionService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.cardTransaction = new CardTransaction();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.cardTransactionService.onCardTransactionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cardTransaction) => {
                this.cardTransaction = new CardTransaction(cardTransaction);
                this.pageType = "edit";

                this.cardEmvForm = this.createCardEmvForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createCardEmvForm
     *
     * @returns {FormGroup}
     */
    createCardEmvForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.cardTransaction.Id],
            CardTokenNumber: [this.cardTransaction.CardTokenNumber],
            ReferenceNumber: [this.cardTransaction.ReferenceNumber],
            CardId: [this.cardTransaction.CardId],
            F55Length: [this.cardTransaction.F55Length],
            F55Tag5F34: [this.cardTransaction.F55Tag5F34],
            F55Tag5F2A: [this.cardTransaction.F55Tag5F2A],
            F55Tag82: [this.cardTransaction.F55Tag82],
            F55Tag84: [this.cardTransaction.F55Tag84],
            F55Tag95: [this.cardTransaction.F55Tag95],
            F55Tag9A: [this.cardTransaction.F55Tag9A],
            F55Tag9C: [this.cardTransaction.F55Tag9C],
            F55Tag9F02: [this.cardTransaction.F55Tag9F02],
            F55Tag9F03: [this.cardTransaction.F55Tag9F03],
            F55Tag9F10: [this.cardTransaction.F55Tag9F10],
            F55Tag9F1A: [this.cardTransaction.F55Tag9F1A],
            F55Tag9F26: [this.cardTransaction.F55Tag9F26],
            F55Tag9F27: [this.cardTransaction.F55Tag9F27],
            F55Tag9F33: [this.cardTransaction.F55Tag9F33],
            F55Tag9F34: [this.cardTransaction.F55Tag9F34],
            F55Tag9F36: [this.cardTransaction.F55Tag9F36],
            F55Tag9F37: [this.cardTransaction.F55Tag9F37],
            F55Tag91: [this.cardTransaction.F55Tag91],
            F55Tag71: [this.cardTransaction.F55Tag71],
            F55Tag72: [this.cardTransaction.F55Tag72],
        });
    }
}
