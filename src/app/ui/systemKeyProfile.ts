export class SystemKeyApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    SystemKeyDefinitionList?: SystemKeyDefinitionEntity[];
}

export class SystemKeyDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    KeyCode?: string;
    Description?: string;
    KeyType?: string;
    KeyTypeId?: number;
    KeyTypeName?: string;
    KeyValue?: string;
    EncryptedKeySecretPassword?: string;
}

export class KeyTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: KeyTypeEntity[];
}

export class KeyTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
