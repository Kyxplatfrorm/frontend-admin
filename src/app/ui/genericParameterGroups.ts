export class GenericParameterEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    GroupCode?: string;
    ParameterKey?: string;
    ParameterValue?: string;
    ParameterValue1?: string;
    ParameterValue2?: string;
    ParameterValue3?: string;
    Description?: string;
}

export class GenericParameterGroupsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    GenericParameterGroupList?: GenericParameterGroupEntity[];
}

export class GenericParameterGroupEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    GroupCode?: string;
    Description?: string;
    GenericParameterList?: GenericParameterEntity[];
}
