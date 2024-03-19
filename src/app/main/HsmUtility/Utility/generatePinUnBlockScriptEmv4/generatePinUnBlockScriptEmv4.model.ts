export class GeneratePinUnBlockScriptEmv4 {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    MacKeyUnderLmk: string;
    CardNumber: string;
    PanSequenceNumber: string;
    Atc: string;
    Arqc: string;
    IssuerScript: string;
    ModeFlag: string;
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
     * @param generatePinUnBlockScriptEmv4
     */
    constructor(generatePinUnBlockScriptEmv4?) {
        generatePinUnBlockScriptEmv4 = generatePinUnBlockScriptEmv4 || {};
        this.HsmErrorCode = generatePinUnBlockScriptEmv4.HsmErrorCode;
        this.HsmErrorDescription =
            generatePinUnBlockScriptEmv4.HsmErrorDescription;
        this.MacKeyUnderLmk = generatePinUnBlockScriptEmv4.MacKeyUnderLmk;
        this.CardNumber = generatePinUnBlockScriptEmv4.CardNumber;
        this.PanSequenceNumber = generatePinUnBlockScriptEmv4.PanSequenceNumber;
        this.Atc = generatePinUnBlockScriptEmv4.Atc;
        this.Arqc = generatePinUnBlockScriptEmv4.Arqc;
        this.IssuerScript = generatePinUnBlockScriptEmv4.IssuerScript;
        this.ModeFlag = generatePinUnBlockScriptEmv4.ModeFlag;
        this.SchemaId = generatePinUnBlockScriptEmv4.SchemaId;
        this.BranchAndHeigthMode =
            generatePinUnBlockScriptEmv4.BranchAndHeigthMode;
        this.images = generatePinUnBlockScriptEmv4.images || [];
    }
}
