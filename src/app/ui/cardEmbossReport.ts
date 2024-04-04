export class CardEmbossReportApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CardEmbossReportList?: CardEmbossReportEntity[];
}

export class CardEmbossReportEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantName?: string;
    TenantId?: number;
    InsertDate?: number;
    CardId?: number;
    CustomerId?: number;
    CardOrderId?: number;
    BranchId?: number;
    PanSequenceNumber?: number;
    ExportCount?: number;
    FileId?: number;
    ProductId?: number;
    CountryId?: number;
    CityId?: number;
    CountyId?: number;
    IsNoNameCard?: boolean;
    IsExported?: boolean;
    CardTokenNumber?: string;
    FileName?: string;
    EmbossStatus?: string;
    CardIssuingReasonType?: string;
    EmbossName1?: string;
    EmbossName2?: string;
    ErrorCode?: string;
    ErrorDescription?: string;
    StateCode?: string;
    Address?: string;
    ZipCode?: string;
    ContractType?: string;
    ExportDateTime?: any;
    ExpiryDate?: any;
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
