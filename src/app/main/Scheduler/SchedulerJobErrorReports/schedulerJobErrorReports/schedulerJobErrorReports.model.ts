export class SchedulerJobErrorReport {
    Id: number;
    ParameterKey: string;
    Description: string;
    ServerCode: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    TenantId: number;
    TenantName: string;
    InsertDate: number;
    IsTenantBasedJob: boolean;
    SchedulerJobId: number;
    SchedulerJobDetailId: number;
    SchedulerJobQueueId: number;
    SchedulerJobDescription: string;
    RunStatus: string;
    RunStatusId: number;
    RunStatusName: string;
    ErrorMessage: string;
    StartDateTime: any;
    EndDateTime: any;
    MachineName: string;
    TotalElapsed: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param schedulerJobErrorReport
     */
    constructor(schedulerJobErrorReport?) {
        schedulerJobErrorReport = schedulerJobErrorReport || {};
        this.Id = schedulerJobErrorReport.Id;
        this.TenantId = schedulerJobErrorReport.TenantId;
        this.TenantName = schedulerJobErrorReport.TenantName;
        this.ParameterKey = schedulerJobErrorReport.ParameterKey;
        this.Description = schedulerJobErrorReport.Description;
        this.ServerCode = schedulerJobErrorReport.ServerCode;
        this.InsertDateTime = schedulerJobErrorReport.InsertDateTime;
        this.UpdateDateTime = schedulerJobErrorReport.UpdateDateTime;
        this.StartDateTime = schedulerJobErrorReport.StartDateTime;
        this.EndDateTime = schedulerJobErrorReport.EndDateTime;
        this.IsTenantBasedJob = schedulerJobErrorReport.IsTenantBasedJob;
        this.SchedulerJobId = schedulerJobErrorReport.SchedulerJobId;
        this.SchedulerJobDetailId =
            schedulerJobErrorReport.SchedulerJobDetailId;
        this.SchedulerJobQueueId = schedulerJobErrorReport.SchedulerJobQueueId;
        this.SchedulerJobDescription =
            schedulerJobErrorReport.SchedulerJobDescription;
        this.RunStatus = schedulerJobErrorReport.RunStatus;
        this.RunStatusId = schedulerJobErrorReport.RunStatusId;
        this.SearchStartDate = schedulerJobErrorReport.SearchStartDate;
        this.SearchEndDate = schedulerJobErrorReport.SearchEndDate;
        this.RunStatusName = schedulerJobErrorReport.RunStatusName;
        this.ErrorMessage = schedulerJobErrorReport.ErrorMessage;
        this.MachineName = schedulerJobErrorReport.MachineName;
        this.TotalElapsed = schedulerJobErrorReport.TotalElapsed;
        this.images = schedulerJobErrorReport.images || [];
    }
}
