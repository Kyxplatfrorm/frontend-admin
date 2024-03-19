export class Aes {
    EncryptionTypeId: number;
    Data: string;
    Key: string;
    EncryptionModeId: number;
    Iv: string;
    Result: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param aes
     */
    constructor(aes?) {
        aes = aes || {};
        this.EncryptionTypeId = aes.EncryptionTypeId;
        this.Data = aes.Data;
        this.Key = aes.Key;
        this.EncryptionModeId = aes.EncryptionModeId;
        this.Iv = aes.Iv;
        this.Result = aes.Result;
        this.images = aes.images || [];
    }
}
