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
import GenericParameterGroupsDataSource from "./genericParameterGroups.datasource";
import { GenericParameterGroupsService } from "./genericParameterGroups.service";

@Component({
    selector: "genericParameterGroups",
    templateUrl: "./genericParameterGroups.component.html",
    styleUrls: ["./genericParameterGroups.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenericParameterGroupsComponent implements OnInit {
    genericParameterGroupsDataSource: GenericParameterGroupsDataSource | null;
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
    genericParameterGroupsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    genericParameterGroupsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private genericParameterGroupsService: GenericParameterGroupsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.genericParameterGroupsDataSource =
            new GenericParameterGroupsDataSource(
                this.genericParameterGroupsService,
                this.genericParameterGroupsPaginator,
                this.genericParameterGroupsSort
            );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.genericParameterGroupsDataSource) {
                    return;
                }
                this.genericParameterGroupsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshGenericParameterGroupsDataSource(): void {
        this.genericParameterGroupsDataSource =
            new GenericParameterGroupsDataSource(
                this.genericParameterGroupsService,
                this.genericParameterGroupsPaginator,
                this.genericParameterGroupsSort
            );
    }

    /**
     * DeleteGenericParameterGroups
     */
    DeleteGenericParameterGroups(genericParameterGroup): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.genericParameterGroupsService
                    .DeleteGenericParameterGroups(genericParameterGroup)

                    .then(() => {
                        this.genericParameterGroupsService
                            .GetGenericParameterGroups()
                            .then(() => {
                                this.refreshGenericParameterGroupsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
