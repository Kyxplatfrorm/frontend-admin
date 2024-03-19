import { MenuListEntity, MenuTreeEntity } from "app/ui/roleDefinition";

export class Role {
    Id: number;
    RoleName: string;
    ProductModuleId: number;
    TenatId: number;
    ProductId: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    MenuName: string;
    HasParentMenu: boolean;
    ParentMenuId: number;
    IsNode: boolean;
    IsSelected: boolean;
    MenuTree: Array<MenuTreeEntity>;
    MenuList: Array<MenuListEntity>;
    SelectedMenuList: number[];
    SubMenuList: Array<MenuTreeEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param role
     */
    constructor(role?) {
        role = role || {};
        this.Id = role.Id;
        this.RoleName = role.RoleName;
        this.TenatId = role.TenatId;
        this.MenuName = role.MenuName;
        this.HasParentMenu = role.HasParentMenu;
        this.ParentMenuId = role.ParentMenuId;
        this.IsNode = role.IsNode;
        this.IsSelected = role.IsSelected;
        this.MenuTree = role.MenuTree;
        this.SelectedMenuList = role.SelectedMenuList;
        this.SubMenuList = role.SubMenuList;
        this.MenuList = role.MenuList;
        this.ProductModuleId = role.ProductModuleId;
        this.ProductId = role.ProductId;
        this.images = role.images || [];
    }
}
