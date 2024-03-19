export class TenantCurrency {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    CurrencyCode: string;
    CurrencyCodeNumeric: string;
    CurrencyName: string;
    IsActive: boolean;
    IsSettlementCurrency: boolean;
    IsCryptoCurrency: boolean;
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
        this.InsertDateTime = tenantCurrency.InsertDateTime;
        this.UpdateDateTime = tenantCurrency.UpdateDateTime;
        this.TenantId = tenantCurrency.TenantId;
        this.CurrencyCode = tenantCurrency.CurrencyCode;
        this.CurrencyCodeNumeric = tenantCurrency.CurrencyCodeNumeric;
        this.CurrencyName = tenantCurrency.CurrencyName;
        this.IsActive = tenantCurrency.IsActive;
        this.IsSettlementCurrency = tenantCurrency.IsSettlementCurrency;
        this.IsCryptoCurrency = tenantCurrency.IsCryptoCurrency;
        this.images = tenantCurrency.images || [];
    }
}
