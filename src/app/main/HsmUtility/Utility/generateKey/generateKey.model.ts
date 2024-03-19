export class GenerateKey {
    KeyTypeId: number;
    KeySchema: string;
    ExportKey: boolean;
    ZmkTmkTypeId: number;
    EncryptedMasterKey: string;
    KeyExportSchema: string;
    AtallaVariant: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    KeyUnderLmk: string;
    KeyUnderZmk: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param generateKey
     */
    constructor(generateKey?) {
        generateKey = generateKey || {};
        this.KeyTypeId = generateKey.KeyTypeId;
        this.KeySchema = generateKey.KeySchema;
        this.ExportKey = generateKey.ExportKey;
        this.HsmErrorCode = generateKey.HsmErrorCode;
        this.ZmkTmkTypeId = generateKey.ZmkTmkTypeId;
        this.HsmErrorDescription = generateKey.HsmErrorDescription;
        this.EncryptedMasterKey = generateKey.EncryptedMasterKey;
        this.KeyExportSchema = generateKey.KeyExportSchema;
        this.AtallaVariant = generateKey.AtallaVariant;
        this.KeyUnderLmk = generateKey.KeyUnderLmk;
        this.KeyUnderZmk = generateKey.KeyUnderZmk;
        this.images = generateKey.images || [];
    }
}
