export class ApplicationProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ApplicationProfileList?: ApplicationProfileListEntity[];
}

export class ApplicationProfileListEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ProfileName?: string;
}
