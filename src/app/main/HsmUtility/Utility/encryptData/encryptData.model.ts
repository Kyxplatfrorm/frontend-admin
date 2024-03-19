export class EncryptData {
    EncryptionKeyUnderLmk: string;
    Data: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    EncryptedData: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param encryptData
     */
    constructor(encryptData?) {
        encryptData = encryptData || {};
        this.EncryptionKeyUnderLmk = encryptData.EncryptionKeyUnderLmk;
        this.Data = encryptData.Data;
        this.EncryptedData = encryptData.EncryptedData;
        this.HsmErrorCode = encryptData.HsmErrorCode;
        this.HsmErrorDescription = encryptData.HsmErrorDescription;
        this.images = encryptData.images || [];
    }
}
