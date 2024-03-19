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
import SearchFraudApiDefinitionsDataSource from "./searchFraudApiDefinitions.datasource";
import { SearchFraudApiDefinitionsService } from "./searchFraudApiDefinitions.service";

@Component({
    selector: "searchFraudApiDefinitions",
    templateUrl: "./searchFraudApiDefinitions.component.html",
    styleUrls: ["./searchFraudApiDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchFraudApiDefinitionsComponent implements OnInit {
    searchFraudApiDefinitionsDataSource: SearchFraudApiDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "Description",
        "ApplicationTypeName",
        "ControllerName",
        "ActionName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchFraudApiDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchFraudApiDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchFraudApiDefinitionsService: SearchFraudApiDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchFraudApiDefinitionsDataSource =
            new SearchFraudApiDefinitionsDataSource(
                this.searchFraudApiDefinitionsService,
                this.searchFraudApiDefinitionsPaginator,
                this.searchFraudApiDefinitionsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchFraudApiDefinitionsDataSource) {
                    return;
                }
                this.searchFraudApiDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchFraudApiDefinitionsDataSource(): void {
        this.searchFraudApiDefinitionsDataSource =
            new SearchFraudApiDefinitionsDataSource(
                this.searchFraudApiDefinitionsService,
                this.searchFraudApiDefinitionsPaginator,
                this.searchFraudApiDefinitionsSort
            );
    }

    /**
     * DeleteFraudApiDefinition
     */
    DeleteFraudApiDefinition(fraudApi): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchFraudApiDefinitionsService
                    .DeleteFraudApiDefinition(fraudApi)
                    .then(() => {
                        this.searchFraudApiDefinitionsService
                            .SearchFraudApiDefinition(fraudApi)
                            .then(() => {
                                this.refreshSearchFraudApiDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
