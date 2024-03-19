export class TenantCardSchema {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantName: string;
    TenantCode: string;
    DefaultCurrencyCode: string;
    CardSchema: string;
    CardSchemaId: number;
    CardSchemaName: string;
    TenantId: number;
    CardBrandId: number;
    ParameterKey: string;
    Description: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantCardSchema
     */
    constructor(tenantCardSchema?) {
        tenantCardSchema = tenantCardSchema || {};
        this.Id = tenantCardSchema.Id;
        this.CardSchema = tenantCardSchema.CardSchema;
        this.CardSchemaId = tenantCardSchema.CardSchemaId;
        this.CardSchemaName = tenantCardSchema.CardSchemaName;
        this.TenantId = tenantCardSchema.TenantId;
        this.CardBrandId = tenantCardSchema.CardBrandId;
        this.ParameterKey = tenantCardSchema.ParameterKey;
        this.Description = tenantCardSchema.Description;
        this.TenantCode = tenantCardSchema.TenantCode;
        this.DefaultCurrencyCode = tenantCardSchema.DefaultCurrencyCode;
        this.TenantName = tenantCardSchema.TenantName;
        this.InsertDateTime = tenantCardSchema.InsertDateTime;
        this.UpdateDateTime = tenantCardSchema.UpdateDateTime;
        this.images = tenantCardSchema.images || [];
    }
}
