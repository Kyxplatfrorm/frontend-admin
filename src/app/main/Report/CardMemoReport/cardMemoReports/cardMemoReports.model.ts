export class CardMemoReport {
    Id: number;
    SearchStartDate: any;
    SearchEndDate: any;
    Description: string;
    ParameterKey: string;
    TenantId: number;
    TenantName: string;
    CustomerId: number;
    MemoDate: number;
    ApplicationType: string;
    ApplicationTypeName: string;
    MemoChannelType: string;
    MemoChannelTypeName: string;
    MemoKeyType: string;
    MemoKeyTypeName: string;
    MemoKey: string;
    MemoType: string;
    MemoTypeName: string;
    MemoCode: string;
    MemoCodeName: string;
    OldValue: string;
    NewValue: string;
    InsertUserName: string;
    ApplicationTypeId: number;
    MemoChannelTypeId: number;
    MemoKeyTypeId: number;
    MemoTypeId: number;
    MemoCodeId: number;
    InsertDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param cardMemoReport
     */
    constructor(cardMemoReport?) {
        cardMemoReport = cardMemoReport || {};
        this.Id = cardMemoReport.Id;
        this.TenantName = cardMemoReport.TenantName;
        this.Description = cardMemoReport.Description;
        this.TenantId = cardMemoReport.TenantId;
        this.InsertDateTime = cardMemoReport.InsertDateTime;
        this.ParameterKey = cardMemoReport.ParameterKey;
        this.MemoDate = cardMemoReport.MemoDate;
        this.CustomerId = cardMemoReport.CustomerId;
        this.ApplicationType = cardMemoReport.ApplicationType;
        this.ApplicationTypeName = cardMemoReport.ApplicationTypeName;
        this.MemoChannelType = cardMemoReport.MemoChannelType;
        this.MemoChannelTypeName = cardMemoReport.MemoChannelTypeName;
        this.MemoKeyType = cardMemoReport.MemoKeyType;
        this.MemoKeyTypeName = cardMemoReport.MemoKeyTypeName;
        this.MemoKey = cardMemoReport.MemoKey;
        this.MemoType = cardMemoReport.MemoType;
        this.MemoTypeName = cardMemoReport.MemoTypeName;
        this.MemoCode = cardMemoReport.MemoCode;
        this.MemoCodeName = cardMemoReport.MemoCodeName;
        this.OldValue = cardMemoReport.OldValue;
        this.NewValue = cardMemoReport.NewValue;
        this.InsertUserName = cardMemoReport.InsertUserName;
        this.ApplicationTypeId = cardMemoReport.ApplicationTypeId;
        this.MemoChannelTypeId = cardMemoReport.MemoChannelTypeId;
        this.MemoKeyTypeId = cardMemoReport.MemoKeyTypeId;
        this.MemoTypeId = cardMemoReport.MemoTypeId;
        this.MemoCodeId = cardMemoReport.MemoCodeId;
        this.SearchStartDate = cardMemoReport.SearchStartDate;
        this.SearchEndDate = cardMemoReport.SearchEndDate;
        this.images = cardMemoReport.images || [];
    }
}
