export class TokenizeCard {
    CardNumber: string;
    CardTokenNumber: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tokenizeCrd
     */
    constructor(tokenizeCrd?) {
        tokenizeCrd = tokenizeCrd || {};
        this.CardNumber = tokenizeCrd.CardNumber;
        this.CardTokenNumber = tokenizeCrd.CardTokenNumber;
        this.images = tokenizeCrd.images || [];
    }
}
