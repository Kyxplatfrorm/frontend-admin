import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Output,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Subject } from "rxjs";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import CardTransactionCardTokenFormDataSource from "./cardTransactionCardTokenForm.datasource";
import { SearchCardService } from "app/main/Card/CardDefinition/searchCard/searchCard.service";
import { Card } from "app/main/Card/CardDefinition/searchCard/cardDefinitions.model";

@Component({
    selector: "cardTransactionCardTokenForm-dialog",
    templateUrl: "./cardTransactionCardTokenForm.component.html",
    styleUrls: ["./cardTransactionCardTokenForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CardTransactionCardTokenFormDialogComponent {
    cardTransactionCardTokenFormDataSource: CardTransactionCardTokenFormDataSource | null;
    dialogRef: any;
    pageType: string;
    action: string;
    card: Card;
    cardTransactionCardTokenForm: FormGroup;
    dialogTitle: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    @Output() cardTransactionCardTokenSelected: EventEmitter<Card> =
        new EventEmitter<Card>();
    displayedColumns = [
        "Id",
        "CardBrand",
        "CardTokenNumber",
        "CardHolderName",
        "CardStatus",
        "FullCellPhoneNumber",
        "Email",
    ];
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    switchTransactionCardTokenPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchTransactionCardTokenSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CardTransactionCardTokenFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public matDialogRef: MatDialogRef<CardTransactionCardTokenFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private searchCardService: SearchCardService,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.cardTransactionCardTokenFormDataSource =
            new CardTransactionCardTokenFormDataSource(this.searchCardService);

        var popUpHeaderTextCardTransactionCardToken = "";
        if (this.action === "new") {
            popUpHeaderTextCardTransactionCardToken = "EDITPROFILE";
        } else {
            popUpHeaderTextCardTransactionCardToken = "NEWPROFILE";
            this.searchCardService.ClearSearchCardDataSource();
            this.card = new Card({
                CardTokenNumber: this._data.cardTokenNumber,
            });
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextCardTransactionCardToken)
            .subscribe((x) => (this.dialogTitle = x));

        this.cardTransactionCardTokenForm =
            this.createCardTransactionCardTokenForm();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createCardTransactionCardTokenForm
     *
     * @returns {FormGroup}
     */
    createCardTransactionCardTokenForm(): FormGroup {
        return this._formBuilder.group({
            CustomerName: [this.card?.CustomerName],
            IdentityNumber: [this.card?.IdentityNumber],
            CellPhoneNumber: [this.card?.CellPhoneNumber],
            CardTokenNumber: [this.card?.CardTokenNumber],
            Email: [this.card?.Email],
        });
    }

    /**
     * CardSearch
     */
    CardSearch(): void {
        const data = this.cardTransactionCardTokenForm.getRawValue();
        this.searchCardService.SearchCards(data).then(() => {
            this.searchCardService.onSearchCardChanged.next(data);
        });
    }

    loadCardTokenData(card: Card): void {
        this.card = card;
        this.cardTransactionCardTokenSelected.emit(this.card);
        this.matDialogRef.close();
    }

    ClearSearch(): void {
        this.cardTransactionCardTokenForm.controls["CustomerName"]?.reset();
        this.cardTransactionCardTokenForm.controls["IdentityNumber"]?.reset();
        this.cardTransactionCardTokenForm.controls["CellPhoneNumber"]?.reset();
        this.cardTransactionCardTokenForm.controls["Email"]?.reset();
        this.cardTransactionCardTokenForm.controls["CardTokenNumber"]?.reset();
    }
}
