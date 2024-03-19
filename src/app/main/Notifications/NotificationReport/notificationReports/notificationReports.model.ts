export class NotificationReport {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    UserTypeId: number;
    TenantId: number;
    CustomerId: number;
    CompanyId: number;
    SessionId: number;
    NotificationTypeId: number;
    TemplateId: number;
    LanguageCodeId: number;
    SentStatusId: number;
    MaxRetryCount: number;
    AttemptCount: number;
    Priority: number;
    TenantName: string;
    CustomerName: string;
    NotificationType: string;
    NotificationTypeName: string;
    TemplateName: string;
    LanguageCode: string;
    LanguageCodeName: string;
    ReceiverAddress: string;
    Subject: string;
    SentStatus: string;
    SentStatusName: string;
    Content: string;
    IsEncrypted: boolean;
    HasExpiryDateTime: boolean;
    ExpiryDateTime: any;
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
     * @param notificationReport
     */
    constructor(notificationReport?) {
        notificationReport = notificationReport || {};
        this.Id = notificationReport.Id;
        this.TenantId = notificationReport.TenantId;
        this.CustomerId = notificationReport.CustomerId;
        this.UserTypeId = notificationReport.UserTypeId;
        this.CompanyId = notificationReport.CompanyId;
        this.SessionId = notificationReport.SessionId;
        this.NotificationTypeId = notificationReport.NotificationTypeId;
        this.TemplateId = notificationReport.TemplateId;
        this.LanguageCodeId = notificationReport.LanguageCodeId;
        this.SentStatusId = notificationReport.SentStatusId;
        this.MaxRetryCount = notificationReport.MaxRetryCount;
        this.InsertDateTime = notificationReport.InsertDateTime;
        this.UpdateDateTime = notificationReport.UpdateDateTime;
        this.AttemptCount = notificationReport.AttemptCount;
        this.Priority = notificationReport.Priority;
        this.TenantName = notificationReport.TenantName;
        this.CustomerName = notificationReport.CustomerName;
        this.NotificationType = notificationReport.NotificationType;
        this.NotificationTypeName = notificationReport.NotificationTypeName;
        this.TemplateName = notificationReport.TemplateName;
        this.LanguageCode = notificationReport.LanguageCode;
        this.LanguageCodeName = notificationReport.LanguageCodeName;
        this.ReceiverAddress = notificationReport.ReceiverAddress;
        this.Subject = notificationReport.Subject;
        this.SentStatus = notificationReport.SentStatus;
        this.SentStatusName = notificationReport.SentStatusName;
        this.Content = notificationReport.Content;
        this.IsEncrypted = notificationReport.IsEncrypted;
        this.HasExpiryDateTime = notificationReport.HasExpiryDateTime;
        this.ExpiryDateTime = notificationReport.ExpiryDateTime;
        this.SearchStartDate = notificationReport.SearchStartDate;
        this.SearchEndDate = notificationReport.SearchEndDate;
        this.SearchEndTime = notificationReport.SearchEndTime;
        this.SearchEndTime = notificationReport.SearchEndTime;
        this.images = notificationReport.images || [];
    }
}
