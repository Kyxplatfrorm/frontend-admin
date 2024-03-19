export class NotificationMonitoring {
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
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param notificationMonitoring
     */
    constructor(notificationMonitoring?) {
        notificationMonitoring = notificationMonitoring || {};
        this.Id = notificationMonitoring.Id;
        this.TenantId = notificationMonitoring.TenantId;
        this.CustomerId = notificationMonitoring.CustomerId;
        this.UserTypeId = notificationMonitoring.UserTypeId;
        this.CompanyId = notificationMonitoring.CompanyId;
        this.SessionId = notificationMonitoring.SessionId;
        this.NotificationTypeId = notificationMonitoring.NotificationTypeId;
        this.TemplateId = notificationMonitoring.TemplateId;
        this.LanguageCodeId = notificationMonitoring.LanguageCodeId;
        this.SentStatusId = notificationMonitoring.SentStatusId;
        this.MaxRetryCount = notificationMonitoring.MaxRetryCount;
        this.InsertDateTime = notificationMonitoring.InsertDateTime;
        this.UpdateDateTime = notificationMonitoring.UpdateDateTime;
        this.AttemptCount = notificationMonitoring.AttemptCount;
        this.Priority = notificationMonitoring.Priority;
        this.TenantName = notificationMonitoring.TenantName;
        this.CustomerName = notificationMonitoring.CustomerName;
        this.NotificationType = notificationMonitoring.NotificationType;
        this.NotificationTypeName = notificationMonitoring.NotificationTypeName;
        this.TemplateName = notificationMonitoring.TemplateName;
        this.LanguageCode = notificationMonitoring.LanguageCode;
        this.LanguageCodeName = notificationMonitoring.LanguageCodeName;
        this.ReceiverAddress = notificationMonitoring.ReceiverAddress;
        this.Subject = notificationMonitoring.Subject;
        this.SentStatus = notificationMonitoring.SentStatus;
        this.SentStatusName = notificationMonitoring.SentStatusName;
        this.Content = notificationMonitoring.Content;
        this.IsEncrypted = notificationMonitoring.IsEncrypted;
        this.HasExpiryDateTime = notificationMonitoring.HasExpiryDateTime;
        this.ExpiryDateTime = notificationMonitoring.ExpiryDateTime;
        this.images = notificationMonitoring.images || [];
    }
}
