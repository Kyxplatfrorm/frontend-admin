export class UserApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    UserList?: UserEntity[];
}

export class UserEntity {
    Id?: number;
    TenantName?: string;
    UserType?: string;
    UserName?: string;
    UserStatus?: string;
    HasApiKey?: boolean;
    WrongAttemptCount?: number;
    UserProfile?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    Email?: string;
    PhoneNumber?: string;
    UserDefinition?: UserDefinition[];
}
export class UserDefinition {
    Id?: number;
    UserTypeId?: number;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    WrongAttemptCount?: number;
    UserStatusId?: number;
    CustomerTypeId?: number;
    UserName?: string;
    UserFullName?: string;
    UserProfileId?: number;
    MustChangePwd?: boolean;
    HasApiKey?: boolean;
    PasswordResetDateTime?: any;
    TenantId?: number;
    CustomerId?: number;
    UtcTimeOffset?: number;
    CheckIp?: boolean;
    Email?: string;
    InternationalPhoneCode?: string;
    PhoneNumber?: string;
    SelectedRoleList?: number[];
}
export class ApiKeyEntity {
    Id?: number;
    ApiUserId?: number;
    IsActive?: boolean;
    ApiKey?: string;
    HasExpiryDate?: boolean;
    StartDateTime?: any;
    EndDateTime?: any;
}

export class LoginMethodTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LoginMethodTypeEntity[];
}
export class LoginMethodTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class TwoFormFactorAuthTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TwoFormFactorAuthTypeEntity[];
}
export class TwoFormFactorAuthTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class CustomerTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CustomerTypeEntity[];
}
export class CustomerTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class UserStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: UserStatusEntity[];
}
export class UserStatusEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class UserTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: UserTypeEntity[];
}
export class UserTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CreateUserRequest {
    UserTypeId?: number;
    UserStatusId?: number;
    CustomerTypeId?: number;
    UserName?: string;
    UserFullName?: string;
    UserProfileId?: number;
    MustChangePwd?: boolean;
    HasApiKey?: boolean;
    PasswordResetDateTime?: any;
    TenantId?: number;
    CustomerId?: number;
    UtcTimeOffset?: number;
    CheckIp?: boolean;
    Email?: string;
    InternationalPhoneCode?: string;
    PhoneNumber?: string;
    SelectedRoleList?: number[];
}
export class UpdateUserRequest {
    Id?: number;
    UserTypeId?: number;
    UserStatusId?: number;
    CustomerTypeId?: number;
    UserName?: string;
    UserFullName?: string;
    UserProfileId?: number;
    MustChangePwd?: boolean;
    HasApiKey?: boolean;
    PasswordResetDateTime?: any;
    TenantId?: number;
    CustomerId?: number;
    UtcTimeOffset?: number;
    CheckIp?: boolean;
    Email?: string;
    InternationalPhoneCode?: string;
    PhoneNumber?: string;
    WrongAttemptCount?: number;
    SelectedRoleList?: number[];
}

export class RolesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    RoleList?: RoleListEntity[];
}

export class RoleListEntity {
    Id?: number;
    TenantName?: string;
    TenantId?: number;
    ProductId?: number;
    ProductModuleId?: number;
    RoleName?: string;
    IsBuiltInDefinition?: boolean;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    SelectedMenuList?: number[];
}
