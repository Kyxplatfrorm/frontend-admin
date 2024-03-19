export class TenantWebHook {
    Id: number;
    ParameterKey: string;
    Description: string;
    CompanyId: number;
    TenantId: number;
    TenantName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    WebHookTypeId: number;
    IsActive: boolean;
    WebHookType: string;
    WebHookTypeName: string;
    WebHookUrl: string;
    WebHookApiPath: string;
    HttpHeaderApiKeyName: string;
    EncryptedApiKey: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantWebHook
     */
    constructor(tenantWebHook?) {
        tenantWebHook = tenantWebHook || {};
        this.Id = tenantWebHook.Id;
        this.TenantId = tenantWebHook.TenantId;
        this.TenantName = tenantWebHook.TenantName;
        this.ParameterKey = tenantWebHook.ParameterKey;
        this.Description = tenantWebHook.Description;
        this.CompanyId = tenantWebHook.CompanyId;
        this.InsertDateTime = tenantWebHook.InsertDateTime;
        this.UpdateDateTime = tenantWebHook.UpdateDateTime;
        this.SearchStartDate = tenantWebHook.SearchStartDate;
        this.SearchEndDate = tenantWebHook.SearchEndDate;
        this.WebHookTypeId = tenantWebHook.WebHookTypeId;
        this.IsActive = tenantWebHook.IsActive;
        this.WebHookType = tenantWebHook.WebHookType;
        this.WebHookTypeName = tenantWebHook.WebHookTypeName;
        this.WebHookUrl = tenantWebHook.WebHookUrl;
        this.WebHookApiPath = tenantWebHook.WebHookApiPath;
        this.HttpHeaderApiKeyName = tenantWebHook.HttpHeaderApiKeyName;
        this.EncryptedApiKey = tenantWebHook.EncryptedApiKey;
        this.images = tenantWebHook.images || [];
    }
}
