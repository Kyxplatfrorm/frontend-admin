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
import { GenericConfigGroupsService } from "./genericConfigGroups.service";
import { GenericConfigGroupsDataSource } from "./genericConfigGroups.datasource";

@Component({
    selector: "genericConfigGroups",
    templateUrl: "./genericConfigGroups.component.html",
    styleUrls: ["./genericConfigGroups.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class GenericConfigGroupsComponent implements OnInit {
    genericConfigGroupsDataSource: GenericConfigGroupsDataSource | null;
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
    genericConfigGroupsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    genericConfigGroupsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private genericConfigGroupsService: GenericConfigGroupsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.genericConfigGroupsDataSource = new GenericConfigGroupsDataSource(
            this.genericConfigGroupsService,
            this.genericConfigGroupsPaginator,
            this.genericConfigGroupsSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.genericConfigGroupsDataSource) {
                    return;
                }
                this.genericConfigGroupsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshGenericConfigGroupsDataSource(): void {
        this.genericConfigGroupsDataSource = new GenericConfigGroupsDataSource(
            this.genericConfigGroupsService,
            this.genericConfigGroupsPaginator,
            this.genericConfigGroupsSort
        );
    }

    /**
     * deleteConfigGroups
     */
    deleteConfigGroups(genericConfigGroups): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.genericConfigGroupsService
                    .deleteConfigGroups(genericConfigGroups)

                    .then(() => {
                        this.genericConfigGroupsService
                            .GetGenericConfigGroups()
                            .then(() => {
                                this.refreshGenericConfigGroupsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
