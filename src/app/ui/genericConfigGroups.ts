export class GenericConfigEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ConfigGroupName?: string;
    ConfigKey?: string;
    ConfigValue?: string;
}

export class GenericConfigGroupApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    GenericConfigGroupList?: GenericConfigGroupEntity[];
}

export class GenericConfigGroupEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    GroupCode?: string;
    Description?: string;
    GenericConfigList?: GenericConfigEntity[];
}
