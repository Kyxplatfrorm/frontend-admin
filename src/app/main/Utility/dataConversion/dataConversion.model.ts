export class DataConversion {
    DataConversionTypeId: number;
    Data: string;
    Result: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param dataConversion
     */
    constructor(dataConversion?) {
        dataConversion = dataConversion || {};
        this.DataConversionTypeId = dataConversion.DataConversionTypeId;
        this.Data = dataConversion.Data;
        this.Result = dataConversion.Result;
        this.images = dataConversion.images || [];
    }
}
