export class SchedulerJobReport {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserTypeId: number;
    TenantId: number;
    TenantName: string;
    Description: string;
    ServerCode: string;
    SchedulerJobName: string;
    SchedulerJobDetailName: string;
    RecurringType: string;
    RecurringTypeName: string;
    RunStatus: string;
    RunStatusName: string;
    SchedulerJobType: string;
    SchedulerJobTypeName: string;
    ApplicationPath: string;
    ApplicationName: string;
    ApplicationParameter: string;
    FullClassName: string;
    MethodName: string;
    ProcedureName: string;
    ResultMessage: string;
    MachineName: string;
    IsTenantBasedJob: boolean;
    IsInstantJob: boolean;
    InsertDate: number;
    SchedulerJobId: number;
    SchedulerJobDetailId: number;
    RecurringTypeId: number;
    OrderId: number;
    RunStatusId: number;
    SchedulerJobTypeId: number;
    ExitCode: number;
    Pid: number;
    ExecutionTimeout: number;
    RetryCount: number;
    DueDate: number;
    ApplicationId: number;
    TotalElapsed: number;
    QueueDateTime: any;
    StartDateTime: any;
    EndDateTime: any;
    DueDateTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    SearchStartTime: number;
    SearchEndTime: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param schedulerJobReport
     */
    constructor(schedulerJobReport?) {
        schedulerJobReport = schedulerJobReport || {};
        this.Id = schedulerJobReport.Id;
        this.TenantId = schedulerJobReport.TenantId;
        this.TenantName = schedulerJobReport.TenantName;
        this.UserTypeId = schedulerJobReport.UserTypeId;
        this.Description = schedulerJobReport.Description;
        this.ServerCode = schedulerJobReport.ServerCode;
        this.SchedulerJobName = schedulerJobReport.SchedulerJobName;
        this.SchedulerJobDetailName = schedulerJobReport.SchedulerJobDetailName;
        this.RecurringType = schedulerJobReport.RecurringType;
        this.RecurringTypeName = schedulerJobReport.RecurringTypeName;
        this.RunStatus = schedulerJobReport.RunStatus;
        this.InsertDateTime = schedulerJobReport.InsertDateTime;
        this.UpdateDateTime = schedulerJobReport.UpdateDateTime;
        this.RunStatusName = schedulerJobReport.RunStatusName;
        this.SchedulerJobType = schedulerJobReport.SchedulerJobType;
        this.TenantName = schedulerJobReport.TenantName;
        this.SchedulerJobTypeName = schedulerJobReport.SchedulerJobTypeName;
        this.ApplicationPath = schedulerJobReport.ApplicationPath;
        this.ApplicationName = schedulerJobReport.ApplicationName;
        this.ApplicationParameter = schedulerJobReport.ApplicationParameter;
        this.FullClassName = schedulerJobReport.FullClassName;
        this.MethodName = schedulerJobReport.MethodName;
        this.ProcedureName = schedulerJobReport.ProcedureName;
        this.ResultMessage = schedulerJobReport.ResultMessage;
        this.MachineName = schedulerJobReport.MachineName;
        this.IsTenantBasedJob = schedulerJobReport.IsTenantBasedJob;
        this.IsInstantJob = schedulerJobReport.IsInstantJob;
        this.InsertDate = schedulerJobReport.InsertDate;
        this.SchedulerJobId = schedulerJobReport.SchedulerJobId;
        this.SchedulerJobDetailId = schedulerJobReport.SchedulerJobDetailId;
        this.RecurringTypeId = schedulerJobReport.RecurringTypeId;
        this.OrderId = schedulerJobReport.OrderId;
        this.RunStatusId = schedulerJobReport.RunStatusId;
        this.SchedulerJobTypeId = schedulerJobReport.SchedulerJobTypeId;
        this.ExitCode = schedulerJobReport.ExitCode;
        this.Pid = schedulerJobReport.Pid;
        this.ExecutionTimeout = schedulerJobReport.ExecutionTimeout;
        this.RetryCount = schedulerJobReport.RetryCount;
        this.DueDate = schedulerJobReport.DueDate;
        this.ApplicationId = schedulerJobReport.ApplicationId;
        this.TotalElapsed = schedulerJobReport.TotalElapsed;
        this.QueueDateTime = schedulerJobReport.QueueDateTime;
        this.StartDateTime = schedulerJobReport.StartDateTime;
        this.EndDateTime = schedulerJobReport.EndDateTime;
        this.DueDateTime = schedulerJobReport.DueDateTime;
        this.SearchStartDate = schedulerJobReport.SearchStartDate;
        this.SearchEndDate = schedulerJobReport.SearchEndDate;
        this.SearchEndTime = schedulerJobReport.SearchEndTime;
        this.SearchEndTime = schedulerJobReport.SearchEndTime;
        this.images = schedulerJobReport.images || [];
    }
}
