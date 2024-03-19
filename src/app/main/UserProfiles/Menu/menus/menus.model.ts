import { SubMenuEntity } from "app/ui/menuDefinition";

export class Menu {
    Id: number;
    MenuOrder: number;
    ProductModuleId: number;
    MenuName: string;
    ParentMenuName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    MenuCode: string;
    TranslateKey: string;
    HasParentMenu: boolean;
    ParentMenuId: number;
    ControllerName: string;
    RelatedControllerName: string;
    MenuIcon: string;
    MenuUrl: string;
    Description: string;
    SubMenuList: Array<SubMenuEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param menu
     */
    constructor(menu?) {
        menu = menu || {};
        this.Id = menu.Id;
        this.MenuOrder = menu.MenuOrder;
        this.ControllerName = menu.ControllerName;
        this.RelatedControllerName = menu.RelatedControllerName;
        this.MenuName = menu.MenuName;
        this.ParentMenuName = menu.ParentMenuName;
        this.InsertDateTime = menu.InsertDateTime;
        this.UpdateDateTime = menu.UpdateDateTime;
        this.MenuCode = menu.MenuCode;
        this.TranslateKey = menu.TranslateKey;
        this.HasParentMenu = menu.HasParentMenu;
        this.ParentMenuId = menu.Id;
        this.MenuIcon = menu.MenuIcon;
        this.MenuUrl = menu.MenuUrl;
        this.Description = menu.Description;
        this.SubMenuList = menu.SubMenuList;
        this.ProductModuleId = menu.ProductModuleId;
        this.images = menu.images || [];
    }
}
