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
import SwitchApplicationDefinitionsDataSource from "./switchApplicationDefinitions.datasource";
import { SwitchApplicationDefinitionsService } from "./switchApplicationDefinitions.service";

@Component({
    selector: "switchApplicationDefinitions",
    templateUrl: "./switchApplicationDefinitions.component.html",
    styleUrls: ["./switchApplicationDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchApplicationDefinitionsComponent implements OnInit {
    switchApplicationDefinitionsDataSource: SwitchApplicationDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "ApplicationType",
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
    switchAppDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchAppDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchApplicationDefinitionsService: SwitchApplicationDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.switchApplicationDefinitionsDataSource =
            new SwitchApplicationDefinitionsDataSource(
                this.switchApplicationDefinitionsService,
                this.switchAppDefinitionsPaginator,
                this.switchAppDefinitionsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchApplicationDefinitionsDataSource) {
                    return;
                }
                this.switchApplicationDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSwitchApplicationDefinitionsDataSource(): void {
        this.switchApplicationDefinitionsDataSource =
            new SwitchApplicationDefinitionsDataSource(
                this.switchApplicationDefinitionsService,
                this.switchAppDefinitionsPaginator,
                this.switchAppDefinitionsSort
            );
    }

    /**
     * DeleteSwitchApplication
     */
    DeleteSwitchApplication(switchApplication): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchApplicationDefinitionsService
                    .DeleteSwitchApplication(switchApplication)
                    .then(() => {
                        this.switchApplicationDefinitionsService
                            .GetSwitchApplications()
                            .then(() => {
                                this.refreshSwitchApplicationDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
