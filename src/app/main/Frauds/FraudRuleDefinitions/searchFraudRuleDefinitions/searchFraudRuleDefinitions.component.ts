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
import SearchFraudRuleDefinitionsDataSource from "./searchFraudRuleDefinitions.datasource";
import { SearchFraudRuleDefinitionsService } from "./searchFraudRuleDefinitions.service";

@Component({
    selector: "searchFraudRuleDefinitions",
    templateUrl: "./searchFraudRuleDefinitions.component.html",
    styleUrls: ["./searchFraudRuleDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchFraudRuleDefinitionsComponent implements OnInit {
    searchFraudRuleDefinitionsDataSource: SearchFraudRuleDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "Description",
        "ErrorDescription",
        "FraudGroupName",
        "FraudRuleActionTypeName",
        "FraudRuleCheckTimeTypeName",
        "NotificationTypeName",
        "NotificationTemplateCode",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchFraudRuleDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchFraudRuleDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchFraudRuleDefinitionsService: SearchFraudRuleDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchFraudRuleDefinitionsDataSource =
            new SearchFraudRuleDefinitionsDataSource(
                this.searchFraudRuleDefinitionsService,
                this.searchFraudRuleDefinitionsPaginator,
                this.searchFraudRuleDefinitionsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchFraudRuleDefinitionsDataSource) {
                    return;
                }
                this.searchFraudRuleDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSearchFraudRuleDefinitionsDataSource(): void {
        this.searchFraudRuleDefinitionsDataSource =
            new SearchFraudRuleDefinitionsDataSource(
                this.searchFraudRuleDefinitionsService,
                this.searchFraudRuleDefinitionsPaginator,
                this.searchFraudRuleDefinitionsSort
            );
    }

    /**
     * DeleteFraudRuleDefinition
     */
    DeleteFraudRuleDefinition(fraudRule): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchFraudRuleDefinitionsService
                    .DeleteFraudRuleDefinition(fraudRule)
                    .then(() => {
                        this.searchFraudRuleDefinitionsService
                            .SearchFraudRuleDefinition(fraudRule)
                            .then(() => {
                                this.refreshSearchFraudRuleDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
