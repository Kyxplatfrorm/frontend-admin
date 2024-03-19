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
import SwitchConnectionDataSource, {
    SwitchConnectionsDataSource,
} from "./switchConnections.datasource";
import { SwitchConnectionsService } from "./switchConnections.service";
import { SwitchConnectionsApiResponse } from "app/ui/switchConnection";
import { SwitchConnectionService } from "../switchConnection/switchConnection.service";
import { MatTabGroup } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { SwitchConnection } from "./switchConnections.model";

@Component({
    selector: "switchConnections",
    templateUrl: "./switchConnections.component.html",
    styleUrls: ["./switchConnections.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchConnectionsComponent implements OnInit {
    switchConnectionsDataSource: SwitchConnectionsDataSource | null;
    switchConnectionDataSource: SwitchConnectionDataSource | null;
    displayedColumns = [
        "Id",
        "ApplicationType",
        "ServiceName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchConnectionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchConnectionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
    switchConnectionsApiResponse: SwitchConnectionsApiResponse;
    switchConnection: SwitchConnection;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchConnectionsService: SwitchConnectionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private switchConnectionService: SwitchConnectionService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.switchConnectionsDataSource = new SwitchConnectionsDataSource(
            this.switchConnectionsService,
            this.switchConnectionPaginator,
            this.switchConnectionSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchConnectionsDataSource) {
                    return;
                }
                this.switchConnectionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
