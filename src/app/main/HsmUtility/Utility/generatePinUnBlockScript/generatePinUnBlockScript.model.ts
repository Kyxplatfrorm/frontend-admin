export class GeneratePinUnBlockScript {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    MacKeyUnderLmk: string;
    CardNumber: string;
    PanSequenceNumber: string;
    Atc: string;
    Arqc: string;
    IssuerScript: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param generatePinUnBlockScript
     */
    constructor(generatePinUnBlockScript?) {
        generatePinUnBlockScript = generatePinUnBlockScript || {};
        this.HsmErrorCode = generatePinUnBlockScript.HsmErrorCode;
        this.HsmErrorDescription = generatePinUnBlockScript.HsmErrorDescription;
        this.MacKeyUnderLmk = generatePinUnBlockScript.MacKeyUnderLmk;
        this.CardNumber = generatePinUnBlockScript.CardNumber;
        this.PanSequenceNumber = generatePinUnBlockScript.PanSequenceNumber;
        this.Atc = generatePinUnBlockScript.Atc;
        this.Arqc = generatePinUnBlockScript.Arqc;
        this.IssuerScript = generatePinUnBlockScript.IssuerScript;
        this.images = generatePinUnBlockScript.images || [];
    }
}
