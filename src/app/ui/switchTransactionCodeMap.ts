export class SwitchCardNetworkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SwitchCardNetworkList?: SwitchCardNetworkEntity[];
}

export class SwitchCardNetworkEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    NetworkType?: string;
    Description?: string;
}

export class SwitchTransactionCodeMapApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SwitchTransactionCodeMapList?: SwitchTransactionCodeMapEntity[];
}
export class SwitchTransactionCodeMapEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    NetworkType?: string;
    NetworkTypeId?: number;
    NetworkTypeName?: string;
    Description?: string;
    IsActive?: boolean;
    Mti?: number;
    ProcessingCode?: string;
    TransactionEntryType?: string;
    TransactionEntryTypeId?: number;
    TransactionEntryTypeName?: string;
    TransactionCode?: string;
    TransactionCodeName?: string;
    TransactionCodeId?: number;
    TransactionAmount?: number;
    Priority?: number;
}

export class SwitchTransactionEntryTypesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchTransactionEntryTypeEntity[];
}
export class SwitchTransactionEntryTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class TransactionCodesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: TransactionCodesEntity[];
}
export class TransactionCodesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
