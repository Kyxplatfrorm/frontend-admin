import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Observable, ReplaySubject, Subject } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    takeUntil,
} from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import HsmServiceDefinitionDataSource from "./hsmServiceDefinition.datasource";
import { HsmService } from "../hsmServiceDefinitions/hsmServiceDefinitions.model";
import { HsmServiceDefinitionService } from "./hsmServiceDefinition.service";
import { HsmServiceDefinitionsService } from "../hsmServiceDefinitions/hsmServiceDefinitions.service";
import AddAlertHsmService from "./addHsmServiceAlert";
import UpdateAlertHsmService from "./updateHsmServiceAlert";
import { HsmServiceFormDialogComponent } from "./hsmServiceForm/hsmServiceForm.component";
import {
    ApplicationProfilesEntity,
    UserTypeEntity,
} from "app/ui/hsmServiceDefinition";

@Component({
    selector: "hsmServiceDefinition",
    templateUrl: "./hsmServiceDefinition.component.html",
    styleUrls: ["./hsmServiceDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class HsmServiceDefinitionComponent {
    hsmServiceDefinitionDataSource: HsmServiceDefinitionDataSource | null;
    dialogRef: any;
    hsmService: HsmService;
    pageType: string;
    hsmServiceForm: FormGroup;
    displayedColumns = [
        "ApplicationId",
        "HsmDeviceName",
        "ConnectionCount",
        "ConnectionTimeout",
        "ConnectionCheckTimeSecond",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    hsmServiceDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    hsmServiceDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    userTypeList: UserTypeEntity[];
    applicationProfileList: ApplicationProfilesEntity[];

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
        private hsmServiceDefinitionsService: HsmServiceDefinitionsService,
        private hsmServiceDefinitionService: HsmServiceDefinitionService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addHsmServiceAlert: AddAlertHsmService,
        private updateHsmServiceAlert: UpdateAlertHsmService,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.hsmService = new HsmService();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.hsmServiceDefinitionsService.GetUserTypes().then(() => {
            this.userTypeList =
                this.hsmServiceDefinitionsService.userTypeApiResponse.ParameterList;
        });
        this.hsmServiceDefinitionsService.GetApplicationProfiles().then(() => {
            this.applicationProfileList =
                this.hsmServiceDefinitionsService.applicationProfilesApiResponse.ParameterList;
        });

        this.hsmServiceDefinitionDataSource =
            new HsmServiceDefinitionDataSource(
                this.hsmServiceDefinitionService,
                this.hsmServiceDefinitionPaginator,
                this.hsmServiceDefinitionSort
            );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.hsmServiceDefinitionDataSource) {
                    return;
                }
                this.hsmServiceDefinitionDataSource.filter =
                    this.filter.nativeElement.value;
            });

        this.hsmServiceDefinitionService.onHsmServiceDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((hsmService) => {
                if (hsmService) {
                    this.hsmService = new HsmService(hsmService);
                    this.pageType = "edit";
                    this.hsmServiceDefinitionService.hsmConnectionList =
                        hsmService.HsmConnectionList;
                } else {
                    this.pageType = "new";
                    this.hsmServiceDefinitionService.hsmConnectionList =
                        hsmService.HsmConnectionList;
                }

                this.hsmServiceForm = this.createHsmServiceForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshHsmServiceDefinitionDataSource(): void {
        this.hsmServiceDefinitionDataSource =
            new HsmServiceDefinitionDataSource(
                this.hsmServiceDefinitionService,
                this.hsmServiceDefinitionPaginator,
                this.hsmServiceDefinitionSort
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createHsmServiceForm
     *
     * @returns {FormGroup}
     */
    createHsmServiceForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.hsmService.Id],
            ServiceName: [this.hsmService.ServiceName],
            Description: [this.hsmService.Description],
            UserTypeId: [this.hsmService.UserTypeId],
            ServerAddress: [this.hsmService.ServerAddress],
            ServerPort: [this.hsmService.ServerPort],
            ApplicationProfileId: [this.hsmService.ApplicationProfileId],
            ClusterId: [this.hsmService.ClusterId],
            InstanceId: [this.hsmService.InstanceId],
            ThreadCount: [this.hsmService.ThreadCount],
            HasRestApi: [this.hsmService.HasRestApi],
            RestApiPort: [this.hsmService.RestApiPort],
            ConnectionTimeout: [this.hsmService.ConnectionTimeout],
            ConnectionCheckTimeSecond: [
                this.hsmService.ConnectionCheckTimeSecond,
            ],
        });
    }

    /**
     * UpdateHsmServiceDefinition
     */
    UpdateHsmServiceDefinition(): void {
        const data = this.hsmServiceForm.getRawValue();
        this.hsmServiceDefinitionService
            .UpdateHsmServiceDefinition(data)
            .then(() => {
                this.hsmServiceDefinitionService.onHsmServiceDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "Switch/HsmServiceDefinition/hsmServiceDefinitions",
                ]);
                this.updateHsmServiceAlert.UpdateAlertHsmServiceShow();
                this.hsmServiceDefinitionsService.GetHsmServiceDefinitions();
            });
    }

    /**
     * CreateHsmServiceDefinition
     */
    CreateHsmServiceDefinition(): void {
        const data = this.hsmServiceForm.getRawValue();
        this.hsmServiceDefinitionService
            .CreateHsmServiceDefinition(data)
            .then(() => {
                this.hsmServiceDefinitionService.onHsmServiceDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "Switch/HsmServiceDefinition/hsmServiceDefinitions",
                ]);
                this.addHsmServiceAlert.AddAlertHsmServiceShow();
                this.hsmServiceDefinitionsService.GetHsmServiceDefinitions();
            });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(HsmServiceFormDialogComponent, {
            panelClass: "hsmServiceForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var hsmServiceRequest = response.getRawValue();
            hsmServiceRequest.ApplicationId = this.hsmService.Id;
            this.hsmServiceDefinitionService
                .CreateHsmDeviceConnection(hsmServiceRequest)
                .then(() => {
                    this.hsmServiceDefinitionService
                        .GetHsmServiceDefinition()
                        .then(() => {
                            this.refreshHsmServiceDefinitionDataSource();
                        });
                });
        });
    }

    /**
     * EditHsmService
     *
     * @param hsmService
     */
    EditHsmService(hsmService): void {
        this.dialogRef = this._matDialog.open(HsmServiceFormDialogComponent, {
            panelClass: "hsmServiceForm-dialog",
            data: {
                hsmService: hsmService,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var hsmServiceRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.hsmServiceDefinitionService
                        .UpdateHsmDeviceConnection(hsmServiceRequest)
                        .then(() => {
                            this.hsmServiceDefinitionService
                                .GetHsmServiceDefinition()
                                .then(() => {
                                    this.refreshHsmServiceDefinitionDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteHsmDeviceConnection
                 */
                case "delete":
                    this.DeleteHsmDeviceConnection(hsmService);
                    break;
            }
        });
    }

    /**
     * DeleteHsmDeviceConnection
     */
    DeleteHsmDeviceConnection(hsmService): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.hsmServiceDefinitionService
                    .DeleteHsmDeviceConnection(hsmService)
                    .then(() => {
                        this.hsmServiceDefinitionService
                            .GetHsmServiceDefinition()
                            .then(() => {
                                this.refreshHsmServiceDefinitionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
