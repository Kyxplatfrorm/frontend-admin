export class ResourceGroupsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ResourceGroupList?: ResourceGroupsEntity[];
}

export class ResourceGroupsEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    GroupCode?: string;
    Description?: string;
    ResourceList?: ResourceGroupEntity[];
}
export class ResourceGroupEntity {
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
