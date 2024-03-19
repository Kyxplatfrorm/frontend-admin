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
import SwitchCardNetworksDataSource from "./switchCardNetworks.datasource";
import { SwitchCardNetworksService } from "./switchCardNetworks.service";

@Component({
    selector: "switchCardNetworks",
    templateUrl: "./switchCardNetworks.component.html",
    styleUrls: ["./switchCardNetworks.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchCardNetworksComponent implements OnInit {
    switchCardNetworksDataSource: SwitchCardNetworksDataSource | null;
    displayedColumns = ["Id", "NetworkType", "Description"];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchCardNetworksPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchCardNetworksSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchCardNetworksService: SwitchCardNetworksService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.switchCardNetworksDataSource = new SwitchCardNetworksDataSource(
            this.switchCardNetworksService,
            this.switchCardNetworksPaginator,
            this.switchCardNetworksSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchCardNetworksDataSource) {
                    return;
                }
                this.switchCardNetworksDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
