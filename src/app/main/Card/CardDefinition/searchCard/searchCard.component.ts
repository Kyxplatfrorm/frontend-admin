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
import { SearchCardService } from "./searchCard.service";
import SearchCardDataSource from "./searchCard.datasource";
import { Card } from "./cardDefinitions.model";

@Component({
    selector: "searchCard",
    templateUrl: "./searchCard.component.html",
    styleUrls: ["./searchCard.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchCardComponent implements OnInit {
    searchCardDataSource: SearchCardDataSource | null;
    displayedColumns = [
        "Id",
        "CardBrand",
        "CardTokenNumber",
        "CardHolderName",
        "ProductName",
        "CardStatus",
        "FullCellPhoneNumber",
        "Email",
        "Buttons",
    ];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    cards: Card;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchCardPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchCardSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchCardService: SearchCardService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.cards = new Card();
    }

    ngOnInit(): void {
        this.searchCardDataSource = new SearchCardDataSource(
            this.searchCardService,
            this.searchCardPaginator,
            this.searchCardSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchCardDataSource) {
                    return;
                }
                this.searchCardDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchCardDataSource() {
        this.searchCardDataSource = new SearchCardDataSource(
            this.searchCardService,
            this.searchCardPaginator,
            this.searchCardSort
        );
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
}
