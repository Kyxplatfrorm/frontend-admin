import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
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
import CountryDefinitionsDataSource from "./countryDefinitions.datasource";
import { CountryDefinitionsService } from "./countryDefinitions.service";

@Component({
    selector: "countryDefinitions",
    templateUrl: "./countryDefinitions.component.html",
    styleUrls: ["./countryDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CountryDefinitionsComponent implements OnInit {
    countryDefinitionsDataSource: CountryDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "CountryCode",
        "CountryName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    countrydefinitionspaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    countrydefinitionssort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private countrydefinitionsservice: CountryDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.countryDefinitionsDataSource = new CountryDefinitionsDataSource(
            this.countrydefinitionsservice,
            this.countrydefinitionspaginator,
            this.countrydefinitionssort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.countryDefinitionsDataSource) {
                    return;
                }
                this.countryDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshCountryDefinitionsDataSource(): void {
        this.countryDefinitionsDataSource = new CountryDefinitionsDataSource(
            this.countrydefinitionsservice,
            this.countrydefinitionspaginator,
            this.countrydefinitionssort
        );
    }

    /**
     * deleteCountry
     */
    deleteCountry(country): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.countrydefinitionsservice
                    .deleteCountry(country)
                    .then(() => {
                        this.countrydefinitionsservice
                            .getCountries()
                            .then(() => {
                                this.refreshCountryDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
