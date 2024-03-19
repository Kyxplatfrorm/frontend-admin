export class ApplicationUrl {
    Id: number;
    ParameterKey: string;
    Description: string;
    ServerCode: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    TenantName: string;
    SearchStartTime: any;
    SearchEndTime: any;
    IsDefaultDefinition: boolean;
    ApplicationType: string;
    ApplicationTypeName: string;
    ApplicationTypeId: number;
    Url: string;
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
     * @param applicationUrl
     */
    constructor(applicationUrl?) {
        applicationUrl = applicationUrl || {};
        this.Id = applicationUrl.Id;
        this.IsDefaultDefinition = applicationUrl.IsDefaultDefinition;
        this.TenantId = applicationUrl.TenantId;
        this.TenantName = applicationUrl.TenantName;
        this.ParameterKey = applicationUrl.ParameterKey;
        this.SearchStartTime = applicationUrl.SearchStartTime;
        this.SearchEndTime = applicationUrl.SearchEndTime;
        this.Description = applicationUrl.Description;
        this.ServerCode = applicationUrl.ServerCode;
        this.InsertDateTime = applicationUrl.InsertDateTime;
        this.UpdateDateTime = applicationUrl.UpdateDateTime;
        this.ApplicationType = applicationUrl.ApplicationType;
        this.ApplicationTypeId = applicationUrl.ApplicationTypeId;
        this.ApplicationTypeName = applicationUrl.ApplicationTypeName;
        this.SearchStartDate = applicationUrl.SearchStartDate;
        this.SearchEndDate = applicationUrl.SearchEndDate;
        this.Url = applicationUrl.Url;
        this.images = applicationUrl.images || [];
    }
}
