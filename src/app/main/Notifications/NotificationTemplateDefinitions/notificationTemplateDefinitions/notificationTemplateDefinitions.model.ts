export class NotificationTemplate {
    Id: number;
    ParameterKey: string;
    Description: string;
    CompanyId: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    NotificationTypeId: number;
    LanguageCodeId: number;
    Subject: string;
    SearchStartDate: any;
    SearchEndDate: any;
    TemplateTypeId: number;
    IsDefaultTemplate: boolean;
    IsCompanyTemplate: boolean;
    CompanyName: string;
    LanguageCode: string;
    LanguageCodeName: string;
    TemplateCode: string;
    TemplateType: string;
    TemplateTypeName: string;
    Content: string;
    IsEncrypted: boolean;
    HasExpiryDateTime: boolean;
    ExpirySecondCount: number;
    SearchStartTime: number;
    SearchEndTime: number;
    ExpiryDateTime: any;
    TenantId: number;
    TenantName: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param notificationTemplate
     */
    constructor(notificationTemplate?) {
        notificationTemplate = notificationTemplate || {};
        this.Id = notificationTemplate.Id;
        this.TenantId = notificationTemplate.TenantId;
        this.TenantName = notificationTemplate.TenantName;
        this.ParameterKey = notificationTemplate.ParameterKey;
        this.TemplateTypeId = notificationTemplate.TemplateTypeId;
        this.Description = notificationTemplate.Description;
        this.CompanyId = notificationTemplate.CompanyId;
        this.InsertDateTime = notificationTemplate.InsertDateTime;
        this.UpdateDateTime = notificationTemplate.UpdateDateTime;
        this.NotificationTypeId = notificationTemplate.NotificationTypeId;
        this.LanguageCodeId = notificationTemplate.LanguageCodeId;
        this.LanguageCode = notificationTemplate.LanguageCode;
        this.LanguageCodeName = notificationTemplate.LanguageCodeName;
        this.Content = notificationTemplate.Content;
        this.IsEncrypted = notificationTemplate.IsEncrypted;
        this.HasExpiryDateTime = notificationTemplate.HasExpiryDateTime;
        this.SearchStartDate = notificationTemplate.SearchStartDate;
        this.SearchEndDate = notificationTemplate.SearchEndDate;
        this.SearchEndTime = notificationTemplate.SearchEndTime;
        this.SearchEndTime = notificationTemplate.SearchEndTime;
        this.TemplateTypeName = notificationTemplate.TemplateTypeName;
        this.TemplateType = notificationTemplate.TemplateType;
        this.TemplateCode = notificationTemplate.TemplateCode;
        this.IsDefaultTemplate = notificationTemplate.IsDefaultTemplate;
        this.IsCompanyTemplate = notificationTemplate.IsCompanyTemplate;
        this.Subject = notificationTemplate.Subject;
        this.ExpiryDateTime = notificationTemplate.ExpiryDateTime;
        this.ExpirySecondCount = notificationTemplate.ExpirySecondCount;
        this.images = notificationTemplate.images || [];
    }
}
