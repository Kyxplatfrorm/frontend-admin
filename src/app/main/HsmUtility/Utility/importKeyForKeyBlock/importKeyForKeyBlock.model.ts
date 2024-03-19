export class ImportKey {
    KeyUsage: string;
    ZmkUnderLmk: string;
    KeyUnderZmk: string;
    KeyUnderLmkWithKcv: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param importKey
     */
    constructor(importKey?) {
        importKey = importKey || {};
        this.KeyUsage = importKey.KeyUsage;
        this.HsmErrorCode = importKey.HsmErrorCode;
        this.HsmErrorDescription = importKey.HsmErrorDescription;
        this.ZmkUnderLmk = importKey.ZmkUnderLmk;
        this.KeyUnderZmk = importKey.KeyUnderZmk;
        this.KeyUnderLmkWithKcv = importKey.KeyUnderLmkWithKcv;
        this.images = importKey.images || [];
    }
}
