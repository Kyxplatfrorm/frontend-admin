export class VerifyArqcAndGenerateArpcEmv4 {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    AcUnderLmk: string;
    CardNumber: string;
    PanSequenceNumber: string;
    Arc: string;
    EmvData: string;
    ArpcData: string;
    ModeFlag: string;
    ProprietaryAuthenticationData: string;
    Csu: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param verifyArqcAndGenerateArpcEmv4
     */
    constructor(verifyArqcAndGenerateArpcEmv4?) {
        verifyArqcAndGenerateArpcEmv4 = verifyArqcAndGenerateArpcEmv4 || {};
        this.HsmErrorCode = verifyArqcAndGenerateArpcEmv4.HsmErrorCode;
        this.HsmErrorDescription =
            verifyArqcAndGenerateArpcEmv4.HsmErrorDescription;
        this.AcUnderLmk = verifyArqcAndGenerateArpcEmv4.AcUnderLmk;
        this.CardNumber = verifyArqcAndGenerateArpcEmv4.CardNumber;
        this.PanSequenceNumber =
            verifyArqcAndGenerateArpcEmv4.PanSequenceNumber;
        this.Arc = verifyArqcAndGenerateArpcEmv4.Arc;
        this.EmvData = verifyArqcAndGenerateArpcEmv4.EmvData;
        this.ArpcData = verifyArqcAndGenerateArpcEmv4.ArpcData;
        this.ModeFlag = verifyArqcAndGenerateArpcEmv4.ModeFlag;
        this.ProprietaryAuthenticationData =
            verifyArqcAndGenerateArpcEmv4.ProprietaryAuthenticationData;
        this.Csu = verifyArqcAndGenerateArpcEmv4.Csu;
        this.images = verifyArqcAndGenerateArpcEmv4.images || [];
    }
}
