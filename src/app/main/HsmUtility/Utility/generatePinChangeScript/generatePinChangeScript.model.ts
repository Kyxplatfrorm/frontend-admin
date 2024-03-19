export class GeneratePinChangeScript {
    AcUnderLmk: string;
    EncUnderLmk: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    MacKeyUnderLmk: string;
    ZpkUnderLmk: string;
    CardNumber: string;
    PanSequenceNumber: string;
    Atc: string;
    Arqc: string;
    PinBlockFormat: string;
    PinBlock: string;
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
     * @param generatePinChangeScript
     */
    constructor(generatePinChangeScript?) {
        generatePinChangeScript = generatePinChangeScript || {};
        this.AcUnderLmk = generatePinChangeScript.AcUnderLmk;
        this.EncUnderLmk = generatePinChangeScript.EncUnderLmk;
        this.HsmErrorCode = generatePinChangeScript.HsmErrorCode;
        this.HsmErrorDescription = generatePinChangeScript.HsmErrorDescription;
        this.MacKeyUnderLmk = generatePinChangeScript.MacKeyUnderLmk;
        this.ZpkUnderLmk = generatePinChangeScript.ZpkUnderLmk;
        this.CardNumber = generatePinChangeScript.CardNumber;
        this.PanSequenceNumber = generatePinChangeScript.PanSequenceNumber;
        this.Atc = generatePinChangeScript.Atc;
        this.Arqc = generatePinChangeScript.Arqc;
        this.PinBlockFormat = generatePinChangeScript.PinBlockFormat;
        this.PinBlock = generatePinChangeScript.PinBlock;
        this.IssuerScript = generatePinChangeScript.IssuerScript;
        this.images = generatePinChangeScript.images || [];
    }
}
