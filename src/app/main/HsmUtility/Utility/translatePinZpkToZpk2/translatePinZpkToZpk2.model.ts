export class TranslatePinZpkToZpk2 {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    SourceZpkUnderLmk: string;
    CardNumber: string;
    SourcePinBlockFormat: string;
    PinUnderSourceZpk: string;
    DestinationZpkUnderLmk: string;
    DestinationPinBlockFormat: string;
    MaksimumPinLength: string;
    LmkType: string;
    LengthOfThePin: string;
    PinUnderDestinationZpk: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param translatePinZpkToZpk2
     */
    constructor(translatePinZpkToZpk2?) {
        translatePinZpkToZpk2 = translatePinZpkToZpk2 || {};
        this.HsmErrorCode = translatePinZpkToZpk2.HsmErrorCode;
        this.HsmErrorDescription = translatePinZpkToZpk2.HsmErrorDescription;
        this.SourceZpkUnderLmk = translatePinZpkToZpk2.SourceZpkUnderLmk;
        this.CardNumber = translatePinZpkToZpk2.CardNumber;
        this.SourcePinBlockFormat = translatePinZpkToZpk2.SourcePinBlockFormat;
        this.PinUnderSourceZpk = translatePinZpkToZpk2.PinUnderSourceZpk;
        this.DestinationZpkUnderLmk =
            translatePinZpkToZpk2.DestinationZpkUnderLmk;
        this.DestinationPinBlockFormat =
            translatePinZpkToZpk2.DestinationPinBlockFormat;
        this.MaksimumPinLength = translatePinZpkToZpk2.MaksimumPinLength;
        this.LmkType = translatePinZpkToZpk2.LmkType;
        this.LengthOfThePin = translatePinZpkToZpk2.LengthOfThePin;
        this.PinUnderDestinationZpk =
            translatePinZpkToZpk2.PinUnderDestinationZpk;
        this.images = translatePinZpkToZpk2.images || [];
    }
}
