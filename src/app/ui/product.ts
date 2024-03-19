export class ProductApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ProductList?: ProductEntity[];
}

export class ProductEntity {
    Code?: string;
    Description?: string;
    IsFound?: boolean;
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ProductModuleList?: ProductModuleEntity[];
}
export class ProductModuleEntity {
    Id?: number;
    ProductId?: number;
    ProductName?: string;
    InsertDateTime?: any;
    ApplicationType?: string;
    UserType?: string;
    Description?: string;
}

export class ProductModuleApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ProductModule?: ProductModuleListEntity[];
}
export class ProductModuleListEntity {
    Id?: number;
    ProductId?: number;
    ProductName?: string;
    InsertDateTime?: any;
    ApplicationType?: string;
    UserType?: string;
    Description?: string;
}
