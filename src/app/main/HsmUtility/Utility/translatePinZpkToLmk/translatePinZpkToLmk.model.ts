export class TranslatePinZpkToLmk {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    ZpkUnderLmk: string;
    CardNumber: string;
    PinLmk: number;
    PinUnderZpk: string;
    PinBlockFormat: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param translatePinZpkToLmk
     */
    constructor(translatePinZpkToLmk?) {
        translatePinZpkToLmk = translatePinZpkToLmk || {};
        this.HsmErrorCode = translatePinZpkToLmk.HsmErrorCode;
        this.HsmErrorDescription = translatePinZpkToLmk.HsmErrorDescription;
        this.ZpkUnderLmk = translatePinZpkToLmk.ZpkUnderLmk;
        this.CardNumber = translatePinZpkToLmk.CardNumber;
        this.PinLmk = translatePinZpkToLmk.PinLmk;
        this.PinBlockFormat = translatePinZpkToLmk.PinBlockFormat;
        this.PinUnderZpk = translatePinZpkToLmk.PinUnderZpk;
        this.images = translatePinZpkToLmk.images || [];
    }
}
