export class WebHookPayLoadTemplate {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    WebHookType: string;
    WebHookTypeName: string;
    WebHookPayload: string;
    WebHookTypeId: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param webHookPayLoadTemplate
     */
    constructor(webHookPayLoadTemplate?) {
        webHookPayLoadTemplate = webHookPayLoadTemplate || {};
        this.Id = webHookPayLoadTemplate.Id;
        this.WebHookTypeName = webHookPayLoadTemplate.WebHookTypeName;
        this.WebHookType = webHookPayLoadTemplate.WebHookType;
        this.WebHookPayload = webHookPayLoadTemplate.WebHookPayload;
        this.WebHookTypeId = webHookPayLoadTemplate.WebHookTypeId;
        this.InsertDateTime = webHookPayLoadTemplate.InsertDateTime;
        this.UpdateDateTime = webHookPayLoadTemplate.UpdateDateTime;
        this.images = webHookPayLoadTemplate.images || [];
    }
}
