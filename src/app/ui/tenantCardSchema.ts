export class TenantCardSchemaApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantCardSchemaProfileList?: TenantCardSchemaProfileEntity[];
}

export class TenantCardSchemaProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantName?: string;
    TenantId?: number;
    CardSchema?: string;
    CardSchemaId?: number;
    CardSchemaName?: string;
}

export class BinBrandsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: BinBrandsEntity[];
}
export class BinBrandsEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
