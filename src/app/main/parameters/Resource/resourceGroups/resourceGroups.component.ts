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
import ResourceGroupsDataSource from "./resourceGroups.datasource";
import { ResourceGroupsService } from "./resourceGroups.service";

@Component({
    selector: "resourceGroups",
    templateUrl: "./resourceGroups.component.html",
    styleUrls: ["./resourceGroups.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ResourceGroupsComponent implements OnInit {
    resourceGroupsDataSource: ResourceGroupsDataSource | null;
    displayedColumns = [
        "Id",
        "GroupCode",
        "Description",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    resourceGroupsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    resourceGroupsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private resourceGroupsService: ResourceGroupsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.resourceGroupsDataSource = new ResourceGroupsDataSource(
            this.resourceGroupsService,
            this.resourceGroupsPaginator,
            this.resourceGroupsSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.resourceGroupsDataSource) {
                    return;
                }
                this.resourceGroupsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshResourceGroupsDataSource(): void {
        this.resourceGroupsDataSource = new ResourceGroupsDataSource(
            this.resourceGroupsService,
            this.resourceGroupsPaginator,
            this.resourceGroupsSort
        );
    }

    /**
     * DeleteResourceGroups
     */
    DeleteResourceGroups(resourceGroup): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.resourceGroupsService
                    .DeleteResourceGroups(resourceGroup)

                    .then(() => {
                        this.resourceGroupsService
                            .GetResourceGroups()
                            .then(() => {
                                this.refreshResourceGroupsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
