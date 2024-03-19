export class Xor {
    XorData1: string;
    XorData2: string;
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
     * @param xor
     */
    constructor(xor?) {
        xor = xor || {};
        this.XorData1 = xor.XorData1;
        this.XorData2 = xor.XorData2;
        this.Result = xor.Result;
        this.images = xor.images || [];
    }
}
