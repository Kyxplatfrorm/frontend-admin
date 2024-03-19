import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
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
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import GenericConfigDataSource from "./genericConfig.datasource";
import { GenericConfigGroups } from "../genericConfigGroups/genericConfigGroups.model";
import { GenericConfigService } from "./genericConfig.service";
import { GenericConfigFormDialogComponent } from "./genericConfigForm/genericConfigForm.component";
import { GenericConfigGroupsService } from "../genericConfigGroups/genericConfigGroups.service";
import AddAlertGenericConfig from "./addGenericConfig";
import UpdateAlertGenericConfig from "./updateGenericConfig";

@Component({
    selector: "genericConfig",
    templateUrl: "./genericConfig.component.html",
    styleUrls: ["./genericConfig.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GenericConfigComponent {
    genericConfigDataSource: GenericConfigDataSource | null;
    dialogRef: any;
    genericConfigGroups: GenericConfigGroups;
    pageType: string;
    genericConfigForm: FormGroup;
    displayedColumns = ["Id", "ConfigKey", "ConfigValue", "Buttons"];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: true })
    genericConfigPaginator: MatPaginator;

    @ViewChild(MatSort, { static: true })
    genericConfigSort: MatSort;
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
        private genericConfigGroupsService: GenericConfigGroupsService,
        private genericConfigService: GenericConfigService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertGenericConfig: AddAlertGenericConfig,
        private updateAlertGenericConfig: UpdateAlertGenericConfig,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.genericConfigGroups = new GenericConfigGroups();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.genericConfigDataSource = new GenericConfigDataSource(
            this.genericConfigGroupsService,
            this.genericConfigPaginator,
            this.genericConfigSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.genericConfigDataSource) {
                    return;
                }
                this.genericConfigDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.genericConfigService.onGenericConfigChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((genericConfigGroups) => {
                if (genericConfigGroups) {
                    this.genericConfigGroups = new GenericConfigGroups(
                        genericConfigGroups
                    );
                    this.pageType = "edit";
                    this.genericConfigGroupsService.genericConfigList =
                        genericConfigGroups.GenericConfigList;
                } else {
                    this.pageType = "new";
                    this.genericConfigGroupsService.genericConfigList =
                        genericConfigGroups.GenericConfigList;
                }
                this.genericConfigForm = this.createGenericConfigForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshGenericConfigDataSource(): void {
        this.genericConfigDataSource = new GenericConfigDataSource(
            this.genericConfigGroupsService,
            this.genericConfigPaginator,
            this.genericConfigSort
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
     * createGenericConfigForm
     *
     * @returns {FormGroup}
     */
    createGenericConfigForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.genericConfigGroups.Id],
            ConfigGroupId: [this.genericConfigGroups.ConfigGroupId],
            GroupCode: [this.genericConfigGroups.GroupCode],
            Description: [this.genericConfigGroups.Description],
            ConfigKey: [this.genericConfigGroups.ConfigKey],
            ConfigValue: [this.genericConfigGroups.ConfigValue],
        });
    }

    /**
     * UpdateGenericConfigGroup
     */
    UpdateGenericConfigGroup(): void {
        const data = this.genericConfigForm.getRawValue();
        this.genericConfigService.UpdateGenericConfigGroup(data).then(() => {
            this.genericConfigService.onGenericConfigChanged.next(data);
            this.router.navigate([
                "Parameters/GenericConfig/genericConfigGroups",
            ]);
            this.updateAlertGenericConfig.UpdateAlertGenericConfigShow();
            this.genericConfigGroupsService.GetGenericConfigGroups();
        });
    }

    /**
     * CreateGenericConfigGroup
     */
    CreateGenericConfigGroup(): void {
        const data = this.genericConfigForm.getRawValue();
        this.genericConfigService.CreateGenericConfigGroup(data).then(() => {
            this.genericConfigService.onGenericConfigChanged.next(data);
            this.router.navigate([
                "Parameters/GenericConfig/genericConfigGroups",
            ]);
            this.addAlertGenericConfig.AddAlertGenericConfigShow();
            this.genericConfigGroupsService.GetGenericConfigGroups();
        });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(
            GenericConfigFormDialogComponent,
            {
                panelClass: "genericConfigForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var genericConfigRequest = response.getRawValue();
            genericConfigRequest.ConfigGroupId = this.genericConfigGroups.Id;
            this.genericConfigService
                .CreateGenericConfig(genericConfigRequest)
                .then(() => {
                    this.genericConfigService
                        .GetGenericConfigGroup()
                        .then(() => {
                            this.refreshGenericConfigDataSource();
                        });
                });
        });
    }

    /**
     * editGenericConfig
     *
     * @param genericConfig
     */
    editGenericConfig(genericConfig): void {
        this.dialogRef = this._matDialog.open(
            GenericConfigFormDialogComponent,
            {
                panelClass: "genericConfigForm-dialog",
                data: {
                    genericConfig: genericConfig,
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
            var genericConfigRequest = formData.getRawValue();
            genericConfigRequest.ConfigGroupId =
                this.genericConfigGroups.ConfigGroupId;
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.genericConfigService
                        .UpdateGenericConfig(genericConfigRequest)
                        .then(() => {
                            this.genericConfigService
                                .GetGenericConfigGroup()
                                .then(() => {
                                    this.refreshGenericConfigDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteGenericConfig
                 */
                case "delete":
                    this.DeleteGenericConfig(genericConfig);
                    break;
            }
        });
    }

    /**
     * DeleteGenericConfig
     */
    DeleteGenericConfig(genericConfig): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.genericConfigService
                    .DeleteGenericConfig(genericConfig)
                    .then(() => {
                        this.genericConfigService
                            .GetGenericConfigGroup()
                            .then(() => {
                                this.refreshGenericConfigDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
