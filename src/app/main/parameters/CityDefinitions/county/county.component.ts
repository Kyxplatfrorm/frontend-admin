import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, ReplaySubject, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CityService } from "../city/city.service";
import { CountyFormDialogComponent } from "./county-form/county-form.component";
import { CountyDataSource } from "./county.datasource";
import { CountyService } from "./county.service";
import { City } from "../city/city.model";
import { StateEntity } from "app/ui/country";
import { Country } from "../country/country.model";
import AddAlertCounty from "./addCounty";
import UpdateAlertCounty from "./updateCounty";

@Component({
    selector: "county",
    templateUrl: "./county.component.html",
    styleUrls: ["./county.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CountyComponent implements OnInit, OnDestroy {
    countyDataSource: CountyDataSource | null;
    dialogRef: any;
    city: City;
    pageType: string;
    countyForm: FormGroup;
    displayedColumns = ["Id", "CountyName", "Buttons"];
    stateList: StateEntity[];
    selectedCountry: Country;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: true })
    countypaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    countysort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

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
        private cityservice: CityService,
        private countyservice: CountyService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private _matDialog: MatDialog,
        private addAlertCounty: AddAlertCounty,
        private updateAlertCounty: UpdateAlertCounty,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.city = new City();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.stateList = this.cityservice.stateList;
        this.selectedCountry = this.cityservice.selectedCountry;
        this.countyDataSource = new CountyDataSource(
            this.countyservice,
            this.countypaginator,
            this.countysort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.countyDataSource) {
                    return;
                }
                this.countyDataSource.filter = this.filter.nativeElement.value;
            });
        this.countyservice.onCountyChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((city) => {
                if (city) {
                    this.city = new City(city);
                    this.pageType = "edit";
                    this.countyservice.countyList = city.CountyList;
                } else {
                    this.pageType = "new";
                    this.city = new City();
                    this.city.CountryId = this.cityservice.selectedCountry.Id;
                    this.city.HasState =
                        this.cityservice.selectedCountry.HasState;
                    this.countyservice.countyList = city.CountyList;
                }
                this.countyForm = this.createCountyForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    refreshCountyDataSource(): void {
        this.countyDataSource = new CountyDataSource(
            this.countyservice,
            this.countypaginator,
            this.countysort
        );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createCountyForm
     *
     * @returns {FormGroup}
     */
    createCountyForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.city.Id],
            CountryId: [this.city.CountryId],
            StateId: [this.city.StateId],
            CityCode: [this.city.CityCode],
            CityName: [this.city.CityName],
        });
    }

    /**
     * updateCity
     */
    updateCity(): void {
        const data = this.countyForm.getRawValue();
        this.countyservice.updateCity(data).then(() => {
            this.countyservice.onCountyChanged.next(data);
            this.updateAlertCounty.UpdateAlertCountyShow();
            this.router.navigate(["/city", data.CountryId]);
        });
    }

    /**
     * createCity
     */
    createCity(): void {
        const data = this.countyForm.getRawValue();
        this.countyservice.createCity(data).then(() => {
            this.countyservice.onCountyChanged.next(data);
            this.addAlertCounty.AddAlertCountyShow();
            this.router.navigate(["/city", data.CountryId]);
        });
    }

    newForm(): void {
        this.dialogRef = this._matDialog.open(CountyFormDialogComponent, {
            panelClass: "countyPopup-form-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var countyRequest = response.getRawValue();
            countyRequest.CityId = this.city.Id;
            this.countyservice.createCounty(countyRequest).then(() => {
                this.countyservice.getCity().then(() => {
                    this.refreshCountyDataSource();
                });
            });
        });
    }

    /**
     * editCounty
     *
     * @param county
     */
    editCounty(county): void {
        this.dialogRef = this._matDialog.open(CountyFormDialogComponent, {
            panelClass: "countyPopup-form-dialog",
            data: {
                county: county,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var countyRequest = formData.getRawValue();
            countyRequest.CityId = this.city.Id;
            switch (actionType) {
                /**
                 * Save county
                 */
                case "save":
                    this.countyservice.updateCounty(countyRequest).then(() => {
                        this.countyservice.getCity().then(() => {
                            this.refreshCountyDataSource();
                        });
                    });
                    break;
                /**
                 * Delete county
                 */
                case "delete":
                    this.deleteCounty(county);
                    break;
            }
        });
    }

    /**
     * deleteCounty
     */
    deleteCounty(county): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.countyservice.deleteCounty(county).then(() => {
                    this.countyservice.getCity().then(() => {
                        this.refreshCountyDataSource();
                    });
                });
            }
        });
    }
}
