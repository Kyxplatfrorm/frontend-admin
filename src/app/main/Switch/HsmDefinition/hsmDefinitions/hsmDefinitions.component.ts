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
import HsmDefinitionsDataSource from "./hsmDefinitions.datasource";
import { HsmDefinitionsService } from "./hsmDefinitions.service";

@Component({
    selector: "hsmDefinitions",
    templateUrl: "./hsmDefinitions.component.html",
    styleUrls: ["./hsmDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class HsmDefinitionsComponent implements OnInit {
    hsmDefinitionsDataSource: HsmDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "HsmType",
        "HsmIpAddress",
        "PinLmkLength",
        "LmkType",
        "HsmPort",
        "Description",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    hsmDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    hsmDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private hsmDefinitionsService: HsmDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.hsmDefinitionsDataSource = new HsmDefinitionsDataSource(
            this.hsmDefinitionsService,
            this.hsmDefinitionsPaginator,
            this.hsmDefinitionsSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.hsmDefinitionsDataSource) {
                    return;
                }
                this.hsmDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshHsmDefinitionsDataSource(): void {
        this.hsmDefinitionsDataSource = new HsmDefinitionsDataSource(
            this.hsmDefinitionsService,
            this.hsmDefinitionsPaginator,
            this.hsmDefinitionsSort
        );
    }

    /**
     * DeleteHsmDefinition
     */
    DeleteHsmDefinition(hsm): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.hsmDefinitionsService
                    .DeleteHsmDefinition(hsm)

                    .then(() => {
                        this.hsmDefinitionsService
                            .GetHsmDefinitions()
                            .then(() => {
                                this.refreshHsmDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
