export class Kcv {
    Key: string;
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
     * @param kcv
     */
    constructor(kcv?) {
        kcv = kcv || {};
        this.Key = kcv.Key;
        this.Result = kcv.Result;
        this.images = kcv.images || [];
    }
}
