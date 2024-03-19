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
import SwitchTransactionCodeMapsDataSource from "./switchTransactionCodeMaps.datasource";
import { SwitchTransactionCodeMapsService } from "./switchTransactionCodeMaps.service";

@Component({
    selector: "switchTransactionCodeMaps",
    templateUrl: "./switchTransactionCodeMaps.component.html",
    styleUrls: ["./switchTransactionCodeMaps.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchTransactionCodeMapsComponent implements OnInit {
    switchTransactionCodeMapsDataSource: SwitchTransactionCodeMapsDataSource | null;
    displayedColumns = ["Id", "NetworkType", "Description"];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchTransactionCodeMapsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchTransactionCodeMapsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchTransactionCodeMapsService: SwitchTransactionCodeMapsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.switchTransactionCodeMapsDataSource =
            new SwitchTransactionCodeMapsDataSource(
                this.switchTransactionCodeMapsService,
                this.switchTransactionCodeMapsPaginator,
                this.switchTransactionCodeMapsSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchTransactionCodeMapsDataSource) {
                    return;
                }
                this.switchTransactionCodeMapsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }
}
