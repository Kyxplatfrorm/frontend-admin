export class TranslateZpkZmkToZpkLmk {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    ZmkUnderLmk: string;
    ZpkUnderZmk: string;
    AtallaVariant: string;
    ZpkUnderLmk: string;
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
     * @param translateZpkZmkToZpkLmk
     */
    constructor(translateZpkZmkToZpkLmk?) {
        translateZpkZmkToZpkLmk = translateZpkZmkToZpkLmk || {};
        this.ZmkUnderLmk = translateZpkZmkToZpkLmk.ZmkUnderLmk;
        this.HsmErrorCode = translateZpkZmkToZpkLmk.HsmErrorCode;
        this.HsmErrorDescription = translateZpkZmkToZpkLmk.HsmErrorDescription;
        this.AtallaVariant = translateZpkZmkToZpkLmk.AtallaVariant;
        this.ZpkUnderLmk = translateZpkZmkToZpkLmk.ZpkUnderLmk;
        this.ZpkUnderZmk = translateZpkZmkToZpkLmk.ZpkUnderZmk;
        this.ZpkKcv = translateZpkZmkToZpkLmk.ZpkKcv;
        this.images = translateZpkZmkToZpkLmk.images || [];
    }
}
