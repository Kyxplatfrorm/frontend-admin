export class ApiPermissionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApiPermissionProfileList?: ApiPermissionProfileListEntity[];
}

export class ApiPermissionProfileListEntity {
    Id?: number;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    Code?: string;
    Description?: string;
    IsBuiltInDefinition?: boolean;
    ApplicationType?: string;
    ApplicationTypeId?: number;
    ApplicationTypeName?: string;
    ProfileName?: string;
    PermissionCheckType?: string;
    PermissionCheckTypeId?: number;
    PermissionCheckTypeName?: string;
    ApiPermissionProfileDetailList?: ApiPermissionProfileDetailListEntity[];
}

export class ApiPermissionProfileDetailListEntity {
    Id?: number;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    ProfileName?: string;
    ApplicationType?: string;
    ApplicationTypeId?: number;
    UserType?: string;
    UserTypeId?: number;
    ApiDefinitionName?: string;
    HasApiLimitProfile?: boolean;
    ApiLimitProfileName?: string;
    IsActive?: boolean;
}

export class ApiDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApiDefinitionEntity[];
}

export class ApiDefinitionEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class ApiLimitProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApiLimitProfileEntity[];
}

export class ApiLimitProfileEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CompanyRestrictionProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CompanyRestrictionProfileEntity[];
}

export class CompanyRestrictionProfileEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
