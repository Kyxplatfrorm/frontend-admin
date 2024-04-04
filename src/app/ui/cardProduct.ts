export class CardProductApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CardProductList?: CardProductEntity[];
}
export class CardProductEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: number;
    TenantId?: number;
    ProductType?: string;
    ProductTypeId?: number;
    ProductPhysicalType?: string;
    ProductPhysicalTypeId?: number;
    ProductBrand?: string;
    ProductBrandId?: number;
    ProductName?: string;
    ProductGroup?: string;
    IsBusinessProduct?: boolean;
    IsNoNameProduct?: boolean;
    NoNameEmbossName?: string;
    IsCreateBlockedCard?: boolean;
    AutoRenewCard?: boolean;
    AutoRenewalPeriodMonth?: number;
    PlasticTypeId?: number;
    BinRangeProfileId?: number;
    RestrictionProfileId?: number;
    LimitProfileId?: number;
    CardFeeProfileId?: number;
    TransactionFeeProfileId?: number;
    IsCompanyProduct?: boolean;
    CompanyId?: number;
    ContactlessLimit?: number;
}

export class ProductBrandApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ProductBrandEntity[];
}
export class ProductBrandEntity {
    Id?: number;
    Description?: string;
}

export class ProductTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ProductTypeEntity[];
}
export class ProductTypeEntity {
    Id?: number;
    Description?: string;
}

export class ProductPhysicalTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ProductPhysicalTypeEntity[];
}
export class ProductPhysicalTypeEntity {
    Id?: number;
    Description?: string;
}

export class CardPlasticTypesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CardPlasticTypesEntity[];
}
export class CardPlasticTypesEntity {
    Id?: number;
    Description?: string;
}

export class BinRangeProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: BinRangeProfilesEntity[];
}
export class BinRangeProfilesEntity {
    Id?: number;
    Description?: string;
}

export class RestrictionProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: RestrictionProfilesEntity[];
}
export class RestrictionProfilesEntity {
    Id?: number;
    Description?: string;
}
export class LimitProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LimitProfilesEntity[];
}
export class LimitProfilesEntity {
    Id?: number;
    Description?: string;
}
export class CardFeeProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CardFeeProfilesEntity[];
}
export class CardFeeProfilesEntity {
    Id?: number;
    Description?: string;
}
export class TransactionFeeProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TransactionFeeProfilesEntity[];
}
export class TransactionFeeProfilesEntity {
    Id?: number;
    Description?: string;
}
