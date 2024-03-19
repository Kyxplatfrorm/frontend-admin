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
import { ResourceDefinitionService } from "./resourceDefinition.service";
import { ResourceDefinitionsDataSource } from "./resourceDefinition.datasource";
import { ErrorDefinitionsService } from "../errorDefinitions/errorDefinitions.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ResourceFormDialogComponent } from "./resourceForm/resourceForm.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import AddAlertResourceDefinition from "./addResourceDefinition";
import { Resource } from "./resourceDefinition.model";
import UpdateAlertResourceDefinition from "./updateResourceDefinition";

@Component({
    selector: "resourceDefinition",
    templateUrl: "./resourceDefinition.component.html",
    styleUrls: ["./resourceDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ResourceDefinitionComponent {
    resourceDefinitionDataSource: ResourceDefinitionsDataSource | null;
    dialogRef: any;
    resource: Resource;
    pageType: string;
    errorResourceForm: FormGroup;
    displayedColumns = [
        "Id",
        "LanguageCode",
        "ResourceCode",
        "Description",
        "Buttons",
    ];

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    resourceDefPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    resourceDefSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

    /**
     * Constructor
     *
     *@param {ResourceDefinitionService} resourcedefinitionservice
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private errordefinitionsservice: ErrorDefinitionsService,
        private resourcedefinitionservice: ResourceDefinitionService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertResourceDefinition: AddAlertResourceDefinition,
        private updateAlertResourceDefinition: UpdateAlertResourceDefinition,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.resource = new Resource();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.resourceDefinitionDataSource = new ResourceDefinitionsDataSource(
            this.resourcedefinitionservice,
            this.resourceDefPaginator,
            this.resourceDefSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.resourceDefinitionDataSource) {
                    return;
                }
                this.resourceDefinitionDataSource.filter =
                    this.filter.nativeElement.value;
            });

        this.resourcedefinitionservice.onErrorResourceChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resource) => {
                if (resource) {
                    this.resource = new Resource(resource);
                    this.pageType = "edit";
                    this.resourcedefinitionservice.resourceList =
                        resource.ResourceList;
                } else {
                    this.pageType = "new";
                    this.resource = new Resource();
                    this.resourcedefinitionservice.resourceList =
                        resource.ResourceList;
                }
                this.errorResourceForm = this.createErrorResourceForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    refreshResourceDataSource(): void {
        this.resourceDefinitionDataSource = new ResourceDefinitionsDataSource(
            this.resourcedefinitionservice,
            this.resourceDefPaginator,
            this.resourceDefSort
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
     * Create ErrorResource form
     *
     * @returns {FormGroup}
     */
    createErrorResourceForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.resource.Id],
            ErrorId: [this.resource.ErrorId],
            LanguageCode: [this.resource.LanguageCode],
            Description: [this.resource.Description],
            ErrorCode: [this.resource.ErrorCode],
            NumericErrorCode: [this.resource.NumericErrorCode],
            ErrorDescription: [this.resource.ErrorDescription],
        });
    }

    /**
     * updateErrorDefinition
     */
    updateErrorDefinition(): void {
        const data = this.errorResourceForm.getRawValue();
        this.resourcedefinitionservice.updateErrorDefinition(data).then(() => {
            this.resourcedefinitionservice.onErrorResourceChanged.next(data);
            this.router.navigate([
                "Parameters/ErrorDefinitions/errorDefinitions",
            ]);
            this.updateAlertResourceDefinition.UpdateAlertResourceDefinitionShow();
            this.errordefinitionsservice.getErrorsDefinitions();
        });
    }

    /**
     * createErrorDefinition
     */
    createErrorDefinition(): void {
        const data = this.errorResourceForm.getRawValue();
        this.resourcedefinitionservice.createErrorDefinition(data).then(() => {
            this.resourcedefinitionservice.onErrorResourceChanged.next(data);
            this.router.navigate([
                "Parameters/ErrorDefinitions/errorDefinitions",
            ]);
            this.addAlertResourceDefinition.AddAlertResourceDefinitionShow();
            this.errordefinitionsservice.getErrorsDefinitions();
        });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(ResourceFormDialogComponent, {
            panelClass: "resourceForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var resourceRequest = response.getRawValue();
            resourceRequest.ErrorId = this.resource.Id;
            this.resourcedefinitionservice
                .createResourceDefinition(resourceRequest)
                .then(() => {
                    this.resourcedefinitionservice
                        .getErrorDefinition()
                        .then(() => {
                            this.refreshResourceDataSource();
                        });
                });
        });
    }

    /**
     * editResourceDefinition
     *
     * @param resource
     */
    editResourceDefinition(resource): void {
        this.dialogRef = this._matDialog.open(ResourceFormDialogComponent, {
            panelClass: "resourceForm-dialog",
            data: {
                resource: resource,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var resourceRequest = formData.getRawValue();
            resourceRequest.ErrorCode = this.resource.ErrorCode;
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.resourcedefinitionservice
                        .updateResourceDefinition(resourceRequest)
                        .then(() => {
                            this.resourcedefinitionservice
                                .getErrorDefinition()
                                .then(() => {
                                    this.refreshResourceDataSource();
                                });
                        });
                    break;
                /**
                 * Delete resource
                 */
                case "delete":
                    this.deleteResource(resource);
                    break;
            }
        });
    }

    /**
     * Delete resource
     */
    deleteResource(resource): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.resourcedefinitionservice
                    .deleteResourceDefinition(resource)
                    .then(() => {
                        this.resourcedefinitionservice
                            .getErrorDefinition()
                            .then(() => {
                                this.refreshResourceDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
