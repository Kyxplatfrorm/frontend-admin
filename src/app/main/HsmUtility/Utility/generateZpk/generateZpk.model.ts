export class GenerateZpk {
    ZmkUnderLmk: string;
    AtallaVariant: string;
    ZpkUnderLmk: string;
    ZpkUnderZmk: string;
    ZpkKcv: string;
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
     * @param generateZpk
     */
    constructor(generateZpk?) {
        generateZpk = generateZpk || {};
        this.ZmkUnderLmk = generateZpk.ZmkUnderLmk;
        this.HsmErrorCode = generateZpk.HsmErrorCode;
        this.HsmErrorDescription = generateZpk.HsmErrorDescription;
        this.AtallaVariant = generateZpk.AtallaVariant;
        this.ZpkUnderLmk = generateZpk.ZpkUnderLmk;
        this.ZpkUnderZmk = generateZpk.ZpkUnderZmk;
        this.ZpkKcv = generateZpk.ZpkKcv;
        this.images = generateZpk.images || [];
    }
}
