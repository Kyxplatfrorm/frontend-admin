export class QueryApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    QueryList?: QueryEntity[];
}

export class QueryEntity {
    Id?: number;
    QueryType?: string;
    QueryCode?: string;
    InsertDateTime?: any;
    Description?: string;
    UpdateDateTime?: any;
}

export class QueryTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: QueryTypeEntity[];
}

export class QueryTypeEntity {
    Id?: number;
    Description?: string;
}
