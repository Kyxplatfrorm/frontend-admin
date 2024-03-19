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
import SwitchMessageProfilesDataSource from "./switchMessageProfiles.datasource";
import { SwitchMessageProfilesService } from "./switchMessageProfiles.service";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { SwitchMessageFormDialogComponent } from "./switchMessageProfileForm/switchMessageProfileForm.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import AddAlertSwitchMessage from "./addSwitchMesaageAlert";
import UpdateAlertSwitchMessage from "./updateSwitchMessageAlert";
import { SwitchMessageProfile } from "../switchCardNetworks/switchCardNetworks.model";
import SwitchCardNetworksDataSource from "../switchCardNetworks/switchCardNetworks.datasource";
import { toNumber } from "lodash";

@Component({
    selector: "switchMessageProfiles",
    templateUrl: "./switchMessageProfiles.component.html",
    styleUrls: ["./switchMessageProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchMessageProfilesComponent implements OnInit {
    switchMessageProfilesDataSource: SwitchMessageProfilesDataSource | null;
    switchCardNetworksDataSource: SwitchCardNetworksDataSource | null;
    displayedColumns = [
        "Id",
        "NetworkTypeName",
        "NetworkMessageTypeName",
        "RequestMti",
        "ResponseMti",
        "RequestMessageProfile",
        "ResponseMessageProfile",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    switchMessageProfileForm: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchMessageProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchMessageProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;
    routeParams: any;
    switchMessageProfile: SwitchMessageProfile;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchMessageProfilesService: SwitchMessageProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private translate: TranslateService,
        private router: Router,
        private _router: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private addAlertSwitchMessage: AddAlertSwitchMessage,
        private updateAlertSwitchMessage: UpdateAlertSwitchMessage,
        private route: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = this.route.params;
    }

    ngOnInit(): void {
        this.switchMessageProfilesDataSource =
            new SwitchMessageProfilesDataSource(
                this.switchMessageProfilesService,
                this.switchMessageProfilesPaginator,
                this.switchMessageProfilesSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchMessageProfilesDataSource) {
                    return;
                }
                this.switchMessageProfilesDataSource.filter =
                    this.filter.nativeElement.value;
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

    refreshSwitchMessageProfilesDataSource(): void {
        this.switchMessageProfilesDataSource =
            new SwitchMessageProfilesDataSource(
                this.switchMessageProfilesService,
                this.switchMessageProfilesPaginator,
                this.switchMessageProfilesSort
            );
    }

    /**
     * SwitchMessage
     */
    SwitchMessage(): void {
        this.dialogRef = this._matDialog.open(
            SwitchMessageFormDialogComponent,
            {
                panelClass: "switchMessageProfileForm-dialog",
                data: {
                    action: "new",
                    NetworkTypeId: toNumber(this.routeParams._value.id),
                },
            }
        );

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchMessageProfileRequest = response.getRawValue();
            this.switchMessageProfilesService
                .CreateSwitchMessageProfile(switchMessageProfileRequest)
                .then(() => {
                    this.switchMessageProfilesService
                        .GetSwitchMessageProfiles()
                        .then(() => {
                            this.addAlertSwitchMessage.AddAlertSwitchMessageShow();
                            this.refreshSwitchMessageProfilesDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchMessageProfile
     *
     * @param switchMessageProfile
     */
    EditSwitchMessageProfile(switchMessageProfile): void {
        this.dialogRef = this._matDialog.open(
            SwitchMessageFormDialogComponent,
            {
                panelClass: "switchMessageProfileForm-dialog",
                data: {
                    switchMessageProfile: switchMessageProfile,
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
            var switchMessageProfileRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.switchMessageProfilesService
                        .UpdateSwitchMessageProfile(switchMessageProfileRequest)
                        .then(() => {
                            this.switchMessageProfilesService
                                .GetSwitchMessageProfiles()
                                .then(() => {
                                    this.updateAlertSwitchMessage.UpdateAlertSwitchMessageShow();
                                    this.refreshSwitchMessageProfilesDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchMessageProfile
                 */
                case "delete":
                    this.DeleteSwitchMessageProfile(switchMessageProfile);
                    break;
            }
        });
    }

    /**
     * DeleteSwitchMessageProfile
     */
    DeleteSwitchMessageProfile(switchMessageProfile): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchMessageProfilesService
                    .DeleteSwitchMessageProfile(switchMessageProfile)

                    .then(() => {
                        this.switchMessageProfilesService
                            .GetSwitchMessageProfiles()
                            .then(() => {
                                this.refreshSwitchMessageProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
