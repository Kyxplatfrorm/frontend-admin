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
import { FraudGroupDefinitionsService } from "./fraudGroupDefinitions.service";
import FraudGroupDefinitionsDataSource from "./fraudGroupDefinitions.datasource";

@Component({
    selector: "fraudGroupDefinitions",
    templateUrl: "./fraudGroupDefinitions.component.html",
    styleUrls: ["./fraudGroupDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class FraudGroupDefinitionsComponent implements OnInit {
    fraudGroupDefinitionsDataSource: FraudGroupDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "Description",
        "IsBuiltInDefinition",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    fraudGroupDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    fraudGroupDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private fraudGroupDefinitionsService: FraudGroupDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.fraudGroupDefinitionsDataSource =
            new FraudGroupDefinitionsDataSource(
                this.fraudGroupDefinitionsService,
                this.fraudGroupDefinitionsPaginator,
                this.fraudGroupDefinitionsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.fraudGroupDefinitionsDataSource) {
                    return;
                }
                this.fraudGroupDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshFraudGroupDefinitionsDataSource(): void {
        this.fraudGroupDefinitionsDataSource =
            new FraudGroupDefinitionsDataSource(
                this.fraudGroupDefinitionsService,
                this.fraudGroupDefinitionsPaginator,
                this.fraudGroupDefinitionsSort
            );
    }

    /**
     * DeleteFraudGroupDefinition
     */
    DeleteFraudGroupDefinition(fraudGroup): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.fraudGroupDefinitionsService
                    .DeleteFraudGroupDefinition(fraudGroup)

                    .then(() => {
                        this.fraudGroupDefinitionsService
                            .GetFraudGroupDefinitions()
                            .then(() => {
                                this.refreshFraudGroupDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
