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
import SearchSystemKeyDefinitionDataSource from "./searchSystemDefinition.datasource";
import { SearchSystemKeyDefinitionService } from "./searchSystemDefinition.service";

@Component({
    selector: "searchSystemDefinition",
    templateUrl: "./searchSystemDefinition.component.html",
    styleUrls: ["./searchSystemDefinition.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSystemKeyDefinitionComponent implements OnInit {
    searchSystemKeyDefinitionDataSource: SearchSystemKeyDefinitionDataSource | null;
    displayedColumns = [
        "Id",
        "Description",
        "KeyTypeName",
        "KeyCode",
        "KeyValue",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSystemKeyDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSystemKeyDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private searchSystemKeyDefinitionService: SearchSystemKeyDefinitionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSystemKeyDefinitionDataSource =
            new SearchSystemKeyDefinitionDataSource(
                this.searchSystemKeyDefinitionService,
                this.searchSystemKeyDefinitionPaginator,
                this.searchSystemKeyDefinitionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSystemKeyDefinitionDataSource) {
                    return;
                }
                this.searchSystemKeyDefinitionDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSystemKeyDefinitionDataSource(): void {
        this.searchSystemKeyDefinitionDataSource =
            new SearchSystemKeyDefinitionDataSource(
                this.searchSystemKeyDefinitionService,
                this.searchSystemKeyDefinitionPaginator,
                this.searchSystemKeyDefinitionSort
            );
    }

    /**
     * DeleteSystemKeyDefinition
     */
    DeleteSystemKeyDefinition(systemKey): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchSystemKeyDefinitionService
                    .DeleteSystemKeyDefinition(systemKey)
                    .then(() => {
                        this.searchSystemKeyDefinitionService
                            .SearchSystemKeyDefinition(systemKey)
                            .then(() => {
                                this.refreshSystemKeyDefinitionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
