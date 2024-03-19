export class GenerateKcv {
    KeyTypeCode: string;
    KeyLength: string;
    KeyUnderLmk: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    KeyCheckValue: string;
    KeyTypeId: number;
    KeyLengthTypeId: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param generateKcv
     */
    constructor(generateKcv?) {
        generateKcv = generateKcv || {};
        this.KeyTypeCode = generateKcv.KeyTypeCode;
        this.KeyLength = generateKcv.KeyLength;
        this.KeyUnderLmk = generateKcv.KeyUnderLmk;
        this.HsmErrorCode = generateKcv.HsmErrorCode;
        this.KeyCheckValue = generateKcv.KeyCheckValue;
        this.HsmErrorDescription = generateKcv.HsmErrorDescription;
        this.KeyTypeId = generateKcv.KeyTypeId;
        this.KeyLengthTypeId = generateKcv.KeyLengthTypeId;
        this.images = generateKcv.images || [];
    }
}
