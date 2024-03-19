export class SystemKey {
    Id: number;
    ParameterKey: string;
    Description: string;
    CompanyId: number;
    TenantId: number;
    TenantName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    KeyCode: string;
    KeyType: string;
    KeyTypeId: number;
    KeyTypeName: string;
    KeyValue: string;
    EncryptedKeySecretPassword: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param systemKey
     */
    constructor(systemKey?) {
        systemKey = systemKey || {};
        this.Id = systemKey.Id;
        this.TenantId = systemKey.TenantId;
        this.TenantName = systemKey.TenantName;
        this.ParameterKey = systemKey.ParameterKey;
        this.Description = systemKey.Description;
        this.CompanyId = systemKey.CompanyId;
        this.InsertDateTime = systemKey.InsertDateTime;
        this.UpdateDateTime = systemKey.UpdateDateTime;
        this.SearchStartDate = systemKey.SearchStartDate;
        this.SearchEndDate = systemKey.SearchEndDate;
        this.KeyCode = systemKey.KeyCode;
        this.KeyType = systemKey.KeyType;
        this.KeyTypeId = systemKey.KeyTypeId;
        this.KeyTypeName = systemKey.KeyTypeName;
        this.KeyValue = systemKey.KeyValue;
        this.EncryptedKeySecretPassword = systemKey.EncryptedKeySecretPassword;
        this.images = systemKey.images || [];
    }
}
