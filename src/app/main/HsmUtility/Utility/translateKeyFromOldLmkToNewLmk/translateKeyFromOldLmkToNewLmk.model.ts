export class TranslateKeyFromOldLmkToNewLmk {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    KeyTypeCode: string;
    KeyLength: string;
    LmkKey: string;
    KeyType: string;
    LmkIdentifier: string;
    KeyUsage: string;
    ModeOfUse: string;
    KeyVersionNumber: string;
    Exportability: string;
    NumberOfOptionalBlocks: string;
    OptionalBlocks: string;
    KeyUnderLmk: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param translateKeyFromOldLmkToNewLmk
     */
    constructor(translateKeyFromOldLmkToNewLmk?) {
        translateKeyFromOldLmkToNewLmk = translateKeyFromOldLmkToNewLmk || {};
        this.HsmErrorCode = translateKeyFromOldLmkToNewLmk.HsmErrorCode;
        this.HsmErrorDescription =
            translateKeyFromOldLmkToNewLmk.HsmErrorDescription;
        this.KeyTypeCode = translateKeyFromOldLmkToNewLmk.KeyTypeCode;
        this.KeyLength = translateKeyFromOldLmkToNewLmk.KeyLength;
        this.LmkKey = translateKeyFromOldLmkToNewLmk.LmkKey;
        this.KeyType = translateKeyFromOldLmkToNewLmk.KeyType;
        this.LmkIdentifier = translateKeyFromOldLmkToNewLmk.LmkIdentifier;
        this.KeyUsage = translateKeyFromOldLmkToNewLmk.KeyUsage;
        this.ModeOfUse = translateKeyFromOldLmkToNewLmk.ModeOfUse;
        this.KeyVersionNumber = translateKeyFromOldLmkToNewLmk.KeyVersionNumber;
        this.Exportability = translateKeyFromOldLmkToNewLmk.Exportability;
        this.NumberOfOptionalBlocks =
            translateKeyFromOldLmkToNewLmk.NumberOfOptionalBlocks;
        this.OptionalBlocks = translateKeyFromOldLmkToNewLmk.OptionalBlocks;
        this.KeyUnderLmk = translateKeyFromOldLmkToNewLmk.KeyUnderLmk;
        this.images = translateKeyFromOldLmkToNewLmk.images || [];
    }
}
