export class ResourceEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    LanguageCode?: string;
    ResourceGroupCode?: string;
    ResourceCode?: string;
    Description?: string;
}

export class ErrorDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ErrorDefinitionList?: ErrorDefinitionEntity[];
}

export class ErrorDefinitionEntity {
    ErrorCode?: string;
    NumericErrorCode?: number;
    ErrorDescription?: string;
    IsFound?: boolean;
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ResourceList?: ResourceEntity[];
}

export class IdRequest {
    Id?: number;
}
