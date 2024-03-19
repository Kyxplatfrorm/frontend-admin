import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
import SearchApiUserDefinitionDataSource from "./searchApiUserDefinition.datasource";
import { ApiUser } from "../apiUserDefinitions/apiUserDefinitions.model";
import { SearchApiUserDefinitionService } from "./searchApiUserDefinition.service";

@Component({
    selector: "searchApiUserDefinition",
    templateUrl: "./searchApiUserDefinition.component.html",
    styleUrls: ["./searchApiUserDefinition.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchApiUserDefinitionComponent implements OnInit {
    searchApiUserDefinitionDataSource: SearchApiUserDefinitionDataSource | null;
    dialogRef: any;
    apiUser: ApiUser;
    searchApiUserDefinitionForm: FormGroup;
    displayedColumns = [
        "Id",
        "TenantName",
        "UserName",
        "UserStatus",
        "WrongAttemptCount",
        "Email",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];

    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchApiUserDefinitionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchApiUserDefinitionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     *
     */

    constructor(
        private searchApiUserDefinitionService: SearchApiUserDefinitionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.apiUser = new ApiUser();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchApiUserDefinitionDataSource =
            new SearchApiUserDefinitionDataSource(
                this.searchApiUserDefinitionService,
                this.searchApiUserDefinitionPaginator,
                this.searchApiUserDefinitionSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchApiUserDefinitionDataSource) {
                    return;
                }
                this.searchApiUserDefinitionDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    refreshSearchApiUserDefinitionDataSource(): void {
        this.searchApiUserDefinitionDataSource =
            new SearchApiUserDefinitionDataSource(
                this.searchApiUserDefinitionService,
                this.searchApiUserDefinitionPaginator,
                this.searchApiUserDefinitionSort
            );
    }

    /**
     * DeleteApiUserDefinition
     */
    DeleteApiUserDefinition(apiUser): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.searchApiUserDefinitionService
                    .DeleteApiUser(apiUser)
                    .then(() => {
                        this.searchApiUserDefinitionService
                            .SearchApiUser(this.apiUser)
                            .then(() => {
                                this.refreshSearchApiUserDefinitionDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
