import { TenantDefinitionEntity } from "app/ui/tenant";

export class JsonConfig {
    Id: number;
    TenantId: number;
    TenantName: string;
    ConfigCode: string;
    Description: string;
    ConfigValue: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantDefinitionList: Array<TenantDefinitionEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param jsonConfig
     */
    constructor(jsonConfig?) {
        jsonConfig = jsonConfig || {};
        this.Id = jsonConfig.Id;
        this.TenantId = jsonConfig.TenantId;
        this.TenantName = jsonConfig.TenantName;
        this.ConfigCode = jsonConfig.ConfigCode;
        this.Description = jsonConfig.Description;
        this.ConfigValue = jsonConfig.ConfigValue;
        this.TenantId = jsonConfig.TenantId;
        this.TenantDefinitionList = jsonConfig.TenantDefinitionList;
        this.InsertDateTime = jsonConfig.InsertDateTime;
        this.UpdateDateTime = jsonConfig.UpdateDateTime;
        this.images = jsonConfig.images || [];
    }
}
