import { TenantDefinitionEntity } from "app/ui/tenant";

export class Plugin {
    Id: number;
    TenantId: number;
    TenantName: string;
    PluginCode: string;
    PluginGroupCode: string;
    PluginGroupName: string;
    IsDefault: boolean;
    PluginDescription: string;
    PluginPath: string;
    PluginAssemblyName: string;
    PluginFullClassName: string;
    PluginConfig: string;
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
     * @param plugin
     */
    constructor(plugin?) {
        plugin = plugin || {};
        this.Id = plugin.Id;
        this.TenantId = plugin.TenantId;
        this.TenantName = plugin.TenantName;
        this.PluginCode = plugin.PluginCode;
        this.PluginGroupCode = plugin.PluginGroupCode;
        this.PluginGroupName = plugin.PluginGroupName;
        this.IsDefault = plugin.IsDefault;
        this.PluginDescription = plugin.PluginDescription;
        this.PluginPath = plugin.PluginPath;
        this.TenantDefinitionList = plugin.TenantDefinitionList;
        this.PluginAssemblyName = plugin.PluginAssemblyName;
        this.PluginFullClassName = plugin.PluginFullClassName;
        this.PluginConfig = plugin.PluginConfig;
        this.InsertDateTime = plugin.InsertDateTime;
        this.UpdateDateTime = plugin.UpdateDateTime;
        this.images = plugin.images || [];
    }
}
