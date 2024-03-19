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
import { ResourceGroupDataSource } from "./resourceGroup.datasource";
import { ResourceGroup } from "../resourceGroups/resourceGroups.model";
import { ResourceGroupsService } from "../resourceGroups/resourceGroups.service";
import { ResourceGroupService } from "./resourceGroup.service";
import { ResourceGroupFormDialogComponent } from "./resourceGroupForm/resourceGroupForm.component";
import AddAlertResourceGroup from "./addResourceGroup";
import UpdateAlertResourceGroup from "./updateResourceGroup";

@Component({
    selector: "resourceGroup",
    templateUrl: "./resourceGroup.component.html",
    styleUrls: ["./resourceGroup.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ResourceGroupComponent {
    resourceGroupDataSource: ResourceGroupDataSource | null;
    dialogRef: any;
    resourceGroup: ResourceGroup;
    pageType: string;
    resourceGroupForm: FormGroup;
    displayedColumns = [
        "Id",
        "ResourceCode",
        "ResourceGroupCode",
        "LanguageCode",
        "Description",
        "Buttons",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: true })
    resourceGroupPaginator: MatPaginator;

    @ViewChild(MatSort, { static: true })
    resourceGroupSort: MatSort;
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
        private resourceGroupsService: ResourceGroupsService,
        private resourceGroupService: ResourceGroupService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertResourceGroup: AddAlertResourceGroup,
        private updateAlertResourceGroup: UpdateAlertResourceGroup,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.resourceGroup = new ResourceGroup();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.resourceGroupDataSource = new ResourceGroupDataSource(
            this.resourceGroupService,
            this.resourceGroupPaginator,
            this.resourceGroupSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.resourceGroupDataSource) {
                    return;
                }
                this.resourceGroupDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.resourceGroupService.onResourceGroupChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resourceGroup) => {
                if (resourceGroup) {
                    this.resourceGroup = new ResourceGroup(resourceGroup);
                    this.pageType = "edit";
                    this.resourceGroupService.resourceList =
                        resourceGroup.ResourceList;
                } else {
                    this.pageType = "new";
                    this.resourceGroupService.resourceList =
                        resourceGroup.ResourceList;
                }
                this.resourceGroupForm = this.createResourceGroupForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshResourceGroupDataSource(): void {
        this.resourceGroupDataSource = new ResourceGroupDataSource(
            this.resourceGroupService,
            this.resourceGroupPaginator,
            this.resourceGroupSort
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
     * createResourceGroupForm
     *
     * @returns {FormGroup}
     */
    createResourceGroupForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.resourceGroup.Id],
            ConfigGroupId: [this.resourceGroup.ConfigGroupId],
            GroupCode: [this.resourceGroup.GroupCode],
            Description: [this.resourceGroup.Description],
            ResourceCode: [this.resourceGroup.ResourceCode],
            LanguageCode: [this.resourceGroup.LanguageCode],
        });
    }

    /**
     * UpdateResourceGroup
     */
    UpdateResourceGroup(): void {
        const data = this.resourceGroupForm.getRawValue();
        this.resourceGroupService.UpdateResourceGroup(data).then(() => {
            this.resourceGroupService.onResourceGroupChanged.next(data);
            this.router.navigate(["Parameters/Resource/resourceGroups"]);
            this.updateAlertResourceGroup.UpdateAlertResourceGroupShow();
            this.resourceGroupsService.GetResourceGroups();
        });
    }

    /**
     * CreateResourceGroup
     */
    CreateResourceGroup(): void {
        const data = this.resourceGroupForm.getRawValue();
        this.resourceGroupService.CreateResourceGroup(data).then(() => {
            this.resourceGroupService.onResourceGroupChanged.next(data);
            this.router.navigate(["Parameters/Resource/resourceGroups"]);
            this.addAlertResourceGroup.AddAlertResourceGroupShow();
            this.resourceGroupsService.GetResourceGroups();
        });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(
            ResourceGroupFormDialogComponent,
            {
                panelClass: "resourceGroupForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var resourceGroupRequest = response.getRawValue();
            resourceGroupRequest.ConfigGroupId = this.resourceGroup.Id;
            this.resourceGroupService
                .CreateResource(resourceGroupRequest)
                .then(() => {
                    this.resourceGroupService.GetResourceGroup().then(() => {
                        this.refreshResourceGroupDataSource();
                    });
                });
        });
    }

    /**
     * editGenericConfig
     *
     * @param resourceGroup
     */
    editResource(resourceGroup): void {
        this.dialogRef = this._matDialog.open(
            ResourceGroupFormDialogComponent,
            {
                panelClass: "resourceGroupForm-dialog",
                data: {
                    resourceGroup: resourceGroup,
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
            var resourceGroupRequest = formData.getRawValue();
            resourceGroupRequest.ConfigGroupId =
                this.resourceGroup.ConfigGroupId;
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.resourceGroupService
                        .UpdateResource(resourceGroupRequest)
                        .then(() => {
                            this.resourceGroupService
                                .GetResourceGroup()
                                .then(() => {
                                    this.refreshResourceGroupDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteResource
                 */
                case "delete":
                    this.DeleteResourceGroup(resourceGroup);
                    break;
            }
        });
    }

    /**
     * DeleteResource
     */
    DeleteResourceGroup(resourceGroup): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.resourceGroupService
                    .DeleteResourceGroup(resourceGroup)
                    .then(() => {
                        this.resourceGroupService
                            .GetResourceGroup()
                            .then(() => {
                                this.refreshResourceGroupDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
