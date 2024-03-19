export class WebHookPayLoadTemplateApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    WebHookPayloadTypeList?: WebHookPayloadTypeEntity[];
}

export class WebHookPayloadTypeEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    WebHookTypeId?: number;
    WebHookType?: string;
    WebHookTypeName?: string;
    WebHookPayload?: string;
}
export class WebHookTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: WebHookTypeEntity[];
}

export class WebHookTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
