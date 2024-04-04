import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import SearchCustomerDataSource from "./searchCustomer.datasource";
import { SearchCustomerService } from "./searchCustomer.service";
import { SearchCustomerDialogComponent } from "./searchCustomerForm/searchCustomerForm.component";
import { SearchCustomer } from "./searchCustomer.model";
import { Router } from "@angular/router";

@Component({
    selector: "searchCustomer",
    templateUrl: "./searchCustomer.component.html",
    styleUrls: ["./searchCustomer.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchCustomerComponent implements OnInit {
    searchCustomerDataSource: SearchCustomerDataSource | null;
    dialogRef: any;
    displayedColumns = [
        "Id",
        "CustomerFullName",
        "CustomerType",
        "CustomerStatus",
        "CustomerSegment",
        "CustomerNumber",
        "FullCellPhoneNumber",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchCustomerPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchCustomerSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    searchCustomer: SearchCustomer;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     *
     */

    constructor(
        private searchCustomerService: SearchCustomerService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.searchCustomer = new SearchCustomer();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchCustomerDataSource = new SearchCustomerDataSource(
            this.searchCustomerService,
            this.searchCustomerPaginator,
            this.searchCustomerSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchCustomerDataSource) {
                    return;
                }
                this.searchCustomerDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    /**
     * createCustomerStatusForm
     *
     * @returns {FormGroup}
     */
    createCustomerStatusForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.searchCustomer.Id],
            CustomerStatusId: [this.searchCustomer.CustomerStatusId],
        });
    }

    refreshSearchCustomerDataSource() {
        this.searchCustomerDataSource = new SearchCustomerDataSource(
            this.searchCustomerService,
            this.searchCustomerPaginator,
            this.searchCustomerSort
        );
    }
}
