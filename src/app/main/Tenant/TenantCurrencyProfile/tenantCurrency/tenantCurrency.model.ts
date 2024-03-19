export class TenantCurrency {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantName: string;
    TenantCode: string;
    DefaultCurrencyCode: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantCurrency
     */
    constructor(tenantCurrency?) {
        tenantCurrency = tenantCurrency || {};
        this.Id = tenantCurrency.Id;
        this.TenantCode = tenantCurrency.TenantCode;
        this.DefaultCurrencyCode = tenantCurrency.DefaultCurrencyCode;
        this.TenantName = tenantCurrency.TenantName;
        this.InsertDateTime = tenantCurrency.InsertDateTime;
        this.UpdateDateTime = tenantCurrency.UpdateDateTime;
        this.images = tenantCurrency.images || [];
    }
}
