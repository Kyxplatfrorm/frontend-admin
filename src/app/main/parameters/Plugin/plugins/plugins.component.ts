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
import PluginDataSource from "./plugins.datasource";
import { PluginService } from "./plugins.service";

@Component({
    selector: "plugins",
    templateUrl: "./plugins.component.html",
    styleUrls: ["./plugins.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class PluginsComponent implements OnInit {
    pluginsDataSource: PluginDataSource | null;
    displayedColumns = [
        "Id",
        "TenantName",
        "IsDefault",
        "PluginCode",
        "PluginGroupCode",
        "PluginDescription",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    pluginPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    pluginSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private pluginService: PluginService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.pluginsDataSource = new PluginDataSource(
            this.pluginService,
            this.pluginPaginator,
            this.pluginSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.pluginsDataSource) {
                    return;
                }
                this.pluginsDataSource.filter = this.filter.nativeElement.value;
            });
    }

    refreshPluginDataSource(): void {
        this.pluginsDataSource = new PluginDataSource(
            this.pluginService,
            this.pluginPaginator,
            this.pluginSort
        );
    }

    /**
     * DeletePlugins
     */
    DeletePlugins(plugin): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.pluginService.DeletePlugins(plugin).then(() => {
                    this.pluginService.GetPlugins().then(() => {
                        this.refreshPluginDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
