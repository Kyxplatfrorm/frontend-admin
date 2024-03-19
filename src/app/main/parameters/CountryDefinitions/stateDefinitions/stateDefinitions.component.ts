import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Subject } from "rxjs";
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
import { StateFormDialogComponent } from "./stateForm/stateForm.component";
import { CountryDefinitionsService } from "../countryDefinitions/countryDefinitions.service";
import { Country } from "./stateDefinitions.model";
import { StateDefinitionsDataSource } from "./stateDefinitions.datasource";
import { StateDefinitionsService } from "./stateDefinitions.service";
import AddAlertState from "./addState";
import UpdateAlertState from "./updateState";

@Component({
    selector: "stateDefinitions",
    templateUrl: "./stateDefinitions.component.html",
    styleUrls: ["./stateDefinitions.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class StateDefinitionsComponent implements OnInit, OnDestroy {
    stateDefinitionsDataSource: StateDefinitionsDataSource | null;
    dialogRef: any;
    country: Country;
    pageType: string;
    stateDefinitionsForm: FormGroup;
    displayedColumns = [
        "Id",
        "CountryCode",
        "StateCode",
        "StateAlphaCode",
        "StateName",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    statedefinitionspaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    statedefinitionssort: MatSort;
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
        private countrydefinitionsservice: CountryDefinitionsService,
        private statedefinitionsservice: StateDefinitionsService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private _matDialog: MatDialog,
        private addAlertState: AddAlertState,
        private updateAlertState: UpdateAlertState,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.country = new Country();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.stateDefinitionsDataSource = new StateDefinitionsDataSource(
            this.countrydefinitionsservice,
            this.statedefinitionspaginator,
            this.statedefinitionssort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.stateDefinitionsDataSource) {
                    return;
                }
                this.stateDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.statedefinitionsservice.onStateDefinitionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((country) => {
                if (country) {
                    this.country = new Country(country);
                    this.pageType = "edit";
                    this.countrydefinitionsservice.stateList =
                        country.StateList;
                } else {
                    this.pageType = "new";
                    this.country = new Country();
                    this.countrydefinitionsservice.stateList =
                        country.StateList;
                }
                this.stateDefinitionsForm = this.createStateDefinitionsForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    refreshStateDefinitionsDataSource(): void {
        this.stateDefinitionsDataSource = new StateDefinitionsDataSource(
            this.countrydefinitionsservice,
            this.statedefinitionspaginator,
            this.statedefinitionssort
        );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createStateForm
     *
     * @returns {FormGroup}
     */
    createStateDefinitionsForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.country.Id],
            CountryId: [this.country.CountryId],
            StateCode: [this.country.StateCode],
            StateAlphaCode: [this.country.StateAlphaCode],
            StateName: [this.country.StateName],
            CountryCode: [this.country.CountryCode],
            CountryName: [this.country.CountryName],
            DefaultCurrencyCode: [this.country.DefaultCurrencyCode],
            CountryIsoCode2: [this.country.CountryIsoCode2],
            CountryIsoCode3: [this.country.CountryIsoCode3],
            CountryPhoneCode: [this.country.CountryPhoneCode],
            ExternalCountryCode: [this.country.ExternalCountryCode],
            MaxPhoneLength: [this.country.MaxPhoneLength],
            MinPhoneLength: [this.country.MinPhoneLength],
            PhoneMask: [this.country.PhoneMask],
            IconUrl: [this.country.IconUrl],
            IsGlobalRegistrationEnabled: [
                this.country.IsGlobalRegistrationEnabled,
            ],
            IsLocalRegistrationEnabled: [
                this.country.IsLocalRegistrationEnabled,
            ],
            HasState: [this.country.HasState],
        });
    }

    /**
     * UpdateCountry
     */
    updateCountry(): void {
        const data = this.stateDefinitionsForm.getRawValue();
        this.statedefinitionsservice.updateCountry(data).then(() => {
            this.statedefinitionsservice.onStateDefinitionsChanged.next(data);
            this.router.navigate([
                "Parameters/CountryDefinitions/countryDefinitions",
            ]);
            this.updateAlertState.UpdateAlertStateShow();
            this.countrydefinitionsservice.getCountries();
        });
    }

    /**
     * createCountry
     */
    createCountry(): void {
        const data = this.stateDefinitionsForm.getRawValue();
        this.statedefinitionsservice.createCountry(data).then(() => {
            this.statedefinitionsservice.onStateDefinitionsChanged.next(data);
            this.router.navigate([
                "Parameters/CountryDefinitions/countryDefinitions",
            ]);
            this.addAlertState.AddAlertStateShow();
            this.countrydefinitionsservice.getCountries();
        });
    }

    newForm(): void {
        this.dialogRef = this._matDialog.open(StateFormDialogComponent, {
            panelClass: "statePopupForm-form-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var stateRequest = response.getRawValue();
            stateRequest.CountryId = this.country.Id;
            this.statedefinitionsservice.createState(stateRequest).then(() => {
                this.statedefinitionsservice.getCountry().then(() => {
                    this.refreshStateDefinitionsDataSource();
                });
            });
        });
    }

    /**
     * Edit editState
     *
     * @param state
     */
    editState(state): void {
        this.dialogRef = this._matDialog.open(StateFormDialogComponent, {
            panelClass: "statePopupForm-form-dialog",
            data: {
                state: state,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var stateRequest = formData.getRawValue();
            stateRequest.CountryId = this.country.CountryId;
            switch (actionType) {
                /**
                 * Save state
                 */
                case "save":
                    this.statedefinitionsservice
                        .updateState(stateRequest)
                        .then(() => {
                            this.statedefinitionsservice
                                .getCountry()
                                .then(() => {
                                    this.refreshStateDefinitionsDataSource();
                                });
                        });
                    break;
                /**
                 * Delete state
                 */
                case "delete":
                    this.deleteState(state);
                    break;
            }
        });
    }

    /**
     * deleteState
     */
    deleteState(state): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.statedefinitionsservice.deleteState(state).then(() => {
                    this.statedefinitionsservice.getCountry().then(() => {
                        this.refreshStateDefinitionsDataSource();
                    });
                });
            }
        });
    }
}
