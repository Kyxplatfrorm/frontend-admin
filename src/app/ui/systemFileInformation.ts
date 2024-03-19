export class SystemFileInformationApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SystemFileInformationList?: SystemFileInformationEntity[];
}

export class SystemFileInformationEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    FileFormatCode?: string;
    TenantName?: string;
    TenantId?: number;
    FileFormatType?: string;
    FileFormatTypeId?: number;
    FileFormatTypeName?: string;
    FileDirectionType?: string;
    FileDirectionTypeId?: number;
    FileDirectionTypeName?: string;
    IsTenantFile?: boolean;
    InsertDate?: number;
    FileName?: string;
    FileSource?: string;
    FileSourceName?: string;
    FileStatus?: string;
    FileStatusName?: string;
    FileSourceId?: number;
    FileStatusId?: number;
    FileSize?: number;
    DailyFileIndex?: number;
    RecordCount?: number;
    RejectCount?: number;
}

export class FileFormatTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FileFormatTypeEntity[];
}

export class FileFormatTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class FileDirectionTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FileDirectionTypeEntity[];
}

export class FileDirectionTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class FileStatusTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FileStatusTypeEntity[];
}

export class FileStatusTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class FileSourceTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: FileSourceTypeEntity[];
}

export class FileSourceTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class TenantApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantDefinitionList?: TenantDefinitionEntity[];
}

export class TenantDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantName?: string;
}
