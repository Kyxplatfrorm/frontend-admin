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
import CustomerCardFormDataSource from "./customerCardForm.datasource";
import { SearchCustomerService } from "app/main/Customer/CustomerDefinition/searchCustomer/searchCustomer.service";
import { Card } from "app/main/Card/CardDefinition/searchCard/cardDefinitions.model";

@Component({
    selector: "customerCardForm-dialog",
    templateUrl: "./customerCardForm.component.html",
    styleUrls: ["./customerCardForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CustomerCardFormDialogComponent {
    customerCardFormDataSource: CustomerCardFormDataSource | null;
    dialogRef: any;
    pageType: string;
    action: string;
    customerId: string;
    card: Card;
    customerCardForm: FormGroup;
    dialogTitle: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    displayedColumns = [
        "CustomerFullName",
        "CustomerType",
        "CustomerStatus",
        "Email",
        "CustomerNumber",
        "FullCellPhoneNumber",
    ];
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    customerCardPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    customerCardSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    @Output() customerCardSelected: EventEmitter<Card> =
        new EventEmitter<Card>();

    /**
     * Constructor
     *
     * @param {MatDialogRef<CustomerCardFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public matDialogRef: MatDialogRef<CustomerCardFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private cdr: ChangeDetectorRef,
        private searchCustomerService: SearchCustomerService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.customerCardFormDataSource = new CustomerCardFormDataSource(
            this.searchCustomerService
        );
        var popUpHeaderTextCard = "";
        if (this.action === "new") {
            popUpHeaderTextCard = "EDITPROFILE";
        } else {
            popUpHeaderTextCard = "NEWPROFILE";
            this.searchCustomerService.ClearSearchPopupDataSource();
            this.card = new Card({
                CustomerId: this._data.customerId,
            });
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextCard)
            .subscribe((x) => (this.dialogTitle = x));

        this.customerCardForm = this.createCustomerCardForm();
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     * createCustomerCardForm
     *
     * @returns {FormGroup}
     */
    createCustomerCardForm(): FormGroup {
        return this._formBuilder.group({
            CustomerId: [this.card?.CustomerId],
            CustomerNumber: [this.card?.CustomerNumber],
            CustomerName: [this.card?.CustomerName],
            IdentityNumber: [this.card?.IdentityNumber],
            CellPhoneNumber: [this.card?.CellPhoneNumber],
            Email: [this.card?.Email],
        });
    }

    /**
     * CardSearch
     */
    CardSearch(): void {
        const data = this.customerCardForm.getRawValue();
        this.searchCustomerService.SearchCustomer(data).then(() => {
            this.searchCustomerService.onSearchCustomerChanged.next(data);
        });
    }
    loadCustomerCardData(card: Card): void {
        this.card = card;
        this.customerCardSelected.emit(this.card);
        this.matDialogRef.close();
    }

    ClearSearch(): void {
        this.customerCardForm.controls["CustomerId"]?.reset();
        this.customerCardForm.controls["CompanyId"]?.reset();
        this.customerCardForm.controls["CustomerNumber"]?.reset();
        this.customerCardForm.controls["CustomerName"]?.reset();
        this.customerCardForm.controls["IdentityNumber"]?.reset();
        this.customerCardForm.controls["CellPhoneNumber"]?.reset();
        this.customerCardForm.controls["Email"]?.reset();
        this.customerCardForm.controls["SearchStartDate"]?.reset();
        this.customerCardForm.controls["SearchEndDate"]?.reset();
        this.customerCardForm.controls["ProductId"]?.reset();
        this.customerCardForm.controls["EmbossName"]?.reset();
        this.customerCardForm.controls["LimitResetPeriodId"]?.reset();
        this.customerCardForm.controls["LimitAmount"]?.reset();
        this.customerCardForm.controls["UsageBeginDateTime"]?.reset();
        this.customerCardForm.controls["UsageEndDateTime"]?.reset();
    }
}
