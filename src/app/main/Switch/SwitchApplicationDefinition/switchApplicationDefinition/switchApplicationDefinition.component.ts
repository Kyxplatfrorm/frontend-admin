import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import SwitchApplicationDefinitionDataSource, {
    HsmConnectionDataSource,
} from "./hsmConnection.datasource";
import { SwitchApplication } from "../switchApplicationDefinitions/switchApplicationDefinitions.model";
import { SwitchApplicationDefinitionsService } from "../switchApplicationDefinitions/switchApplicationDefinitions.service";
import { SwitchApplicationDefinitionService } from "./switchApplicationDefinition.service";
import {
    ApplicationProfilesEntity,
    HsmConnectionEnttity,
    RoutingListEntity,
    SessionListEntity,
    SwitchApplicationTypesEntity,
    UserTypeEntity,
} from "app/ui/switchApplicationDefinition";
import { Router } from "@angular/router";
import AddAlertSwitchAppDefinition from "./addSwitchAppDefinitionAlert";
import UpdateAlertSwitchApplicationDefinition from "./updateSwitchAppDefinitionAlert";
import { HsmConnectionFormDialogComponent } from "./hsmConnectionForm/hsmConnectionForm.component";

import RoutingDataSource from "./routing.datasource";
import SessionConnectionDataSource from "./sessionConnection.datasource";
import { SessionListFormDialogComponent } from "./sessionListForm/sessionListForm.component";
import { SessionDataSource } from "./session.datasource";
import SessionConfigDataSource from "./sessionConfig.datasource";
import { RoutingFormDialogComponent } from "./routingForm/routingForm.component";
import { SessionConfigFormDialogComponent } from "./sessionConfigForm/sessionConfigForm.component";
import { SessionConnectionFormDialogComponent } from "./sessionConnectionForm/sessionConnectionForm.component";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "switchApplicationDefinition",
    templateUrl: "./switchApplicationDefinition.component.html",
    styleUrls: ["./switchApplicationDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchApplicationDefinitionComponent {
    hsmConnectionDataSource: HsmConnectionDataSource | null;
    sessionDataSource: SessionDataSource | null;
    routingDataSource: RoutingDataSource | null;
    sessionConfigDataSource: SessionConfigDataSource | null;
    sessionConnectionDataSource: SessionConnectionDataSource | null;
    dialogRef: any;
    switchApplication: SwitchApplication;
    pageType: string;
    switchApplicaitonDefinitionForm: FormGroup;
    hsmConnectionList: HsmConnectionEnttity[];
    sessionList: SessionListEntity[];
    routingList: RoutingListEntity[];
    displayedColumns1 = [
        "Id",
        "HsmServiceName",
        "ConnectionCount",
        "ConnectionTimeout",
        "ConnectionCheckTimeSecond",
        "Buttons",
    ];
    displayedColumns2 = [
        "Id",
        "ConnectionType",
        "EndPointType",
        "Priority",
        "PinBlockFormat",
        "ConnectionTimeout",
        "ConnectionCheckTimeSecond",
        "Description",
        "Buttons",
    ];
    displayedColumns3 = [
        "Id",
        "RoutingRuleName",
        "FromSession",
        "ToSession",
        "Priority",
        "Buttons",
    ];
    displayedColumns4 = [
        "Id",
        "SessionName",
        "ConfigKey",
        "ConfigValue",
        "Buttons",
    ];
    displayedColumns5 = [
        "Id",
        "SessionName",
        "Priority",
        "Server",
        "Port",
        "PermittedIpAddress",
        "Buttons",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    switchApplicationDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchApplicationDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    userTypeList: UserTypeEntity[];
    applicationProfileList: ApplicationProfilesEntity[];
    switchApplicationType: SwitchApplicationTypesEntity[];

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
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private switchApplicationDefinitionService: SwitchApplicationDefinitionService,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private _matDialog: MatDialog,
        private addAlertSwitchAppDefinition: AddAlertSwitchAppDefinition,
        private updateAlertSwitchApplicationDefinition: UpdateAlertSwitchApplicationDefinition
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchApplication = new SwitchApplication();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.sessionDataSource = new SessionDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.sessionDataSource) {
                    return;
                }
                this.sessionDataSource.filter = this.filter.nativeElement.value;
            });

        this.hsmConnectionDataSource =
            new SwitchApplicationDefinitionDataSource(
                this.switchApplicationDefinitionService,
                this.switchApplicationDefinitionPaginator,
                this.switchApplicationDefinitionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.hsmConnectionDataSource) {
                    return;
                }
                this.hsmConnectionDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.routingDataSource = new RoutingDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.routingDataSource) {
                    return;
                }
                this.routingDataSource.filter = this.filter.nativeElement.value;
            });
        this.sessionConfigDataSource = new SessionConfigDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.sessionConfigDataSource) {
                    return;
                }
                this.sessionConfigDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.sessionConnectionDataSource = new SessionConnectionDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.sessionConnectionDataSource) {
                    return;
                }
                this.sessionConnectionDataSource.filter =
                    this.filter.nativeElement.value;
            });

        this.switchApplicationDefinitionsService.GetUserTypes().then(() => {
            this.userTypeList =
                this.switchApplicationDefinitionsService.userTypeApiResponse.ParameterList;
        });
        this.switchApplicationDefinitionsService
            .GetApplicationProfiles()
            .then(() => {
                this.applicationProfileList =
                    this.switchApplicationDefinitionsService.applicationProfilesApiResponse.ParameterList;
            });
        this.switchApplicationDefinitionsService
            .GetSwitchApplicationTypes()
            .then(() => {
                this.switchApplicationType =
                    this.switchApplicationDefinitionsService.switchApplicationTypesApiResponse.ParameterList;
            });

        this.switchApplicationDefinitionService.onSwitchApplicationDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchApplication) => {
                if (switchApplication) {
                    this.switchApplication = new SwitchApplication(
                        switchApplication
                    );
                    this.pageType = "edit";
                    this.switchApplicationDefinitionService.hsmConnectionList =
                        this.switchApplication.HsmConnectionList;
                    this.switchApplicationDefinitionService.sessionList =
                        this.switchApplication.SessionList;
                    this.switchApplicationDefinitionService.routingList =
                        this.switchApplication.RoutingList;
                    this.switchApplicationDefinitionService.sessionConfigList =
                        this.switchApplication.SessionConfigList;
                    this.switchApplicationDefinitionService.sessionConnectionList =
                        this.switchApplication.SessionConnectionList;
                } else {
                    this.pageType = "new";
                    this.switchApplication = new SwitchApplication();
                    this.switchApplicationDefinitionService.hsmConnectionList =
                        this.switchApplication.HsmConnectionList;
                    this.switchApplicationDefinitionService.sessionList =
                        this.switchApplication.SessionList;
                    this.switchApplicationDefinitionService.routingList =
                        this.switchApplication.RoutingList;
                    this.switchApplicationDefinitionService.sessionConfigList =
                        this.switchApplication.SessionConfigList;
                    this.switchApplicationDefinitionService.sessionConnectionList =
                        this.switchApplication.SessionConnectionList;
                }
                this.switchApplicaitonDefinitionForm =
                    this.createSwitchApplicationDefinitionForm();
            });
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
     * createSwitchApplicationDefinitionForm
     *
     * @returns {FormGroup}
     */
    createSwitchApplicationDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            ApplicationTypeId: [this.switchApplication.ApplicationTypeId],
            ApplicationType: [this.switchApplication.ApplicationType],
            ClusterId: [this.switchApplication.ClusterId],
            InstanceId: [this.switchApplication.InstanceId],
            ServiceName: [this.switchApplication.ServiceName],
            Description: [this.switchApplication.Description],
            UserTypeId: [this.switchApplication.UserTypeId],
            ServerAddress: [this.switchApplication.ServerAddress],
            ApplicationProfileId: [this.switchApplication.ApplicationProfileId],
            ThreadCount: [this.switchApplication.ThreadCount],
            HasRestApi: [this.switchApplication.HasRestApi],
            RestApiPort: [this.switchApplication.RestApiPort],
        });
    }

    /**
     * createSessionListForm
     *
     * @returns {FormGroup}
     */
    createSessionConfigForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchApplication.Id],
            SessionId: [this.switchApplication.SessionId],
            ConfigKey: [this.switchApplication.ConfigKey],
            ConfigValue: [this.switchApplication.ConfigValue],
        });
    }
    refreshSwitchApplicationHsmConnectionDataSource(): void {
        this.hsmConnectionDataSource =
            new SwitchApplicationDefinitionDataSource(
                this.switchApplicationDefinitionService,
                this.switchApplicationDefinitionPaginator,
                this.switchApplicationDefinitionSort
            );
    }
    refreshSwitchApplicationSessionDataSource(): void {
        this.sessionDataSource = new SessionDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
    }
    refreshSwitchApplicationRoutingDataSource(): void {
        this.routingDataSource = new RoutingDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
    }
    refreshSwitchApplicationSessionConfigDataSource(): void {
        this.sessionConfigDataSource = new SessionConfigDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
    }
    refreshSwitchApplicationSessionConnectionDataSource(): void {
        this.sessionConnectionDataSource = new SessionConnectionDataSource(
            this.switchApplicationDefinitionService,
            this.switchApplicationDefinitionPaginator,
            this.switchApplicationDefinitionSort
        );
    }

    /**
     * CreateSwitchApplication
     */
    CreateSwitchApplication(): void {
        const data = this.switchApplicaitonDefinitionForm.getRawValue();
        this.switchApplicationDefinitionService
            .CreateSwitchApplication(data)
            .then(() => {
                this.switchApplicationDefinitionService.onSwitchApplicationDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "Switch/SwitchApplicationDefinition/switchApplicationDefinitions",
                ]);
            });
        this.addAlertSwitchAppDefinition.AddAlertSwitchAppDefinitionShow();
    }
    /**
     * UpdateSwitchApplication
     */
    UpdateSwitchApplication(): void {
        const data = this.switchApplicaitonDefinitionForm.getRawValue();
        this.switchApplicationDefinitionService
            .UpdateSwitchApplication(data)
            .then(() => {
                this.switchApplicationDefinitionService.onSwitchApplicationDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "Switch/SwitchApplicationDefinition/switchApplicationDefinitions",
                ]);
            });
        this.updateAlertSwitchApplicationDefinition.UpdateAlertSwitchApplicationDefinitionShow();
    }

    /**
     * newHsmConncetionForm
     */
    newHsmConncetionForm(): void {
        this.dialogRef = this._matDialog.open(
            HsmConnectionFormDialogComponent,
            {
                panelClass: "hsmConnectionForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchApplicationDefRequest = response.getRawValue();
            switchApplicationDefRequest.ApplicationId =
                this.switchApplication.Id;
            this.switchApplicationDefinitionService
                .CreateSwitchApplicationHsmConnection(
                    switchApplicationDefRequest
                )
                .then(() => {
                    this.switchApplicationDefinitionService
                        .GetSwitchApplication()
                        .then(() => {
                            this.refreshSwitchApplicationHsmConnectionDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchApplicationDefinition
     *
     * @param switchApplication
     */
    EditSwitchApplicationHsmConnection(switchApplication): void {
        this.dialogRef = this._matDialog.open(
            HsmConnectionFormDialogComponent,
            {
                panelClass: "hsmConnectionForm-dialog",
                data: {
                    switchApplication: switchApplication,
                    action: "edit",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var switchApplicationDefRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.switchApplicationDefinitionService
                        .UpdateSwitchApplicationHsmConnection(
                            switchApplicationDefRequest
                        )
                        .then(() => {
                            this.switchApplicationDefinitionService
                                .GetSwitchApplication()
                                .then(() => {
                                    this.refreshSwitchApplicationHsmConnectionDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchApplicationHsmConnection
                 */
                case "delete":
                    this.DeleteSwitchApplicationHsmConnection(
                        switchApplication
                    );
                    break;
            }
        });
    }

    /**
     * DeleteSwitchApplicationHsmConnection
     */
    DeleteSwitchApplicationHsmConnection(switchApplication): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchApplicationDefinitionService
                    .DeleteSwitchApplicationHsmConnection(switchApplication)
                    .then(() => {
                        this.switchApplicationDefinitionService
                            .GetSwitchApplication()
                            .then(() => {
                                this.refreshSwitchApplicationHsmConnectionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    /**
     * newSessionForm
     */
    newSessionForm(): void {
        this.dialogRef = this._matDialog.open(SessionListFormDialogComponent, {
            panelClass: "sessionListForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchApplicationSessionRequest = response.getRawValue();
            switchApplicationSessionRequest.ApplicationId =
                this.switchApplication.Id;
            this.switchApplicationDefinitionService
                .CreateSwitchApplicationSession(switchApplicationSessionRequest)
                .then(() => {
                    this.switchApplicationDefinitionService
                        .GetSwitchApplication()
                        .then(() => {
                            this.refreshSwitchApplicationSessionDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchApplicationSession
     *
     * @param switchApplication
     */
    EditSwitchApplicationSession(switchApplication): void {
        this.dialogRef = this._matDialog.open(SessionListFormDialogComponent, {
            panelClass: "sessionListForm-dialog",
            data: {
                switchApplication: switchApplication,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var switchApplicationSessionRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.switchApplicationDefinitionService
                        .UpdateSwitchApplicationSession(
                            switchApplicationSessionRequest
                        )
                        .then(() => {
                            this.switchApplicationDefinitionService
                                .GetSwitchApplication()
                                .then(() => {
                                    this.refreshSwitchApplicationSessionDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchApplicationSession
                 */
                case "delete":
                    this.DeleteSwitchApplicationSession(switchApplication);
                    break;
            }
        });
    }

    /**
     * DeleteSwitchApplicationSession
     */
    DeleteSwitchApplicationSession(switchApplication): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchApplicationDefinitionService
                    .DeleteSwitchApplicationSession(switchApplication)
                    .then(() => {
                        this.switchApplicationDefinitionService
                            .GetSwitchApplication()
                            .then(() => {
                                this.refreshSwitchApplicationSessionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    /**
     * newRoutingForm
     */
    newRoutingForm(): void {
        this.dialogRef = this._matDialog.open(RoutingFormDialogComponent, {
            panelClass: "routingForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchApplicationRoutingRequest = response.getRawValue();
            switchApplicationRoutingRequest.ApplicationId =
                this.switchApplication.Id;
            this.switchApplicationDefinitionService
                .CreateSwitchApplicationRouting(switchApplicationRoutingRequest)
                .then(() => {
                    this.switchApplicationDefinitionService
                        .GetSwitchApplication()
                        .then(() => {
                            this.refreshSwitchApplicationRoutingDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchApplicationRouting
     *
     * @param switchApplication
     */
    EditSwitchApplicationRouting(switchApplication): void {
        this.dialogRef = this._matDialog.open(RoutingFormDialogComponent, {
            panelClass: "routingForm-dialog",
            data: {
                switchApplication: switchApplication,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var switchApplicationRoutingRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.switchApplicationDefinitionService
                        .UpdateSwitchApplicationRouting(
                            switchApplicationRoutingRequest
                        )
                        .then(() => {
                            this.switchApplicationDefinitionService
                                .GetSwitchApplication()
                                .then(() => {
                                    this.refreshSwitchApplicationRoutingDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchApplicationRouting
                 */
                case "delete":
                    this.DeleteSwitchApplicationRouting(switchApplication);
                    break;
            }
        });
    }

    /**
     * DeleteSwitchApplicationRouting
     */
    DeleteSwitchApplicationRouting(switchApplication): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchApplicationDefinitionService
                    .DeleteSwitchApplicationRouting(switchApplication)
                    .then(() => {
                        this.switchApplicationDefinitionService
                            .GetSwitchApplication()
                            .then(() => {
                                this.refreshSwitchApplicationRoutingDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    /**
     * newSessionConfigForm
     */
    newSessionConfigForm(): void {
        this.dialogRef = this._matDialog.open(
            SessionConfigFormDialogComponent,
            {
                panelClass: "sessionConfigForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchApplicationSessionConfigRequest = response.getRawValue();
            switchApplicationSessionConfigRequest.Id =
                this.switchApplication.SessionId;

            this.switchApplicationDefinitionService
                .CreateSwitchApplicationSessionConfig(
                    switchApplicationSessionConfigRequest
                )
                .then(() => {
                    this.switchApplicationDefinitionService
                        .GetSwitchApplication()
                        .then(() => {
                            this.refreshSwitchApplicationSessionConfigDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchApplicationSessionConfig
     *
     * @param switchApplication
     */
    EditSwitchApplicationSessionConfig(switchApplication): void {
        this.dialogRef = this._matDialog.open(
            SessionConfigFormDialogComponent,
            {
                panelClass: "sessionConfigForm-dialog",
                data: {
                    switchApplication: switchApplication,
                    action: "edit",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var switchApplicationSessionConfigRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.switchApplicationDefinitionService
                        .UpdateSwitchApplicationSessionConfig(
                            switchApplicationSessionConfigRequest
                        )
                        .then(() => {
                            this.switchApplicationDefinitionService
                                .GetSwitchApplication()
                                .then(() => {
                                    this.refreshSwitchApplicationSessionConfigDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchApplicationSessionConfig
                 */
                case "delete":
                    this.DeleteSwitchApplicationSessionConfig(
                        switchApplication
                    );
                    break;
            }
        });
    }

    /**
     * DeleteSwitchApplicationSessionConfig
     */
    DeleteSwitchApplicationSessionConfig(switchApplication): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchApplicationDefinitionService
                    .DeleteSwitchApplicationSessionConfig(switchApplication)
                    .then(() => {
                        this.switchApplicationDefinitionService
                            .GetSwitchApplication()
                            .then(() => {
                                this.refreshSwitchApplicationSessionConfigDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    /**
     * newSessionConnectionForm
     */
    newSessionConnectionForm(): void {
        this.dialogRef = this._matDialog.open(
            SessionConnectionFormDialogComponent,
            {
                panelClass: "sessionConnectionForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchApplicationSessionConnectionRequest =
                response.getRawValue();

            switchApplicationSessionConnectionRequest.Id =
                this.switchApplication.SessionId;
            this.switchApplicationDefinitionService
                .CreateSwitchApplicationSessionConnection(
                    switchApplicationSessionConnectionRequest
                )
                .then(() => {
                    this.switchApplicationDefinitionService
                        .GetSwitchApplication()
                        .then(() => {
                            this.refreshSwitchApplicationSessionConnectionDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchApplicationSessionConnection
     *
     * @param switchApplication
     */
    EditSwitchApplicationSessionConnection(switchApplication): void {
        this.dialogRef = this._matDialog.open(
            SessionConnectionFormDialogComponent,
            {
                panelClass: "sessionConnectionForm-dialog",
                data: {
                    switchApplication: switchApplication,
                    action: "edit",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var switchApplicationSessionConnectionRequest =
                formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.switchApplicationDefinitionService
                        .UpdateSwitchApplicationSessionConnection(
                            switchApplicationSessionConnectionRequest
                        )
                        .then(() => {
                            this.switchApplicationDefinitionService
                                .GetSwitchApplication()
                                .then(() => {
                                    this.refreshSwitchApplicationSessionConnectionDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchApplicationSessionConnection
                 */
                case "delete":
                    this.DeleteSwitchApplicationSessionConnection(
                        switchApplication
                    );
                    break;
            }
        });
    }

    /**
     * DeleteSwitchApplicationSessionConnection
     */
    DeleteSwitchApplicationSessionConnection(switchApplication): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchApplicationDefinitionService
                    .DeleteSwitchApplicationSessionConnection(switchApplication)
                    .then(() => {
                        this.switchApplicationDefinitionService
                            .GetSwitchApplication()
                            .then(() => {
                                this.refreshSwitchApplicationSessionConnectionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
