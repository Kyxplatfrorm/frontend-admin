export class TripleDes {
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
     * @param tripleDes
     */
    constructor(tripleDes?) {
        tripleDes = tripleDes || {};
        this.EncryptionTypeId = tripleDes.EncryptionTypeId;
        this.Data = tripleDes.Data;
        this.Key = tripleDes.Key;
        this.EncryptionModeId = tripleDes.EncryptionModeId;
        this.Iv = tripleDes.Iv;
        this.Result = tripleDes.Result;
        this.images = tripleDes.images || [];
    }
}
