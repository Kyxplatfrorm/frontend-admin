export class WebHookMonitoring {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserTypeId: number;
    TenantId: number;
    TenantName: string;
    WebHookType: string;
    WebHookTypeName: string;
    RecordType: string;
    RunStatus: string;
    RunStatusName: string;
    HttpPostUrl: string;
    ResultMessage: string;
    MachineName: string;
    ReferenceNumberType: string;
    ReferenceNumber: string;
    WebHookPayLoad: string;
    InsertDate: number;
    CompanyId: number;
    WebHookProfileId: number;
    WebHookTypeId: number;
    RunStatusId: number;
    HttpStatusCode: number;
    RetryCount: number;
    ApplicationId: number;
    TotalElapsed: number;
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
     * @param webHookMonitoring
     */
    constructor(webHookMonitoring?) {
        webHookMonitoring = webHookMonitoring || {};
        this.Id = webHookMonitoring.Id;
        this.TenantId = webHookMonitoring.TenantId;
        this.UserTypeId = webHookMonitoring.UserTypeId;
        this.CompanyId = webHookMonitoring.CompanyId;
        this.InsertDateTime = webHookMonitoring.InsertDateTime;
        this.UpdateDateTime = webHookMonitoring.UpdateDateTime;
        this.TenantName = webHookMonitoring.TenantName;
        this.WebHookType = webHookMonitoring.WebHookType;
        this.WebHookTypeName = webHookMonitoring.WebHookTypeName;
        this.RecordType = webHookMonitoring.RecordType;
        this.RunStatus = webHookMonitoring.RunStatus;
        this.RunStatusName = webHookMonitoring.RunStatusName;
        this.HttpPostUrl = webHookMonitoring.HttpPostUrl;
        this.ResultMessage = webHookMonitoring.ResultMessage;
        this.MachineName = webHookMonitoring.MachineName;
        this.ReferenceNumberType = webHookMonitoring.ReferenceNumberType;
        this.ReferenceNumber = webHookMonitoring.ReferenceNumber;
        this.WebHookPayLoad = webHookMonitoring.WebHookPayLoad;
        this.InsertDate = webHookMonitoring.InsertDate;
        this.CompanyId = webHookMonitoring.CompanyId;
        this.WebHookProfileId = webHookMonitoring.WebHookProfileId;
        this.WebHookTypeId = webHookMonitoring.WebHookTypeId;
        this.RunStatusId = webHookMonitoring.RunStatusId;
        this.HttpStatusCode = webHookMonitoring.HttpStatusCode;
        this.RetryCount = webHookMonitoring.RetryCount;
        this.ApplicationId = webHookMonitoring.ApplicationId;
        this.TotalElapsed = webHookMonitoring.TotalElapsed;
        this.DueDateTime = webHookMonitoring.DueDateTime;
        this.QueueDateTime = webHookMonitoring.QueueDateTime;
        this.StartDateTime = webHookMonitoring.StartDateTime;
        this.EndDateTime = webHookMonitoring.EndDateTime;
        this.images = webHookMonitoring.images || [];
    }
}
