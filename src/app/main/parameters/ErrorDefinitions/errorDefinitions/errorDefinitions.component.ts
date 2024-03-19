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
import { ErrorDefinitionsService } from "./errorDefinitions.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { ErrorDefinitionsDataSource } from "./errorDefinitions.datasource";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ResourceDefinitionService } from "../resourceDefinition/resourceDefinition.service";

@Component({
    selector: "errorDefinitions",
    templateUrl: "./errorDefinitions.component.html",
    styleUrls: ["./errorDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ErrorDefinitionsComponent implements OnInit {
    errorDefinitionsDataSource: ErrorDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "ErrorCode",
        "NumericErrorCode",
        "ErrorDescription",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    errorDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    errorDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private errordefinitionsservice: ErrorDefinitionsService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.errorDefinitionsDataSource = new ErrorDefinitionsDataSource(
            this.errordefinitionsservice,
            this.errorDefinitionsPaginator,
            this.errorDefinitionsSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.errorDefinitionsDataSource) {
                    return;
                }
                this.errorDefinitionsDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshErrorDefinitionsDataSource(): void {
        this.errorDefinitionsDataSource = new ErrorDefinitionsDataSource(
            this.errordefinitionsservice,
            this.errorDefinitionsPaginator,
            this.errorDefinitionsSort
        );
    }

    /**
     * deleteErrorDefinitions
     */
    deleteErrorDefinitions(resource): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.errordefinitionsservice
                    .deleteErrorDefinition(resource)

                    .then(() => {
                        this.errordefinitionsservice
                            .getErrorsDefinitions()
                            .then(() => {
                                this.refreshErrorDefinitionsDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
