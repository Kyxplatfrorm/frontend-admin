export class SessionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SessionList?: SessionEntity[];
}
export class SessionEntity {
    Id?: number;
    SessionStatus?: string;
    UserId?: number;
    UserType?: string;
    UserName?: string;
    ChannelName?: string;
    Server?: string;
    ClientIp?: string;
    StartDateTime?: any;
    EndDatetime?: any;
}

export class SessionStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SessionStatusEntity[];
}
export class SessionStatusEntity {
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
    ParameterKey?: string;
    Description?: string;
}
