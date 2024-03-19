export class DecryptData {
    EncryptionKeyUnderLmk: string;
    EncryptedData: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    DecryptedData: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param decryptData
     */
    constructor(decryptData?) {
        decryptData = decryptData || {};
        this.EncryptionKeyUnderLmk = decryptData.EncryptionKeyUnderLmk;
        this.DecryptedData = decryptData.DecryptedData;
        this.EncryptedData = decryptData.EncryptedData;
        this.HsmErrorCode = decryptData.HsmErrorCode;
        this.HsmErrorDescription = decryptData.HsmErrorDescription;
        this.images = decryptData.images || [];
    }
}
