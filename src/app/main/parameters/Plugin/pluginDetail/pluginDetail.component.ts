import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { Plugin } from "../plugins/plugins.model";
import { PluginService } from "../plugins/plugins.service";
import { PluginDetailService } from "./pluginDetail.service";
import AddAlertPlugin from "./addPlugin";
import UpdateAlertPlugin from "./updatePlugin";

@Component({
    selector: "pluginDetail",
    templateUrl: "./pluginDetail.component.html",
    styleUrls: ["./pluginDetail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class PluginDetailComponent implements OnInit, OnDestroy {
    dialogRef: any;
    plugin: Plugin;
    pageType: string;
    tenantList: TenantDefinitionEntity[];
    pluginDetailForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    routeParams: any;

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
        private pluginService: PluginService,
        private pluginDetailservice: PluginDetailService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        _router: ActivatedRoute,
        private addAlertPlugin: AddAlertPlugin,
        private updateAlertPlugin: UpdateAlertPlugin
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.plugin = new Plugin();
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.pluginService.GetTenants().then(() => {
            this.tenantList =
                this.pluginService.tenantDefApiResponse.TenantDefinitionList;
        });

        this.pluginDetailservice.onPluginChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((plugin) => {
                if (plugin) {
                    this.plugin = new Plugin(plugin);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.plugin = new Plugin();
                }
                this.pluginDetailForm = this.createPluginDetailForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createPluginDetailForm
     *
     * @returns {FormGroup}
     */
    createPluginDetailForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.plugin.Id],
            TenantId: [this.plugin.TenantId],
            PluginCode: [this.plugin.PluginCode],
            PluginGroupCode: [this.plugin.PluginGroupCode],
            PluginDescription: [this.plugin.PluginDescription],
            PluginPath: [this.plugin.PluginPath],
            PluginAssemblyName: [this.plugin.PluginAssemblyName],
            PluginFullClassName: [this.plugin.PluginFullClassName],
            PluginConfig: [this.plugin.PluginConfig],
            IsDefault: [this.plugin.IsDefault],
        });
    }

    /**
     * UpdateJsonConfigDetail
     */
    UpdatePluginDetail(): void {
        const data = this.pluginDetailForm.getRawValue();
        this.pluginDetailservice.UpdatePluginDetail(data).then(() => {
            this.pluginDetailservice.onPluginChanged.next(data);
            this.router.navigate(["/Parameters/Plugin/plugins"]);
            this.updateAlertPlugin.UpdateAlertPluginShow();
            this.pluginService.GetPlugins();
        });
    }

    /**
     * CreatePluginDetail
     */
    CreatePluginDetail(): void {
        const data = this.pluginDetailForm.getRawValue();
        this.pluginDetailservice.CreatePluginDetail(data).then(() => {
            this.pluginDetailservice.onPluginChanged.next(data);
            this.router.navigate(["/Parameters/Plugin/plugins"]);
            this.addAlertPlugin.AddAlertPluginShow();
            this.pluginService.GetPlugins();
        });
    }
}
