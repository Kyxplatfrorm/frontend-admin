export class TranslateZpkLmkToZpkZmk {
    ZmkUnderLmk: string;
    AtallaVariant: string;
    ZpkUnderLmk: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    ZpkUnderZmk: string;
    ZpkKcv: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param translateZpkLmkToZpkZmk
     */
    constructor(translateZpkLmkToZpkZmk?) {
        translateZpkLmkToZpkZmk = translateZpkLmkToZpkZmk || {};
        this.ZmkUnderLmk = translateZpkLmkToZpkZmk.ZmkUnderLmk;
        this.HsmErrorCode = translateZpkLmkToZpkZmk.HsmErrorCode;
        this.HsmErrorDescription = translateZpkLmkToZpkZmk.HsmErrorDescription;
        this.AtallaVariant = translateZpkLmkToZpkZmk.AtallaVariant;
        this.ZpkUnderLmk = translateZpkLmkToZpkZmk.ZpkUnderLmk;
        this.ZpkUnderZmk = translateZpkLmkToZpkZmk.ZpkUnderZmk;
        this.ZpkKcv = translateZpkLmkToZpkZmk.ZpkKcv;
        this.images = translateZpkLmkToZpkZmk.images || [];
    }
}
