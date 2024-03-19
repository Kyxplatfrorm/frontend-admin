import { ResourceEntity } from "app/ui/errorDefinitions";

export class Resource {
    Id: number;
    ErrorId: number;
    LanguageCode: string;
    ErrorCode: string;
    NumericErrorCode: number;
    ErrorDescription: string;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ResourceList: Array<ResourceEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param resource
     */
    constructor(resource?) {
        resource = resource || {};
        this.Id = resource.Id;
        this.LanguageCode = resource.LanguageCode;
        this.ErrorCode = resource.ErrorCode || "";
        this.NumericErrorCode = resource.NumericErrorCode;
        this.ErrorDescription = resource.ErrorDescription;
        this.Description = resource.Description;
        this.InsertDateTime = resource.InsertDateTime;
        this.UpdateDateTime = resource.UpdateDateTime;
        this.ResourceList = resource.ResourceList;
        this.ErrorId = resource.ErrorId;
        this.images = resource.images || [];
    }
}
