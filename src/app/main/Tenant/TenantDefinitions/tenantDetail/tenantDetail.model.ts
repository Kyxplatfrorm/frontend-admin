export class Tenant {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantName: string;
    TenantCode: string;
    DefaultCurrencyCode: string;
    TenantLogoUrl: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenant
     */
    constructor(tenant?) {
        tenant = tenant || {};
        this.Id = tenant.Id;
        this.TenantCode = tenant.TenantCode;
        this.DefaultCurrencyCode = tenant.DefaultCurrencyCode;
        this.TenantLogoUrl = tenant.TenantLogoUrl;
        this.TenantName = tenant.TenantName;
        this.InsertDateTime = tenant.InsertDateTime;
        this.UpdateDateTime = tenant.UpdateDateTime;
        this.images = tenant.images || [];
    }
}
