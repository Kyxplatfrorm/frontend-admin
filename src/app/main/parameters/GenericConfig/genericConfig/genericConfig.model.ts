export class GenericConfig {
    Id: number;
    ConfigKey: string;
    ConfigValue: string;
    ConfigGroupId: number;
    Description: string;
    GroupCode: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param genericConfig
     */
    constructor(genericConfig?) {
        genericConfig = genericConfig || {};
        this.Id = genericConfig.Id;
        this.ConfigGroupId = genericConfig.ConfigGroupId;
        this.ConfigKey = genericConfig.ConfigKey;
        this.ConfigValue = genericConfig.ConfigValue;
        this.Description = genericConfig.Description;
        this.GroupCode = genericConfig.GroupCode;
        this.images = genericConfig.images || [];
    }
}
