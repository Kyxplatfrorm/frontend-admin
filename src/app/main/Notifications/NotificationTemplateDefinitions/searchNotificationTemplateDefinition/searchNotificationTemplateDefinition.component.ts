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
import SearchNotificationTemplateDefinitionDataSource from "./searchNotificationTemplateDefinition.datasource";
import { SearchNotificationTemplateDefinitionService } from "./searchNotificationTemplateDefinition.service";

@Component({
    selector: "searchNotificationTemplateDefinition",
    templateUrl: "./searchNotificationTemplateDefinition.component.html",
    styleUrls: ["./searchNotificationTemplateDefinition.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchNotificationTemplateDefinitionComponent implements OnInit {
    searchNotificationTemplateDefinitionDataSource: SearchNotificationTemplateDefinitionDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "TemplateTypeName",
        "LanguageCodeName",
        "Subject",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchNotificationTemplateDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchNotificationTemplateDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchNotificationTemplateDefinitionService: SearchNotificationTemplateDefinitionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchNotificationTemplateDefinitionDataSource =
            new SearchNotificationTemplateDefinitionDataSource(
                this.searchNotificationTemplateDefinitionService,
                this.searchNotificationTemplateDefinitionPaginator,
                this.searchNotificationTemplateDefinitionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchNotificationTemplateDefinitionDataSource) {
                    return;
                }
                this.searchNotificationTemplateDefinitionDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshNotificationTemplateDefinitionDataSource(): void {
        this.searchNotificationTemplateDefinitionDataSource =
            new SearchNotificationTemplateDefinitionDataSource(
                this.searchNotificationTemplateDefinitionService,
                this.searchNotificationTemplateDefinitionPaginator,
                this.searchNotificationTemplateDefinitionSort
            );
    }

    /**
     * DeleteNotificationTemplateDefinition
     */
    DeleteNotificationTemplateDefinition(notificationTemplate): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchNotificationTemplateDefinitionService
                    .DeleteNotificationTemplateDefinition(notificationTemplate)
                    .then(() => {
                        this.searchNotificationTemplateDefinitionService
                            .SearchNotificationTemplateDefinition(
                                notificationTemplate
                            )
                            .then(() => {
                                this.refreshNotificationTemplateDefinitionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
