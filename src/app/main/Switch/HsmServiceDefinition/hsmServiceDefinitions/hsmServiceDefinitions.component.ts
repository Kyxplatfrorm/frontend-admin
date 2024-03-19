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
import HsmServiceDefinitionsDataSource from "./hsmServiceDefinitions.datasource";
import { HsmServiceDefinitionsService } from "./hsmServiceDefinitions.service";

@Component({
    selector: "hsmServiceDefinitions",
    templateUrl: "./hsmServiceDefinitions.component.html",
    styleUrls: ["./hsmServiceDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class HsmServiceDefinitionsComponent implements OnInit {
    hsmServiceDefinitionsDataSource: HsmServiceDefinitionsDataSource | null;
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
    hsmServiceDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    hsmServiceDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private hsmServiceDefinitionsService: HsmServiceDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.hsmServiceDefinitionsDataSource =
            new HsmServiceDefinitionsDataSource(
                this.hsmServiceDefinitionsService,
                this.hsmServiceDefinitionsPaginator,
                this.hsmServiceDefinitionsSort
            );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.hsmServiceDefinitionsDataSource) {
                    return;
                }
                this.hsmServiceDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshHsmServiceDefinitionsDataSource(): void {
        this.hsmServiceDefinitionsDataSource =
            new HsmServiceDefinitionsDataSource(
                this.hsmServiceDefinitionsService,
                this.hsmServiceDefinitionsPaginator,
                this.hsmServiceDefinitionsSort
            );
    }

    /**
     * DeleteHsmServiceDefinition
     */
    DeleteHsmServiceDefinition(hsmService): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.hsmServiceDefinitionsService
                    .DeleteHsmServiceDefinition(hsmService)
                    .then(() => {
                        this.hsmServiceDefinitionsService
                            .GetHsmServiceDefinitions()
                            .then(() => {
                                this.refreshHsmServiceDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}