import { SystemRestrictionProfileDetailEntity } from "app/ui/systemRestrictionProfile";

export class SystemRestriction {
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
    SystemRestrictionProfileDetailList: Array<SystemRestrictionProfileDetailEntity>;

    MinimumTransactionAmount: number;
    MaximumTransactionAmount: number;
    TenantRestrictionCheckTypeId: number;
    MerchantRestrictionCheckType: string;
    MccRestrictionCheckType: string;
    TransactionRestrictionCheckType: string;
    CountryRestrictionCheckType: string;
    MerchantNameRestrictionCheckType: string;
    AcquirerRestrictionCheckType: string;
    TenantRestrictionCheckType: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param systemRestriction
     */
    constructor(systemRestriction?) {
        systemRestriction = systemRestriction || {};
        this.Id = systemRestriction.Id;
        this.TenantId = systemRestriction.TenantId;
        this.TenantName = systemRestriction.TenantName;
        this.Description = systemRestriction.Description;
        this.InsertDateTime = systemRestriction.InsertDateTime;
        this.UpdateDateTime = systemRestriction.UpdateDateTime;
        this.ProfileName = systemRestriction.ProfileName;
        this.HasInternationalUsage = systemRestriction.HasInternationalUsage;
        this.HasECommerceUsage = systemRestriction.HasECommerceUsage;
        this.HasMotoUsage = systemRestriction.HasMotoUsage;
        this.HasAtmUsage = systemRestriction.HasAtmUsage;
        this.MerchantRestrictionCheckTypeId =
            systemRestriction.MerchantRestrictionCheckTypeId;
        this.MccRestrictionCheckTypeId =
            systemRestriction.MccRestrictionCheckTypeId;
        this.TransactionRestrictionCheckTypeId =
            systemRestriction.TransactionRestrictionCheckTypeId;
        this.CountryRestrictionCheckTypeId =
            systemRestriction.CountryRestrictionCheckTypeId;
        this.MerchantNameRestrictionCheckTypeId =
            systemRestriction.MerchantNameRestrictionCheckTypeId;
        this.AcquirerRestrictionCheckTypeId =
            systemRestriction.AcquirerRestrictionCheckTypeId;
        this.ProfileId = systemRestriction.ProfileId;
        this.RestrictionCheckTypeId = systemRestriction.RestrictionCheckTypeId;
        this.RestrictionCheckType = systemRestriction.RestrictionCheckType;
        this.RestrictionTypeId = systemRestriction.RestrictionTypeId;
        this.RestrictionType = systemRestriction.RestrictionType;
        this.RestrictionCode = systemRestriction.RestrictionCode;
        this.RestrictionCodeDescription =
            systemRestriction.RestrictionCodeDescription;
        this.SystemRestrictionProfileDetailList =
            systemRestriction.SystemRestrictionProfileDetailList;
        this.MinimumTransactionAmount =
            systemRestriction.MinimumTransactionAmount;
        this.MaximumTransactionAmount =
            systemRestriction.MaximumTransactionAmount;
        this.TenantRestrictionCheckTypeId =
            systemRestriction.TenantRestrictionCheckTypeId;
        this.MerchantRestrictionCheckType =
            systemRestriction.MerchantRestrictionCheckType;
        this.MccRestrictionCheckType =
            systemRestriction.MccRestrictionCheckType;
        this.TransactionRestrictionCheckType =
            systemRestriction.TransactionRestrictionCheckType;
        this.CountryRestrictionCheckType =
            systemRestriction.CountryRestrictionCheckType;
        this.MerchantNameRestrictionCheckType =
            systemRestriction.MerchantNameRestrictionCheckType;
        this.AcquirerRestrictionCheckType =
            systemRestriction.AcquirerRestrictionCheckType;
        this.TenantRestrictionCheckType =
            systemRestriction.TenantRestrictionCheckType;
        this.images = systemRestriction.images || [];
    }
}
