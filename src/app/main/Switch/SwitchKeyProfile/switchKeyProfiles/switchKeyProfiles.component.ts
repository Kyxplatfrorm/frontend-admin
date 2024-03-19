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
import SwitchKeyProfilesDataSource from "./switchKeyProfiles.datasource";
import { SwitchKeyProfilesService } from "./switchKeyProfiles.service";

@Component({
    selector: "switchKeyProfiles",
    templateUrl: "./switchKeyProfiles.component.html",
    styleUrls: ["./switchKeyProfiles.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SwitchKeyProfilesComponent implements OnInit {
    switchKeyProfilesDataSource: SwitchKeyProfilesDataSource | null;
    displayedColumns = [
        "Id",
        "ProfileName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    switchKeyProfilesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchKeyProfilesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private switchKeyProfilesService: SwitchKeyProfilesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.switchKeyProfilesDataSource = new SwitchKeyProfilesDataSource(
            this.switchKeyProfilesService,
            this.switchKeyProfilesPaginator,
            this.switchKeyProfilesSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchKeyProfilesDataSource) {
                    return;
                }
                this.switchKeyProfilesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshSwitchKeyProfilesDataSource(): void {
        this.switchKeyProfilesDataSource = new SwitchKeyProfilesDataSource(
            this.switchKeyProfilesService,
            this.switchKeyProfilesPaginator,
            this.switchKeyProfilesSort
        );
    }

    /**
     * DeleteSwitchKeyProfile
     */
    DeleteSwitchKeyProfile(switchKey): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchKeyProfilesService
                    .DeleteSwitchKeyProfile(switchKey)
                    .then(() => {
                        this.switchKeyProfilesService
                            .GetSwitchKeyProfiles()
                            .then(() => {
                                this.refreshSwitchKeyProfilesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
