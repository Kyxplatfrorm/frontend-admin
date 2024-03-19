import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialogRef } from "@angular/material/dialog";
import { AlertSnackBar } from "app/_helpers/AlertSnackbar";
import { TokenizeCard } from "./tokenizeCardNumber.model";
import { TokenizeCardNumberService } from "./tokenizeCardNumber.service";

@Component({
    selector: "tokenizeCardNumber",
    templateUrl: "./tokenizeCardNumber.component.html",
    styleUrls: ["./tokenizeCardNumber.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TokenizeCardNumberComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    tokenizeCard: TokenizeCard;
    pageType: string;
    visible: boolean = false;
    tokenizeCardNumberForm: FormGroup;
    tokenizeCardNumberResult: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tokenizeCardNumberService: TokenizeCardNumberService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.tokenizeCardNumberService.onTokenizeCardNumberChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tokenizeCard) => {
                this.tokenizeCard = new TokenizeCard(tokenizeCard);
                this.tokenizeCardNumberForm =
                    this.createTokenizeCardNumberForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createTokenizeCardNumberForm
     *
     * @returns {FormGroup}
     */
    createTokenizeCardNumberForm(): FormGroup {
        return this._formBuilder.group({
            CardNumber: [this.tokenizeCard.CardNumber],
            CardTokenNumber: [this.tokenizeCard.CardTokenNumber],
        });
    }

    /**
     * TokenizeCardButton
     */
    TokenizeCardButton(): void {
        const data = this.tokenizeCardNumberForm.getRawValue();
        if (
            data.CardNumber === undefined ||
            data.CardNumber === "" ||
            data.CardNumber === null
        ) {
            this.alertMessage.AlertShow();
            return;
        }
        this.tokenizeCardNumberService.TokenizeCardNumber(data).then(() => {
            this.tokenizeCardNumberService.onTokenizeCardNumberChanged.next(
                data
            );
            this.tokenizeCardNumberResult =
                this.tokenizeCardNumberService.cardTokenNumber;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.tokenizeCardNumberForm.reset();
    }
}
