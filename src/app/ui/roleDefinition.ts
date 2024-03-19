export class RoleApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    RoleList?: RoleEntity[];
}
export class RoleEntity {
    Id?: number;
    RoleName?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    IsChecked: boolean;
    MenuTree?: MenuTreeEntity[];
}
export class MenuTreeEntity {
    Id?: number;
    MenuName?: string;
    MenuCode?: string;
    HasParentMenu?: boolean;
    ParentMenuId?: number;
    IsNode?: boolean;
    IsSelected?: boolean;
    SubMenuList?: MenuTreeEntity[];
}

export class MenuTreeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MenuTree?: MenuTreeApiEntity[];
    MenuList?: MenuListEntity[];
}
export class MenuTreeApiEntity {
    Id?: number;
    MenuName?: string;
    MenuCode?: string;
    HasParentMenu?: boolean;
    ParentMenuId?: number;
    IsNode?: boolean;
    IsSelected?: boolean;
    SubMenuList?: MenuTreeEntity[];
}

export class MenuListEntity {
    Id?: number;
    MenuName?: string;
    MenuCode?: string;
    HasParentMenu?: boolean;
    ParentMenuId?: number;
    IsChildMenu?: boolean;
    MenuOrder?: number;
    TranslateKey?: string;
    MenuIcon?: string;
    MenuUrl?: string;
    IsSelected?: boolean;
    IsRecordValid?: boolean;
    InsertDateTime?: any;
    RecordVersion?: number;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: number;
}

export class CreateRoleRequest {
    RoleName?: string;
    TenantId?: number;
    ProductModuleId?: number;
    SelectedMenuList?: number[];
}
export class UpdateRoleRequest {
    Id?: number;
    RoleName?: string;
    SelectedMenuList?: number[];
}

export class TenantApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    TenantDefinitionList?: TenantDefinitionEntity[];
}

export class TenantDefinitionEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    TenantName?: string;
}
