export class SendRawMessage {
    LmkType: string;
    HsmRawHexRequest: string;
    HsmErrorCode: string;
    HsmErrorDescription: string;
    HsmRawHexResponse: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param sendRawMessage
     */
    constructor(sendRawMessage?) {
        sendRawMessage = sendRawMessage || {};
        this.LmkType = sendRawMessage.LmkType;
        this.HsmRawHexRequest = sendRawMessage.HsmRawHexRequest;
        this.HsmRawHexResponse = sendRawMessage.HsmRawHexResponse;
        this.HsmErrorCode = sendRawMessage.HsmErrorCode;
        this.HsmErrorDescription = sendRawMessage.HsmErrorDescription;
        this.images = sendRawMessage.images || [];
    }
}
