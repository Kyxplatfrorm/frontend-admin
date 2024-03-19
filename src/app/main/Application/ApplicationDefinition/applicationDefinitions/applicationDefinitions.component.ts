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
import ApplicationDefinitionsDataSource from "./applicationDefinitions.datasource";
import { ApplicationDefinitionsService } from "./applicationDefinitions.service";

@Component({
    selector: "applicationDefinitions",
    templateUrl: "./applicationDefinitions.component.html",
    styleUrls: ["./applicationDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationDefinitionsComponent implements OnInit {
    applicationDefinitionsDataSource: ApplicationDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "ServiceName",
        "Description",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    appDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    appDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private applicationDefinitionsService: ApplicationDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.applicationDefinitionsDataSource =
            new ApplicationDefinitionsDataSource(
                this.applicationDefinitionsService,
                this.appDefinitionsPaginator,
                this.appDefinitionsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.applicationDefinitionsDataSource) {
                    return;
                }
                this.applicationDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshApplicationDefinitionsDataSource(): void {
        this.applicationDefinitionsDataSource =
            new ApplicationDefinitionsDataSource(
                this.applicationDefinitionsService,
                this.appDefinitionsPaginator,
                this.appDefinitionsSort
            );
    }

    /**
     * DeleteApplicationDefinition
     */
    DeleteApplicationDefinition(aplicationdefinition): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.applicationDefinitionsService
                    .DeleteApplicationDefinition(aplicationdefinition)

                    .then(() => {
                        this.applicationDefinitionsService
                            .GetApplicationDefinitions()
                            .then(() => {
                                this.refreshApplicationDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
