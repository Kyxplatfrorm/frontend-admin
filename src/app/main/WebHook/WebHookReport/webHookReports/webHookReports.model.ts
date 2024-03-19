export class WebHookReport {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    TenantId: number;
    UserTypeId: number;
    ParameterKey: string;
    Description: string;
    CompanyId: number;
    WebHookProfileId: number;
    WebHookTypeId: number;
    RunStatusId: number;
    HttpStatusCode: number;
    RetryCount: number;
    ApplicationId: number;
    TotalElapsed: number;
    ReferenceNumber: string;
    HttpPostUrl: string;
    ResultMessage: string;
    RecordType: string;
    TenantName: string;
    WebHookType: string;
    WebHookTypeName: string;
    RunStatus: string;
    RunStatusName: string;
    MachineName: string;
    ReferenceNumberType: string;
    WebHookPayLoad: string;
    InsertDate: number;
    DueDateTime: any;
    QueueDateTime: any;
    StartDateTime: any;
    EndDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param webHookReport
     */
    constructor(webHookReport?) {
        webHookReport = webHookReport || {};
        this.Id = webHookReport.Id;
        this.TenantId = webHookReport.TenantId;
        this.UserTypeId = webHookReport.UserTypeId;
        this.CompanyId = webHookReport.CompanyId;
        this.InsertDateTime = webHookReport.InsertDateTime;
        this.UpdateDateTime = webHookReport.UpdateDateTime;
        this.TenantName = webHookReport.TenantName;
        this.SearchStartDate = webHookReport.SearchStartDate;
        this.SearchEndDate = webHookReport.SearchEndDate;
        this.ParameterKey = webHookReport.ParameterKey;
        this.Description = webHookReport.Description;
        this.WebHookProfileId = webHookReport.WebHookProfileId;
        this.WebHookTypeId = webHookReport.WebHookTypeId;
        this.RunStatusId = webHookReport.RunStatusId;
        this.HttpStatusCode = webHookReport.HttpStatusCode;
        this.RetryCount = webHookReport.RetryCount;
        this.ApplicationId = webHookReport.ApplicationId;
        this.TotalElapsed = webHookReport.TotalElapsed;
        this.ReferenceNumber = webHookReport.ReferenceNumber;
        this.HttpPostUrl = webHookReport.HttpPostUrl;
        this.ResultMessage = webHookReport.ResultMessage;
        this.RecordType = webHookReport.RecordType;
        this.WebHookType = webHookReport.WebHookType;
        this.WebHookTypeName = webHookReport.WebHookTypeName;
        this.RunStatus = webHookReport.RunStatus;
        this.RunStatusName = webHookReport.RunStatusName;
        this.MachineName = webHookReport.MachineName;
        this.ReferenceNumberType = webHookReport.ReferenceNumberType;
        this.WebHookPayLoad = webHookReport.WebHookPayLoad;
        this.InsertDate = webHookReport.InsertDate;
        this.DueDateTime = webHookReport.DueDateTime;
        this.QueueDateTime = webHookReport.QueueDateTime;
        this.StartDateTime = webHookReport.StartDateTime;
        this.EndDateTime = webHookReport.EndDateTime;
        this.images = webHookReport.images || [];
    }
}
