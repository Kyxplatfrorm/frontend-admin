export class GenerateCvv {
    CvvKey: string;
    CardNumber: string;
    ExpiryDateYYMM: string;
    ServiceCode: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    Cvv: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param generateCvv
     */
    constructor(generateCvv?) {
        generateCvv = generateCvv || {};
        this.CvvKey = generateCvv.CvvKey;
        this.CardNumber = generateCvv.CardNumber;
        this.ExpiryDateYYMM = generateCvv.ExpiryDateYYMM;
        this.ServiceCode = generateCvv.ServiceCode;
        this.HsmErrorCode = generateCvv.HsmErrorCode;
        this.Cvv = generateCvv.Cvv;
        this.HsmErrorDescription = generateCvv.HsmErrorDescription;
        this.images = generateCvv.images || [];
    }
}
