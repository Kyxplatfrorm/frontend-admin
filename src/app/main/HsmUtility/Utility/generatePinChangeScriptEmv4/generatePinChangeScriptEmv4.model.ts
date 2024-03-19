export class GeneratePinChangeScriptEmv4 {
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
    SchemaId: string;
    BranchAndHeigthMode: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param generatePinChangeScriptEmv4
     */
    constructor(generatePinChangeScriptEmv4?) {
        generatePinChangeScriptEmv4 = generatePinChangeScriptEmv4 || {};
        this.AcUnderLmk = generatePinChangeScriptEmv4.AcUnderLmk;
        this.EncUnderLmk = generatePinChangeScriptEmv4.EncUnderLmk;
        this.HsmErrorCode = generatePinChangeScriptEmv4.HsmErrorCode;
        this.HsmErrorDescription =
            generatePinChangeScriptEmv4.HsmErrorDescription;
        this.MacKeyUnderLmk = generatePinChangeScriptEmv4.MacKeyUnderLmk;
        this.ZpkUnderLmk = generatePinChangeScriptEmv4.ZpkUnderLmk;
        this.CardNumber = generatePinChangeScriptEmv4.CardNumber;
        this.PanSequenceNumber = generatePinChangeScriptEmv4.PanSequenceNumber;
        this.Atc = generatePinChangeScriptEmv4.Atc;
        this.Arqc = generatePinChangeScriptEmv4.Arqc;
        this.PinBlockFormat = generatePinChangeScriptEmv4.PinBlockFormat;
        this.PinBlock = generatePinChangeScriptEmv4.PinBlock;
        this.IssuerScript = generatePinChangeScriptEmv4.IssuerScript;
        this.SchemaId = generatePinChangeScriptEmv4.SchemaId;
        this.BranchAndHeigthMode =
            generatePinChangeScriptEmv4.BranchAndHeigthMode;
        this.images = generatePinChangeScriptEmv4.images || [];
    }
}
