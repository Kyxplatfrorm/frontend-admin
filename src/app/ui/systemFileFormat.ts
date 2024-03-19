export class SystemFileFormatApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SystemFileFormatList?: SystemFileFormatEntity[];
}

export class SystemFileFormatEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    FileFormatCode?: string;
    Description?: string;
    FileNameFormat?: string;
    FileFormatType?: string;
    FileFormatTypeId?: number;
    FileFormatTypeName?: string;
    FileDirectionType?: string;
    FileDirectionTypeId?: number;
    FileDirectionTypeName?: string;
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
