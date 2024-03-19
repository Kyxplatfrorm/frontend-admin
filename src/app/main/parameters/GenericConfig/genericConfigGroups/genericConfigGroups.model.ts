import { GenericConfigEntity } from "app/ui/genericConfigGroups";

export class GenericConfigGroups {
    Id: number;
    GroupCode: string;
    ConfigGroupId: number;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    ConfigGroupName: string;
    ConfigKey: string;
    ConfigValue: string;
    GenericConfigList: Array<GenericConfigEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param genericConfigGroups
     */
    constructor(genericConfigGroups?) {
        genericConfigGroups = genericConfigGroups || {};
        this.Id = genericConfigGroups.Id;
        this.ConfigGroupId = genericConfigGroups.ConfigGroupId;
        this.GenericConfigList = genericConfigGroups.GenericConfigList;
        this.Description = genericConfigGroups.Description;
        this.ConfigGroupName = genericConfigGroups.ConfigGroupName;
        this.ConfigKey = genericConfigGroups.ConfigKey;
        this.ConfigValue = genericConfigGroups.ConfigValue;
        this.InsertDateTime = genericConfigGroups.InsertDateTime;
        this.UpdateDateTime = genericConfigGroups.UpdateDateTime;
        this.GroupCode = genericConfigGroups.GroupCode;
        this.images = genericConfigGroups.images || [];
    }
}
