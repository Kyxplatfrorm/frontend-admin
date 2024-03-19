export class SwitchKeyProfileApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ProfileList?: ProfileListEntity[];
}
export class ProfileListEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    ProfileName?: string;
    UpdateDateTime?: any;
    InsertUserId?: number;
    UpdateUserId?: number;
    DetailList?: DetailListEntity[];
}
export class DetailListEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertUserId?: number;
    UpdateUserId?: number;
    ProfileId?: number;
    KeyIndex?: string;
    KeyVariant?: string;
    KeyType?: string;
    KeyValue?: string;
    KeyCheckValue?: string;
    TemporaryKeyValue?: string;
    TemporaryKeyCheckValue?: string;
    KeyLmkType?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
}

export class SwitchKeyTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: SwitchKeyTypeEntity[];
}

export class SwitchKeyTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class LmkTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: LmkKeyTypeEntity[];
}

export class LmkKeyTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
