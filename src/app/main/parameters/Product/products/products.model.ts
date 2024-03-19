import { ProductModuleEntity } from "app/ui/product";

export class Product {
    Id: number;
    Code: string;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ProductId: number;
    ProductName: string;
    ApplicationType: string;
    UserType: string;
    ProductCode: string;
    ParameterKey: string;
    ProductModuleList: Array<ProductModuleEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?) {
        product = product || {};
        this.Id = product.Id;
        this.Description = product.Description;
        this.InsertDateTime = product.InsertDateTime;
        this.UpdateDateTime = product.UpdateDateTime;
        this.Code = product.Code;
        this.ProductId = product.ProductId;
        this.ProductName = product.ProductName;
        this.ApplicationType = product.ApplicationType;
        this.UserType = product.UserType;
        this.ProductCode = product.ProductCode;
        this.ParameterKey = product.ParameterKey;
        this.ProductModuleList = product.ProductModuleList;
        this.images = product.images || [];
    }
}
