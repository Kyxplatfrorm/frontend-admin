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
import WebHookPayLoadTemplatesDataSource from "./webHookPayLoadTemplates.datasource";
import { WebHookPayLoadTemplatesService } from "./webHookPayLoadTemplates.service";

@Component({
    selector: "webHookPayLoadTemplates",
    templateUrl: "./webHookPayLoadTemplates.component.html",
    styleUrls: ["./webHookPayLoadTemplates.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class WebHookPayLoadTemplatesComponent implements OnInit {
    webHookPayLoadTemplatesDataSource: WebHookPayLoadTemplatesDataSource | null;
    displayedColumns = [
        "Id",
        "WebHookTypeName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    webHookPayLoadTemplatesPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    webHookPayLoadTemplatesSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private webHookPayLoadTemplatesService: WebHookPayLoadTemplatesService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.webHookPayLoadTemplatesDataSource =
            new WebHookPayLoadTemplatesDataSource(
                this.webHookPayLoadTemplatesService,
                this.webHookPayLoadTemplatesPaginator,
                this.webHookPayLoadTemplatesSort
            );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.webHookPayLoadTemplatesDataSource) {
                    return;
                }
                this.webHookPayLoadTemplatesDataSource.filter =
                    this.filter.nativeElement.value;
            });
    }

    refreshWebHookPayLoadTemplatesDataSource(): void {
        this.webHookPayLoadTemplatesDataSource =
            new WebHookPayLoadTemplatesDataSource(
                this.webHookPayLoadTemplatesService,
                this.webHookPayLoadTemplatesPaginator,
                this.webHookPayLoadTemplatesSort
            );
    }

    /**
     * DeleteWebHookPayloadTemplate
     */
    DeleteWebHookPayloadTemplate(webHookPayLoadTemplate): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.webHookPayLoadTemplatesService
                    .DeleteWebHookPayloadTemplate(webHookPayLoadTemplate)
                    .then(() => {
                        this.webHookPayLoadTemplatesService
                            .GetWebHookPayloadTemplates()
                            .then(() => {
                                this.refreshWebHookPayLoadTemplatesDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
