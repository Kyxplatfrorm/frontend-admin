export class SchedulerInstant {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserTypeId: number;
    TenantId: number;
    TenantName: string;
    ProfileCode: string;
    ServerCode: string;
    Description: string;
    SchedulerJobType: string;
    SchedulerJobTypeName: string;
    ApplicationPath: string;
    ApplicationName: string;
    ApplicationParameter: string;
    FullClassName: string;
    MethodName: string;
    ProcedureName: string;
    IsTenantBasedJob: boolean;
    SchedulerJobId: number;
    SchedulerJobTypeId: number;
    SearchStartDate: any;
    SearchEndDate: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param schedulerInstant
     */
    constructor(schedulerInstant?) {
        schedulerInstant = schedulerInstant || {};
        this.Id = schedulerInstant.Id;
        this.SearchStartDate = schedulerInstant.SearchStartDate;
        this.SearchEndDate = schedulerInstant.SearchEndDate;
        this.TenantId = schedulerInstant.TenantId;
        this.InsertDateTime = schedulerInstant.InsertDateTime;
        this.UpdateDateTime = schedulerInstant.UpdateDateTime;
        this.UserTypeId = schedulerInstant.UserTypeId;
        this.TenantName = schedulerInstant.TenantName;
        this.ProfileCode = schedulerInstant.ProfileCode;
        this.ServerCode = schedulerInstant.ServerCode;
        this.Description = schedulerInstant.Description;
        this.SchedulerJobType = schedulerInstant.SchedulerJobType;
        this.SchedulerJobTypeName = schedulerInstant.SchedulerJobTypeName;
        this.ApplicationPath = schedulerInstant.ApplicationPath;
        this.ApplicationName = schedulerInstant.ApplicationName;
        this.ApplicationParameter = schedulerInstant.ApplicationParameter;
        this.FullClassName = schedulerInstant.FullClassName;
        this.MethodName = schedulerInstant.MethodName;
        this.ProcedureName = schedulerInstant.ProcedureName;
        this.IsTenantBasedJob = schedulerInstant.IsTenantBasedJob;
        this.SchedulerJobId = schedulerInstant.SchedulerJobId;
        this.SchedulerJobTypeId = schedulerInstant.SchedulerJobTypeId;
        this.images = schedulerInstant.images || [];
    }
}
