import { SchedulerJobDetailEntity } from "app/ui/schedulerJobDefinition";

export class SchedulerJob {
    Id: number;
    ParameterKey: string;
    Description: string;
    ServerCode: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    RecurringTypeId: number;
    RecurringLevelId: number;
    RecurringWeekDayList: number[];
    LastRunStatusId: number;
    SearchStartDate: any;
    SearchEndDate: any;
    TenantId: number;
    TenantName: string;
    IsActive: boolean;
    IsTenantBasedJob: boolean;
    RunIfFails: boolean;
    HasMultiStep: boolean;
    StartDateTime: any;
    EndDateTime: any;
    StartTime: any;
    EndTime: any;
    RecurringEvery: number;
    ApplicationId: number;
    EstimatedExecutionTime: number;
    LastOrderId: number;
    LastProcessedStepCount: number;
    LastSubStepCount: number;
    LastRunDate: any;
    RecurringType: string;
    RecurringTypeName: string;
    RecurringLevel: string;
    RecurringLevelName: string;
    RecurringWeekDays: string;
    LastRunStatus: string;
    LastRunStatusName: string;
    RecurringDailyTimes: string;
    MachineName: string;
    SchedulerJobId: number;
    OrderId: number;
    SchedulerJobTypeId: number;
    SchedulerJobName: string;
    SchedulerJobType: string;
    SchedulerJobTypeName: string;
    ApplicationPath: string;
    ApplicationName: string;
    ApplicationParameter: string;
    SchedulerJobDetail: Array<SchedulerJobDetailEntity>;
    FullClassName: string;
    MethodName: string;
    ProcedureName: string;
    SearchStartTime: any;
    SearchEndTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param schedulerJob
     */
    constructor(schedulerJob?) {
        schedulerJob = schedulerJob || {};
        this.Id = schedulerJob.Id;
        this.SchedulerJobDetail = schedulerJob.SchedulerJobDetail;
        this.RecurringTypeName = schedulerJob.RecurringTypeName;
        this.TenantId = schedulerJob.TenantId;
        this.RecurringWeekDayList = schedulerJob.RecurringWeekDayList;
        this.TenantName = schedulerJob.TenantName;
        this.ParameterKey = schedulerJob.ParameterKey;
        this.SearchStartTime = schedulerJob.SearchStartTime;
        this.SearchEndTime = schedulerJob.SearchEndTime;
        this.Description = schedulerJob.Description;
        this.ServerCode = schedulerJob.ServerCode;
        this.InsertDateTime = schedulerJob.InsertDateTime;
        this.UpdateDateTime = schedulerJob.UpdateDateTime;
        this.RecurringTypeId = schedulerJob.RecurringTypeId;
        this.RecurringLevelId = schedulerJob.RecurringLevelId;
        this.LastRunStatusId = schedulerJob.LastRunStatusId;
        this.SearchStartDate = schedulerJob.SearchStartDate;
        this.SearchEndDate = schedulerJob.SearchEndDate;
        this.IsActive = schedulerJob.IsActive;
        this.IsTenantBasedJob = schedulerJob.IsTenantBasedJob;
        this.RunIfFails = schedulerJob.RunIfFails;
        this.HasMultiStep = schedulerJob.HasMultiStep;
        this.StartDateTime = schedulerJob.StartDateTime;
        this.EndDateTime = schedulerJob.EndDateTime;
        this.RecurringEvery = schedulerJob.RecurringEvery;
        this.ApplicationId = schedulerJob.ApplicationId;
        this.EstimatedExecutionTime = schedulerJob.EstimatedExecutionTime;
        this.LastOrderId = schedulerJob.LastOrderId;
        this.RecurringLevelName = schedulerJob.RecurringLevelName;
        this.RecurringWeekDays = schedulerJob.RecurringWeekDays;
        this.LastRunStatus = schedulerJob.LastRunStatus;
        this.LastRunStatusName = schedulerJob.LastRunStatusName;
        this.RecurringDailyTimes = schedulerJob.RecurringDailyTimes;
        this.MachineName = schedulerJob.MachineName;
        this.SchedulerJobId = schedulerJob.SchedulerJobId;
        this.OrderId = schedulerJob.OrderId;
        this.SchedulerJobTypeId = schedulerJob.SchedulerJobTypeId;
        this.SchedulerJobName = schedulerJob.SchedulerJobName;
        this.SchedulerJobType = schedulerJob.SchedulerJobType;
        this.SchedulerJobTypeName = schedulerJob.SchedulerJobTypeName;
        this.ApplicationPath = schedulerJob.ApplicationPath;
        this.ApplicationName = schedulerJob.ApplicationName;
        this.ApplicationParameter = schedulerJob.ApplicationParameter;
        this.FullClassName = schedulerJob.FullClassName;
        this.MethodName = schedulerJob.MethodName;
        this.ProcedureName = schedulerJob.ProcedureName;
        this.StartTime = schedulerJob.StartTime;
        this.EndTime = schedulerJob.EndTime;
        this.images = schedulerJob.images || [];
    }
}
