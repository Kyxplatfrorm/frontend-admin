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
import { fromEvent, Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CityDataSource } from "./city.datasource";
import { CityService } from "./city.service";
import { ActivatedRoute } from "@angular/router";
import { StateEntity } from "app/ui/country";
import { Country } from "../country/country.model";
import { City } from "./city.model";

@Component({
    selector: "city",
    templateUrl: "./city.component.html",
    styleUrls: ["./city.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CityComponent implements OnInit {
    cityDataSource: CityDataSource | null;
    displayedColumns = [
        "CountryCode",
        "StateCode",
        "CityCode",
        "CityName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];

    stateList: StateEntity[];
    city: City;
    hasState: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    citypaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    citysort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    routeParams: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private cityservice: CityService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    ngOnInit(): void {
        this.cityservice.getCountry(this.routeParams.id).then(() => {
            this.hasState = this.cityservice.selectedCountry.HasState;

            if (this.hasState) {
                this.displayedColumns = [
                    "CountryCode",
                    "StateCode",
                    "CityCode",
                    "CityName",
                    "InsertDateTime",
                    "UpdateDateTime",
                    "Buttons",
                ];
            } else {
                this.displayedColumns = [
                    "CountryCode",
                    "CityCode",
                    "CityName",
                    "InsertDateTime",
                    "UpdateDateTime",
                    "Buttons",
                ];
            }
        });

        this.cityDataSource = new CityDataSource(
            this.cityservice,
            this.citypaginator,
            this.citysort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.cityDataSource) {
                    return;
                }
                this.cityDataSource.filter = this.filter.nativeElement.value;
            });
    }

    refreshCityDataSourceDataSource(): void {
        this.cityDataSource = new CityDataSource(
            this.cityservice,
            this.citypaginator,
            this.citysort
        );
    }

    /**
     * deleteCity
     */
    deleteCity(city): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.cityservice.deleteCity(city).then(() => {
                    this.cityservice.GetCitiesByCountryId().then(() => {
                        this.refreshCityDataSourceDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
