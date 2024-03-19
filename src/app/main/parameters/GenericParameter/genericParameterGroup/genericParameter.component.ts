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
import GenericParameterDataSource from "./genericParameter.datasource";
import { GenericParameterGroup } from "../genericParameterGroups/genericParameterGroups.model";
import { GenericParameterGroupsService } from "../genericParameterGroups/genericParameterGroups.service";
import { GenericParameterService } from "./genericParameter.service";
import AddAlertGenericParameter from "./addGenericParameter";
import UpdateAlertGenericParameter from "./updateGenericParameter";
import { GenericParameterFormDialogComponent } from "./genericParemeterForm/genericParameterForm.component";

@Component({
    selector: "genericParameter",
    templateUrl: "./genericParameter.component.html",
    styleUrls: ["./genericParameter.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GenericParameterComponent {
    genericParameterDataSource: GenericParameterDataSource | null;
    dialogRef: any;
    genericParameterGroup: GenericParameterGroup;
    pageType: string;
    genericParameterForm: FormGroup;
    displayedColumns = [
        "Id",
        "GroupCode",
        "ParameterKey",
        "ParameterValue",
        "ParameterValue1",
        "Description",
        "Buttons",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    genericParameterPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    genericParameterSort: MatSort;
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
        private genericParameterGroupsService: GenericParameterGroupsService,
        private genericParameterService: GenericParameterService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private router: Router,
        private addAlertGenericParameter: AddAlertGenericParameter,
        private updateAlertGenericParameter: UpdateAlertGenericParameter,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.genericParameterGroup = new GenericParameterGroup();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.genericParameterDataSource = new GenericParameterDataSource(
            this.genericParameterGroupsService,
            this.genericParameterPaginator,
            this.genericParameterSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.genericParameterDataSource) {
                    return;
                }
                this.genericParameterDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.genericParameterService.onGenericParameterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((genericParameterGroup) => {
                if (genericParameterGroup) {
                    this.genericParameterGroup = new GenericParameterGroup(
                        genericParameterGroup
                    );
                    this.pageType = "edit";
                    this.genericParameterGroupsService.genericParameterList =
                        genericParameterGroup.GenericParameterList;
                } else {
                    this.pageType = "new";
                    this.genericParameterGroupsService.genericParameterList =
                        genericParameterGroup.GenericParameterList;
                }
                this.genericParameterForm = this.createGenericParameterForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshGenericParameterDataSource(): void {
        this.genericParameterDataSource = new GenericParameterDataSource(
            this.genericParameterGroupsService,
            this.genericParameterPaginator,
            this.genericParameterSort
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
     * createGenericParameterForm
     *
     * @returns {FormGroup}
     */
    createGenericParameterForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.genericParameterGroup.Id],
            ParameterValue: [this.genericParameterGroup.ParameterValue],
            GroupCode: [this.genericParameterGroup.GroupCode],
            Description: [this.genericParameterGroup.Description],
            ParameterKey: [this.genericParameterGroup.ParameterKey],
            ParameterValue1: [this.genericParameterGroup.ParameterValue1],
            ParameterValue2: [this.genericParameterGroup.ParameterValue2],
            ParameterValue3: [this.genericParameterGroup.ParameterValue3],
        });
    }

    /**
     * UpdateGenericParameterGroup
     */
    UpdateGenericParameterGroup(): void {
        const data = this.genericParameterForm.getRawValue();
        this.genericParameterService
            .UpdateGenericParameterGroup(data)
            .then(() => {
                this.genericParameterService.onGenericParameterChanged.next(
                    data
                );
                this.router.navigate([
                    "Parameters/GenericParameter/genericParameterGroups",
                ]);
                this.updateAlertGenericParameter.UpdateAlertGenericParameterShow();
                this.genericParameterGroupsService.GetGenericParameterGroups();
            });
    }

    /**
     * CreateGenericParameterGroup
     */
    CreateGenericParameterGroup(): void {
        const data = this.genericParameterForm.getRawValue();
        this.genericParameterService
            .CreateGenericParameterGroup(data)
            .then(() => {
                this.genericParameterService.onGenericParameterChanged.next(
                    data
                );
                this.router.navigate([
                    "Parameters/GenericParameter/genericParameterGroups",
                ]);
                this.addAlertGenericParameter.AddAlertGenericParameterShow();
                this.genericParameterGroupsService.GetGenericParameterGroups();
            });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(
            GenericParameterFormDialogComponent,
            {
                panelClass: "genericParameterForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var genericParameterRequest = response.getRawValue();
            genericParameterRequest.ConfigGroupId =
                this.genericParameterGroup.Id;
            this.genericParameterService
                .CreateGenericParameter(genericParameterRequest)
                .then(() => {
                    this.genericParameterService
                        .GetGenericParameterGroup()
                        .then(() => {
                            this.refreshGenericParameterDataSource();
                        });
                });
        });
    }

    /**
     * editGenericParameter
     *
     * @param genericParameterGroup
     */
    editGenericParameter(genericParameterGroup): void {
        this.dialogRef = this._matDialog.open(
            GenericParameterFormDialogComponent,
            {
                panelClass: "genericParameterForm-dialog",
                data: {
                    genericParameterGroup: genericParameterGroup,
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
            var genericParameterRequest = formData.getRawValue();
            genericParameterRequest.ConfigGroupId =
                this.genericParameterGroup.ConfigGroupId;
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.genericParameterService
                        .UpdateGenericParameter(genericParameterRequest)
                        .then(() => {
                            this.genericParameterService
                                .GetGenericParameterGroup()
                                .then(() => {
                                    this.refreshGenericParameterDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteGenericParameter
                 */
                case "delete":
                    this.DeleteGenericParameter(genericParameterGroup);
                    break;
            }
        });
    }

    /**
     * DeleteGenericParameter
     */
    DeleteGenericParameter(genericParameterGroup): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.genericParameterService
                    .DeleteGenericParameter(genericParameterGroup)
                    .then(() => {
                        this.genericParameterService
                            .GetGenericParameterGroup()
                            .then(() => {
                                this.refreshGenericParameterDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
