export class FraudApi {
    Id: number;
    ParameterKey: string;
    Description: string;
    ServerCode: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    ControllerName: string;
    SearchStartTime: any;
    SearchEndTime: any;
    ActionName: string;
    HasFraudRule: boolean;
    LogApiCallCounts: boolean;
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
     * @param fraudApi
     */
    constructor(fraudApi?) {
        fraudApi = fraudApi || {};
        this.Id = fraudApi.Id;
        this.LogApiCallCounts = fraudApi.LogApiCallCounts;
        this.ActionName = fraudApi.ActionName;
        this.HasFraudRule = fraudApi.HasFraudRule;
        this.ParameterKey = fraudApi.ParameterKey;
        this.SearchStartTime = fraudApi.SearchStartTime;
        this.SearchEndTime = fraudApi.SearchEndTime;
        this.Description = fraudApi.Description;
        this.ServerCode = fraudApi.ServerCode;
        this.ControllerName = fraudApi.ControllerName;
        this.InsertDateTime = fraudApi.InsertDateTime;
        this.UpdateDateTime = fraudApi.UpdateDateTime;
        this.ApplicationType = fraudApi.ApplicationType;
        this.ApplicationTypeId = fraudApi.ApplicationTypeId;
        this.ApplicationTypeName = fraudApi.ApplicationTypeName;
        this.SearchStartDate = fraudApi.SearchStartDate;
        this.SearchEndDate = fraudApi.SearchEndDate;
        this.Url = fraudApi.Url;
        this.images = fraudApi.images || [];
    }
}
