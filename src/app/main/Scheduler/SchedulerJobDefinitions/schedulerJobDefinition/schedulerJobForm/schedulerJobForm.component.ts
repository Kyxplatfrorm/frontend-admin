import {
    Component,
    EventEmitter,
    Inject,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { SchedulerJob } from "../../schedulerJobDefinitions/schedulerJobDefinitions.model";
import {
    SchedulerJobTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/schedulerJobDefinition";
import { SchedulerJobDefinitionsService } from "../../schedulerJobDefinitions/schedulerJobDefinitions.service";
import { SchedulerJobDefinitionService } from "../schedulerJobDefinition.service";

@Component({
    selector: "schedulerJobForm-dialog",
    templateUrl: "./schedulerJobForm.component.html",
    styleUrls: ["./schedulerJobForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SchedulerJobFormDialogComponent {
    action: string;
    schedulerJob: SchedulerJob;
    schedulerJobForm: FormGroup;
    dialogTitle: string;
    schedulerJobType: SchedulerJobTypeEntity[];
    tenant: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<SchedulerJobFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SchedulerJobFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private schedulerJobDefinitionsService: SchedulerJobDefinitionsService,
        private schedulerJobDefinitionService: SchedulerJobDefinitionService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextSchedulerJobDefinition = "";
        if (this.action === "edit") {
            popUpHeaderTextSchedulerJobDefinition = "EDITPROFILE";
            this.schedulerJob = this._data.schedulerJob;
        } else {
            popUpHeaderTextSchedulerJobDefinition = "NEWPROFILE";
            this.schedulerJob = new SchedulerJob();
            const selectedId = this.schedulerJobDefinitionService.routeParams?.id;
    
            if (selectedId && selectedId !== 'new') {
                this.schedulerJob.SchedulerJobId = selectedId;
            }

            this._fuseTranslationLoaderService
                .getTranslation(popUpHeaderTextSchedulerJobDefinition)
                .subscribe((x) => (this.dialogTitle = x));
        }
        this.schedulerJobForm = this.createSchedulerJobForm();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.schedulerJobDefinitionsService.GetSchedulerJobTypes().then(() => {
            this.schedulerJobType =
                this.schedulerJobDefinitionsService.schedulerJobTypeApiResponse.ParameterList;
        });

        this.schedulerJobDefinitionsService.GetTenants().then(() => {
            this.tenant =
                this.schedulerJobDefinitionsService.tenantApiResponse.TenantDefinitionList;
        });
    }

    /**
     * createSchedulerJobForm
     *
     * @returns {FormGroup}
     */
    createSchedulerJobForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.schedulerJob.Id],
            SchedulerJobId: [this.schedulerJob.SchedulerJobId],
            SchedulerJobName: [this.schedulerJob.SchedulerJobName],
            TenantId: [this.schedulerJob.TenantId],
            IsTenantBasedJob: [this.schedulerJob.IsTenantBasedJob],
            IsActive: [this.schedulerJob.IsActive],
            OrderId: [this.schedulerJob.OrderId],
            Description: [this.schedulerJob.Description],
            SchedulerJobTypeId: [this.schedulerJob.SchedulerJobTypeId],
            ApplicationPath: [this.schedulerJob.ApplicationPath],
            ApplicationName: [this.schedulerJob.ApplicationName],
            ApplicationParameter: [this.schedulerJob.ApplicationParameter],
            FullClassName: [this.schedulerJob.FullClassName],
            MethodName: [this.schedulerJob.MethodName],
            ProcedureName: [this.schedulerJob.ProcedureName],
        });
    }
}
