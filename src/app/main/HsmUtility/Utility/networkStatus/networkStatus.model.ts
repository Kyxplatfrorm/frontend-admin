export class NetWorkStatus {
    LmkType: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param netWorkStatus
     */
    constructor(netWorkStatus?) {
        netWorkStatus = netWorkStatus || {};
        this.LmkType = netWorkStatus.LmkType;
        this.HsmErrorCode = netWorkStatus.HsmErrorCode;
        this.HsmErrorDescription = netWorkStatus.HsmErrorDescription;
        this.images = netWorkStatus.images || [];
    }
}
