import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
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
import { ActivatedRoute } from "@angular/router";
import TenantCardSchemaProfilesDataSource from "./tenantCardSchemaProfiles.datasource";
import { TenantCardSchemaProfilesService } from "./tenantCardSchemaProfiles.service";
import { TenantCardSchemaService } from "../tenantCardSchema/tenantCardSchema.service";
import { TenantCardSchemaFormDialogComponent } from "./tenantCardSchemaForm/tenantCardSchemaForm.component";

@Component({
    selector: "tenantCardSchemaProfiles",
    templateUrl: "./tenantCardSchemaProfiles.component.html",
    styleUrls: ["./tenantCardSchemaProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class TenantCardSchemaProfilesComponent implements OnInit {
    tenantCardSchemaProfilesDataSource: TenantCardSchemaProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "CardSchema",
        "CardSchemaName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    tenantCardSchemaProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    tenantCardSchemaProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    tenantId: number;
    routeParams: any;
    dialogRef: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private tenantCardSchemaProfilesService: TenantCardSchemaProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        _router: ActivatedRoute,
        private tenantCardSchemaService: TenantCardSchemaService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    ngOnInit(): void {
        this.tenantCardSchemaProfilesDataSource =
            new TenantCardSchemaProfilesDataSource(
                this.tenantCardSchemaProfilesService,
                this.tenantCardSchemaProfilesPaginator,
                this.tenantCardSchemaProfilesSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.tenantCardSchemaProfilesDataSource) {
                    return;
                }
                this.tenantCardSchemaProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshTenantCardSchemaProfilesDataSource(): void {
        this.tenantCardSchemaProfilesDataSource =
            new TenantCardSchemaProfilesDataSource(
                this.tenantCardSchemaProfilesService,
                this.tenantCardSchemaProfilesPaginator,
                this.tenantCardSchemaProfilesSort
            );
    }

    /**
     * newTenantCardSchema
     */
    newTenantCardSchema(): void {
        this.dialogRef = this._matDialog.open(
            TenantCardSchemaFormDialogComponent,
            {
                panelClass: "tenantCardSchemaForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var tenantCardSchemaRequest = response.getRawValue();
            this.tenantCardSchemaProfilesService
                .CreateTenantCardSchemaProfile(tenantCardSchemaRequest)
                .then(() => {
                    this.tenantCardSchemaProfilesService
                        .GetTenantCardSchemaProfiles()
                        .then(() => {
                            this.refreshTenantCardSchemaProfilesDataSource();
                        });
                });
        });
    }

    /**
     * EditTenantCardSchema
     *
     * @param tenantCardSchema
     */
    EditTenantCardSchema(tenantCardSchema): void {
        this.dialogRef = this._matDialog.open(
            TenantCardSchemaFormDialogComponent,
            {
                panelClass: "tenantCardSchemaForm-dialog",
                data: {
                    tenantCardSchema: tenantCardSchema,
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
            var tenantCardSchemaRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save resource
                 */
                case "save":
                    this.tenantCardSchemaProfilesService
                        .UpdateTenantCardSchemaProfile(tenantCardSchemaRequest)
                        .then(() => {
                            this.tenantCardSchemaProfilesService
                                .GetTenantCardSchemaProfiles()
                                .then(() => {
                                    this.refreshTenantCardSchemaProfilesDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteTenantCardSchemaProfile
                 */
                case "delete":
                    this.DeleteTenantCardSchemaProfile(tenantCardSchema);
                    break;
            }
        });
    }

    /**
     * DeleteTenantCardSchemaProfile
     */
    DeleteTenantCardSchemaProfile(tenantCardSchema): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantCardSchemaProfilesService
                    .DeleteTenantCardSchemaProfile(tenantCardSchema)
                    .then(() => {
                        this.tenantCardSchemaProfilesService
                            .GetTenantCardSchemaProfiles()
                            .then(() => {
                                this.refreshTenantCardSchemaProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
