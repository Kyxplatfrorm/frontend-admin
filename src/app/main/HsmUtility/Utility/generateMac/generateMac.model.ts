export class GenerateMac {
    MacKeyUnderLmk: string;
    MacData: string;
    Mac: string;
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
     * @param generateMac
     */
    constructor(generateMac?) {
        generateMac = generateMac || {};
        this.MacKeyUnderLmk = generateMac.MacKeyUnderLmk;
        this.HsmErrorCode = generateMac.HsmErrorCode;
        this.HsmErrorDescription = generateMac.HsmErrorDescription;
        this.MacData = generateMac.MacData;
        this.Mac = generateMac.Mac;
        this.images = generateMac.images || [];
    }
}
