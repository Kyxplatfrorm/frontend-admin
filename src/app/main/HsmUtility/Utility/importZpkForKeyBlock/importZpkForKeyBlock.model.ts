export class ImportKey {
    ZpkUnderZmk: string;
    ZmkUnderLmk: string;
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
        this.ZpkUnderZmk = importKey.ZpkUnderZmk;
        this.HsmErrorCode = importKey.HsmErrorCode;
        this.HsmErrorDescription = importKey.HsmErrorDescription;
        this.ZmkUnderLmk = importKey.ZmkUnderLmk;
        this.KeyUnderLmkWithKcv = importKey.KeyUnderLmkWithKcv;
        this.images = importKey.images || [];
    }
}
