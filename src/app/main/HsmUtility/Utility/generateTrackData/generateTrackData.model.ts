export class GenerateTrackData {
    HsmErrorCode: string;
    HsmErrorDescription: string;
    CvkUnderLmk: string;
    CardNumber: string;
    ExpiryDateYYMM: string;
    ServiceCode: string;
    EmbossName: string;
    PvvKeyIndex: string;
    Pvv: string;
    CvvOffset: number;
    Track1: string;
    Track2: string;
    Track2Chip: string;
    Cvv: string;
    ICvv: string;
    Cvv2: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param generateTrackData
     */
    constructor(generateTrackData?) {
        generateTrackData = generateTrackData || {};
        this.HsmErrorCode = generateTrackData.HsmErrorCode;
        this.HsmErrorDescription = generateTrackData.HsmErrorDescription;
        this.CvkUnderLmk = generateTrackData.CvkUnderLmk;
        this.CardNumber = generateTrackData.CardNumber;
        this.ExpiryDateYYMM = generateTrackData.ExpiryDateYYMM;
        this.ServiceCode = generateTrackData.ServiceCode;
        this.EmbossName = generateTrackData.EmbossName;
        this.PvvKeyIndex = generateTrackData.PvvKeyIndex;
        this.Pvv = generateTrackData.Pvv;
        this.CvvOffset = generateTrackData.CvvOffset;
        this.Track1 = generateTrackData.Track1;
        this.Track2 = generateTrackData.Track2;
        this.Cvv = generateTrackData.Cvv;
        this.ICvv = generateTrackData.ICvv;
        this.Cvv2 = generateTrackData.Cvv2;
        this.images = generateTrackData.images || [];
    }
}
