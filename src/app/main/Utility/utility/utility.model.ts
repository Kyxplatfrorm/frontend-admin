export class Utility {
    Data: string;
    EncryptedData: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param utility
     */
    constructor(utility?) {
        utility = utility || {};
        this.Data = utility.Data;
        this.EncryptedData = utility.EncryptedData;
        this.images = utility.images || [];
    }
}
