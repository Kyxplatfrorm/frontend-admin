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
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { toNumber } from "lodash";
import SwitchTransactionCodeMapDataSource from "./switchTransactionCodeMap.datasource";
import { SwitchTransactionCodeMapService } from "./switchTransactionCodeMap.service";
import AddAlertSwitchTransactionCodeMap from "./addSwitchTransactionCodeMapAlert";
import UpdateAlertSwitchTransactionCodeMap from "./updateSwitchTransactionCodeMapAlert";
import { SwitchTransactionCodeMapFormDialogComponent } from "./switchTransactionCodeMapForm/switchTransactionCodeMapForm.component";

@Component({
    selector: "switchTransactionCodeMap",
    templateUrl: "./switchTransactionCodeMap.component.html",
    styleUrls: ["./switchTransactionCodeMap.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchTransactionCodeMapComponent implements OnInit {
    switchTransactionCodeMapDataSource: SwitchTransactionCodeMapDataSource | null;
    displayedColumns = [
        "Id",
        "Description",
        "IsActive",
        "InsertDateTime",
        "NetworkTypeName",
        "TransactionEntryTypeName",
        "ProcessingCode",
        "TransactionAmount",
        "Mti",
        "Priority",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    switchMessageProfileForm: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchTransactionCodeMapPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchTransactionCodeMapSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;
    routeParams: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchTransactionCodeMapService: SwitchTransactionCodeMapService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private translate: TranslateService,
        private router: Router,
        private _router: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private addAlertSwitchTransactionCodeMap: AddAlertSwitchTransactionCodeMap,
        private updateAlertSwitchTransactionCodeMap: UpdateAlertSwitchTransactionCodeMap,
        private route: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = this.route.params;
    }

    ngOnInit(): void {
        this.switchTransactionCodeMapDataSource =
            new SwitchTransactionCodeMapDataSource(
                this.switchTransactionCodeMapService,
                this.switchTransactionCodeMapPaginator,
                this.switchTransactionCodeMapSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchTransactionCodeMapDataSource) {
                    return;
                }
                this.switchTransactionCodeMapDataSource.filter =
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

    refreshSwitchTransactionCodeMapDataSource(): void {
        this.switchTransactionCodeMapDataSource =
            new SwitchTransactionCodeMapDataSource(
                this.switchTransactionCodeMapService,
                this.switchTransactionCodeMapPaginator,
                this.switchTransactionCodeMapSort
            );
    }

    /**
     * SwitchTransactionCodeMap
     */
    SwitchTransactionCodeMap(): void {
        this.dialogRef = this._matDialog.open(
            SwitchTransactionCodeMapFormDialogComponent,
            {
                panelClass: "switchTransactionCodeMapForm-dialog",
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
            this.switchTransactionCodeMapService
                .CreateSwitchTransactionCodeMap(switchMessageProfileRequest)
                .then(() => {
                    this.switchTransactionCodeMapService
                        .GetSwitchTransactionCodeMap()
                        .then(() => {
                            this.addAlertSwitchTransactionCodeMap.AddAlertSwitchTransactionCodeMapShow();
                            this.refreshSwitchTransactionCodeMapDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchMessageProfile
     *
     * @param switchTransactionCodeMap
     */
    EditSwitchMessageProfile(switchTransactionCodeMap): void {
        this.dialogRef = this._matDialog.open(
            SwitchTransactionCodeMapFormDialogComponent,
            {
                panelClass: "switchTransactionCodeMapForm-dialog",
                data: {
                    switchTransactionCodeMap: switchTransactionCodeMap,
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
            var switchTransactionCodeMapRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.switchTransactionCodeMapService
                        .UpdateSwitchTransactionCodeMap(
                            switchTransactionCodeMapRequest
                        )
                        .then(() => {
                            this.switchTransactionCodeMapService
                                .GetSwitchTransactionCodeMap()
                                .then(() => {
                                    this.updateAlertSwitchTransactionCodeMap.UpdateAlertSwitchTransactionCodeMapShow();
                                    this.refreshSwitchTransactionCodeMapDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchTransactionCodeMap
                 */
                case "delete":
                    this.DeleteSwitchTransactionCodeMap(
                        switchTransactionCodeMap
                    );
                    break;
            }
        });
    }

    /**
     * DeleteSwitchMessageProfile
     */
    DeleteSwitchTransactionCodeMap(switchTransactionCodeMap): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchTransactionCodeMapService
                    .DeleteSwitchTransactionCodeMap(switchTransactionCodeMap)
                    .then(() => {
                        this.switchTransactionCodeMapService
                            .GetSwitchTransactionCodeMap()
                            .then(() => {
                                this.refreshSwitchTransactionCodeMapDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
