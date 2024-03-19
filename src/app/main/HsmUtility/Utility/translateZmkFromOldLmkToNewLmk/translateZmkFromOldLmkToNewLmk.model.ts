export class TranslateZmkFromOldLmkToNewLmk {
    LmkZmkKey: string;
    LmkIdentifier: string;
    ZmkKeyUnderLmk: string;
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
     * @param translateZmkFromOldLmkToNewLmk
     */
    constructor(translateZmkFromOldLmkToNewLmk?) {
        translateZmkFromOldLmkToNewLmk = translateZmkFromOldLmkToNewLmk || {};
        this.LmkZmkKey = translateZmkFromOldLmkToNewLmk.LmkZmkKey;
        this.HsmErrorCode = translateZmkFromOldLmkToNewLmk.HsmErrorCode;
        this.HsmErrorDescription =
            translateZmkFromOldLmkToNewLmk.HsmErrorDescription;
        this.LmkIdentifier = translateZmkFromOldLmkToNewLmk.LmkIdentifier;
        this.ZmkKeyUnderLmk = translateZmkFromOldLmkToNewLmk.ZmkKeyUnderLmk;
        this.images = translateZmkFromOldLmkToNewLmk.images || [];
    }
}
