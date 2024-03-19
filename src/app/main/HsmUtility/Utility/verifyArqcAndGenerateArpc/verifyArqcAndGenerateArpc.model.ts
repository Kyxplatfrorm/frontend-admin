export class VerifyArqcAndGenerateArpc {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    AcUnderLmk: string;
    CardNumber: string;
    PanSequenceNumber: string;
    Arc: string;
    EmvData: string;
    ArpcData: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param verifyArqcAndGenerateArpc
     */
    constructor(verifyArqcAndGenerateArpc?) {
        verifyArqcAndGenerateArpc = verifyArqcAndGenerateArpc || {};
        this.HsmErrorCode = verifyArqcAndGenerateArpc.HsmErrorCode;
        this.HsmErrorDescription =
            verifyArqcAndGenerateArpc.HsmErrorDescription;
        this.AcUnderLmk = verifyArqcAndGenerateArpc.AcUnderLmk;
        this.CardNumber = verifyArqcAndGenerateArpc.CardNumber;
        this.PanSequenceNumber = verifyArqcAndGenerateArpc.PanSequenceNumber;
        this.Arc = verifyArqcAndGenerateArpc.Arc;
        this.EmvData = verifyArqcAndGenerateArpc.EmvData;
        this.ArpcData = verifyArqcAndGenerateArpc.ArpcData;
        this.images = verifyArqcAndGenerateArpc.images || [];
    }
}
