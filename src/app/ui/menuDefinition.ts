export class SubMenuEntity {
    Id?: number;
    MenuUrl?: string;
    ParentMenuId?: number;
    InsertDateTime?: any;
    MenuOrder?: number;
    MenuCode?: string;
    MenuName?: string;
    TranslateKey?: string;
    MenuIcon?: string;
    ProductId?: number;
    ProductModuleId?: number;
}

export class MenuDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MenuList?: MenuDefinitionEntity[];
}

export class MenuDefinitionEntity {
    Id?: number;
    MenuOrder?: number;
    MenuName?: string;
    ParentMenuName?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    ProductId?: number;
    ProductModuleId?: number;
    SubMenuList?: SubMenuEntity[];
}
export class ParentMenuApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: ParentMenuEntity[];
}
export class ParentMenuEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
