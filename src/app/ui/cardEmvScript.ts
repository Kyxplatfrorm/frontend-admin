export class CardEmvScriptApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CardEmvScriptQueueList?: CardEmvScriptQueueEntity[];
}
export class CardEmvScriptQueueEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantId?: number;
    CardId?: number;
    InsertDate?: number;
    PanSequenceNumber?: number;
    EmvScriptTypeId?: number;
    EmvScriptStatusId?: number;
    SentCount?: number;
    SentTransactionId?: number;
    TenantName?: string;
    EmvScriptType?: string;
    EmvScriptTypeName?: string;
    EmvScriptStatus?: string;
    EmvScriptStatusName?: string;
    EmvScript?: string;
    SentDateTime?: any;
}

export class EmvScriptStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: EmvScriptStatusEntity[];
}

export class EmvScriptStatusEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class EmvScriptTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: EmvScriptTypeEntity[];
}

export class EmvScriptTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
