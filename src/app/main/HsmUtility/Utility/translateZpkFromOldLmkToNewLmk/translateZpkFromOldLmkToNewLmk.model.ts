export class TranslateZpkFromOldLmkToNewLmk {
    ZpkLmkKey: string;
    LmkIdentifier: string;
    ZpkUnderLmk: string;
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
     * @param translateZpkFromOldLmkToNewLmk
     */
    constructor(translateZpkFromOldLmkToNewLmk?) {
        translateZpkFromOldLmkToNewLmk = translateZpkFromOldLmkToNewLmk || {};
        this.ZpkLmkKey = translateZpkFromOldLmkToNewLmk.ZpkLmkKey;
        this.HsmErrorCode = translateZpkFromOldLmkToNewLmk.HsmErrorCode;
        this.HsmErrorDescription =
            translateZpkFromOldLmkToNewLmk.HsmErrorDescription;
        this.LmkIdentifier = translateZpkFromOldLmkToNewLmk.LmkIdentifier;
        this.ZpkUnderLmk = translateZpkFromOldLmkToNewLmk.ZpkUnderLmk;
        this.images = translateZpkFromOldLmkToNewLmk.images || [];
    }
}
