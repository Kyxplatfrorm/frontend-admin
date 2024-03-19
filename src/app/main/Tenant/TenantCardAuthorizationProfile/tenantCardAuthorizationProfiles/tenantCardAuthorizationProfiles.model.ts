export class TenantCardAuthorization {
    Id: number;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    HasExternalAuthorization: boolean;
    SendDailySettlementFile: boolean;
    ExportDailySettlementFileToLocalFolder: boolean;
    AuthorizationUrl: string;
    EncryptedApiKey: string;
    EncryptedSecretKey: string;
    SftpServer: string;
    SftpUserName: string;
    SftpEncryptedPassword: string;
    SftpPath: string;
    SettlementFilePath: string;
    SftpPort: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantCardAuthorization
     */
    constructor(tenantCardAuthorization?) {
        tenantCardAuthorization = tenantCardAuthorization || {};
        this.Id = tenantCardAuthorization.Id;
        this.TenantId = tenantCardAuthorization.TenantId;
        this.InsertDateTime = tenantCardAuthorization.InsertDateTime;
        this.UpdateDateTime = tenantCardAuthorization.UpdateDateTime;
        this.HasExternalAuthorization =
            tenantCardAuthorization.HasExternalAuthorization;
        this.SendDailySettlementFile =
            tenantCardAuthorization.SendDailySettlementFile;
        this.ExportDailySettlementFileToLocalFolder =
            tenantCardAuthorization.ExportDailySettlementFileToLocalFolder;
        this.AuthorizationUrl = tenantCardAuthorization.AuthorizationUrl;
        this.EncryptedApiKey = tenantCardAuthorization.EncryptedApiKey;
        this.EncryptedSecretKey = tenantCardAuthorization.EncryptedSecretKey;
        this.SftpServer = tenantCardAuthorization.SftpServer;
        this.SftpUserName = tenantCardAuthorization.SftpUserName;
        this.SftpEncryptedPassword =
            tenantCardAuthorization.SftpEncryptedPassword;
        this.SftpPath = tenantCardAuthorization.SftpPath;
        this.SettlementFilePath = tenantCardAuthorization.SettlementFilePath;
        this.SftpPort = tenantCardAuthorization.SftpPort;
        this.Description = tenantCardAuthorization.Description;
        this.images = tenantCardAuthorization.images || [];
    }
}
