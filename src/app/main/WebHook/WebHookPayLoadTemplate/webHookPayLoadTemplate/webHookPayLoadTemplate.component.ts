import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { WebHookPayLoadTemplate } from "../webHookPayLoadTemplates/webHookPayLoadTemplates.model";
import { WebHookTypeEntity } from "app/ui/webHookPayLoadTemplate";
import { WebHookPayLoadTemplateService } from "./webHookPayLoadTemplate.service";
import { WebHookPayLoadTemplatesService } from "../webHookPayLoadTemplates/webHookPayLoadTemplates.service";
import AddAlertWebHookPayLoadTemplate from "./addWebHookPayLoadTemplate";
import UpdateAlertWebHookPayLoadTemplate from "./updateWebHookPayLoadTemplate";

@Component({
    selector: "webHookPayLoadTemplate",
    templateUrl: "./webHookPayLoadTemplate.component.html",
    styleUrls: ["./webHookPayLoadTemplate.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class WebHookPayLoadTemplateComponent implements OnInit, OnDestroy {
    dialogRef: any;
    webHookPayLoadTemplate: WebHookPayLoadTemplate;
    pageType: string;
    webHookType: WebHookTypeEntity[];
    webHookPayLoadTemplateForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private webHookPayLoadTemplateService: WebHookPayLoadTemplateService,
        private webHookPayLoadTemplatesService: WebHookPayLoadTemplatesService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertWebHookPayLoadTemplate: AddAlertWebHookPayLoadTemplate,
        private updateAlertWebHookPayLoadTemplate: UpdateAlertWebHookPayLoadTemplate
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.webHookPayLoadTemplate = new WebHookPayLoadTemplate();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.webHookPayLoadTemplatesService.GetWebHookTypes().then(() => {
            this.webHookType =
                this.webHookPayLoadTemplatesService.webHookTypeApiResponse.ParameterList;
        });

        this.webHookPayLoadTemplateService.onWebHookPayLoadTemplateChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((webHookPayLoadTemplate) => {
                if (webHookPayLoadTemplate) {
                    this.webHookPayLoadTemplate = new WebHookPayLoadTemplate(
                        webHookPayLoadTemplate
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.webHookPayLoadTemplate = new WebHookPayLoadTemplate();
                }
                this.webHookPayLoadTemplateForm =
                    this.createWebHookPayLoadTemplateForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createWebHookPayLoadTemplateForm
     *
     * @returns {FormGroup}
     */
    createWebHookPayLoadTemplateForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.webHookPayLoadTemplate.Id],
            WebHookTypeId: [this.webHookPayLoadTemplate.WebHookTypeId],
            WebHookPayload: [this.webHookPayLoadTemplate.WebHookPayload],
        });
    }

    /**
     * CreateWebHookPayLoadTemplate
     */
    CreateWebHookPayLoadTemplate(): void {
        const data = this.webHookPayLoadTemplateForm.getRawValue();
        this.webHookPayLoadTemplateService
            .CreateWebHookPayLoadTemplate(data)
            .then(() => {
                this.webHookPayLoadTemplateService.onWebHookPayLoadTemplateChanged.next(
                    data
                );
                this.router.navigate([
                    "/WebHooks/WebHookPayloadTemplate/webHookPayloadTemplate",
                ]);
                this.addAlertWebHookPayLoadTemplate.AddAlertWebHookPayLoadTemplateShow();
                this.webHookPayLoadTemplatesService.GetWebHookPayloadTemplates();
            });
    }

    /**
     * UpdateWebHookPayLoadTemplate
     */
    UpdateWebHookPayLoadTemplate(): void {
        const data = this.webHookPayLoadTemplateForm.getRawValue();
        this.webHookPayLoadTemplateService
            .UpdateWebHookPayLoadTemplate(data)
            .then(() => {
                this.webHookPayLoadTemplateService.onWebHookPayLoadTemplateChanged.next(
                    data
                );

                this.router.navigate([
                    "/WebHooks/WebHookPayloadTemplate/webHookPayloadTemplate",
                ]);
                this.updateAlertWebHookPayLoadTemplate.UpdateAlertWebHookPayLoadTemplateShow();
                this.webHookPayLoadTemplatesService.GetWebHookPayloadTemplates();
            });
    }
}
