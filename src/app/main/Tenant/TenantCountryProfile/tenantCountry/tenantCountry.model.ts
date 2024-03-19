export class TenantCountry {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantName: string;
    TenantCode: string;
    DefaultCurrencyCode: string;
    TenantId: number;
    ParameterKey: string;
    Description: string;
    CountryId: number;
    CountryName: string;
    IsRegistrationEnabled: boolean;
    IsAddressEnabled: boolean;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantCountry
     */
    constructor(tenantCountry?) {
        tenantCountry = tenantCountry || {};
        this.Id = tenantCountry.Id;
        this.TenantId = tenantCountry.TenantId;
        this.CountryId = tenantCountry.CountryId;
        this.CountryName = tenantCountry.CountryName;
        this.IsRegistrationEnabled = tenantCountry.IsRegistrationEnabled;
        this.IsAddressEnabled = tenantCountry.IsAddressEnabled;
        this.ParameterKey = tenantCountry.ParameterKey;
        this.Description = tenantCountry.Description;
        this.TenantCode = tenantCountry.TenantCode;
        this.DefaultCurrencyCode = tenantCountry.DefaultCurrencyCode;
        this.TenantName = tenantCountry.TenantName;
        this.InsertDateTime = tenantCountry.InsertDateTime;
        this.UpdateDateTime = tenantCountry.UpdateDateTime;
        this.images = tenantCountry.images || [];
    }
}
