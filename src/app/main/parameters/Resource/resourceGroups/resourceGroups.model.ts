import { ResourceGroupEntity } from "app/ui/resourceGroups";

export class ResourceGroup {
    Id: number;
    GroupCode: string;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ResourceList: Array<ResourceGroupEntity>;
    ConfigGroupId: number;
    ResourceCode: string;
    LanguageCode: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param resourceGroup
     */
    constructor(resourceGroup?) {
        resourceGroup = resourceGroup || {};
        this.Id = resourceGroup.Id;
        this.GroupCode = resourceGroup.GroupCode;
        this.ResourceCode = resourceGroup.ResourceCode;
        this.LanguageCode = resourceGroup.LanguageCode;
        this.ResourceList = resourceGroup.ResourceList;
        this.Description = resourceGroup.Description;
        this.InsertDateTime = resourceGroup.InsertDateTime;
        this.UpdateDateTime = resourceGroup.UpdateDateTime;
        this.images = resourceGroup.images || [];
    }
}
