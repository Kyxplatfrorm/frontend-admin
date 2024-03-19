export class ApiUserDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    UserList?: BackofficeUserEntity[];
}

export class BackofficeUserEntity {
    Id?: number;
    TenantName?: string;
    UserFullName?: string;
    UserName?: string;
    UserStatus?: string;
    WrongAttemptCount?: number;
    UserProfile?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    Email?: string;
}

export class ApiPermissionProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ApiPermissionProfilesEntity[];
}
export class ApiPermissionProfilesEntity {
    Id?: number;
    Description?: string;
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
