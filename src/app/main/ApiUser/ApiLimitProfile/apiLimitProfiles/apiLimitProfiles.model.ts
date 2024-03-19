export class ApiLimitProfile {
    Id: number;
    Description: string;
    ParameterKey: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    ProfileName: string;
    IsBuiltInDefinition: boolean;
    ValidDaysId: number;
    HasValidDays: boolean;
    ValidDays: string;
    ValidDayList: number[];
    HasValidHours: boolean;
    ValidStartTime: string;
    ValidEndTime: string;
    HasDailyMaxExecutionCount: boolean;
    DailyMaxExecutionCount: number;
    HasMaxTpsCount: boolean;
    MaxTpsCount: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param apiLimitProfile
     */
    constructor(apiLimitProfile?) {
        apiLimitProfile = apiLimitProfile || {};
        this.Id = apiLimitProfile.Id || 0;
        this.Description = apiLimitProfile.Description || "";
        this.ParameterKey = apiLimitProfile.ParameterKey || "";
        this.InsertDateTime = apiLimitProfile.InsertDateTime || "";
        this.UpdateDateTime = apiLimitProfile.UpdateDateTime || "";
        this.TenantId = apiLimitProfile.TenantId || 0;
        this.ProfileName = apiLimitProfile.ProfileName || "";
        this.IsBuiltInDefinition = apiLimitProfile.IsBuiltInDefinition || false;
        this.ValidDaysId = apiLimitProfile.ValidDaysId || 0;
        this.HasValidDays = apiLimitProfile.HasValidDays || false;
        this.ValidDays = apiLimitProfile.ValidDays || [];
        this.HasValidHours = apiLimitProfile.HasValidHours || false;
        this.ValidStartTime = apiLimitProfile.ValidStartTime || "";
        this.ValidEndTime = apiLimitProfile.ValidEndTime || "";
        this.HasDailyMaxExecutionCount =
            apiLimitProfile.HasDailyMaxExecutionCount || false;
        this.DailyMaxExecutionCount =
            apiLimitProfile.DailyMaxExecutionCount || 0;
        this.HasMaxTpsCount = apiLimitProfile.HasMaxTpsCount || false;
        this.MaxTpsCount = apiLimitProfile.MaxTpsCount || 0;
        this.ValidDayList = apiLimitProfile.ValidDayList;
        this.images = apiLimitProfile.images || [];
    }
}
