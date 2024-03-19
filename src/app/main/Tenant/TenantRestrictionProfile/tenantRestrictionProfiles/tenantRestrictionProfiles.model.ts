import { TenantRestrictionProfileDetailEntity } from "app/ui/tenantRestrictionProfile";

export class TenantRestriction {
    Id: number;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ProfileName: string;
    HasInternationalUsage: boolean;
    HasECommerceUsage: boolean;
    HasMotoUsage: boolean;
    HasAtmUsage: boolean;
    MerchantRestrictionCheckTypeId: number;
    MccRestrictionCheckTypeId: number;
    TransactionRestrictionCheckTypeId: number;
    CountryRestrictionCheckTypeId: number;
    MerchantNameRestrictionCheckTypeId: number;
    AcquirerRestrictionCheckTypeId: number;
    ProfileId: number;
    RestrictionCheckTypeId: number;
    RestrictionCheckType: string;
    TenantId: number;
    TenantName: string;
    RestrictionTypeId: number;
    RestrictionType: string;
    RestrictionCode: string;
    RestrictionCodeDescription: string;
    TenantRestrictionProfileDetail: Array<TenantRestrictionProfileDetailEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantRestriction
     */
    constructor(tenantRestriction?) {
        tenantRestriction = tenantRestriction || {};
        this.Id = tenantRestriction.Id;
        this.TenantId = tenantRestriction.TenantId;
        this.TenantName = tenantRestriction.TenantName;
        this.Description = tenantRestriction.Description;
        this.InsertDateTime = tenantRestriction.InsertDateTime;
        this.UpdateDateTime = tenantRestriction.UpdateDateTime;
        this.ProfileName = tenantRestriction.ProfileName;
        this.HasInternationalUsage = tenantRestriction.HasInternationalUsage;
        this.HasECommerceUsage = tenantRestriction.HasECommerceUsage;
        this.HasMotoUsage = tenantRestriction.HasMotoUsage;
        this.HasAtmUsage = tenantRestriction.HasAtmUsage;
        this.MerchantRestrictionCheckTypeId =
            tenantRestriction.MerchantRestrictionCheckTypeId;
        this.MccRestrictionCheckTypeId =
            tenantRestriction.MccRestrictionCheckTypeId;
        this.TransactionRestrictionCheckTypeId =
            tenantRestriction.TransactionRestrictionCheckTypeId;
        this.CountryRestrictionCheckTypeId =
            tenantRestriction.CountryRestrictionCheckTypeId;
        this.MerchantNameRestrictionCheckTypeId =
            tenantRestriction.MerchantNameRestrictionCheckTypeId;
        this.AcquirerRestrictionCheckTypeId =
            tenantRestriction.AcquirerRestrictionCheckTypeId;
        this.ProfileId = tenantRestriction.ProfileId;
        this.RestrictionCheckTypeId = tenantRestriction.RestrictionCheckTypeId;
        this.RestrictionCheckType = tenantRestriction.RestrictionCheckType;
        this.RestrictionTypeId = tenantRestriction.RestrictionTypeId;
        this.RestrictionType = tenantRestriction.RestrictionType;
        this.RestrictionCode = tenantRestriction.RestrictionCode;
        this.RestrictionCodeDescription =
            tenantRestriction.RestrictionCodeDescription;
        this.TenantRestrictionProfileDetail =
            tenantRestriction.TenantRestrictionProfileDetail;
        this.images = tenantRestriction.images || [];
    }
}
