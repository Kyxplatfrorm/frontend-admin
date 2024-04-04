export class CardEmbossReport {
    Id: number;
    TenantId: number;
    CardId: number;
    InsertDate: number;
    CustomerId: number;
    CardOrderId: number;
    BranchId: number;
    PanSequenceNumber: number;
    ExportCount: number;
    FileId: number;
    ProductId: number;
    CountryId: number;
    CityId: number;
    CountyId: number;
    IsNoNameCard: boolean;
    IsExported: boolean;
    CardTokenNumber: string;
    FileName: string;
    EmbossStatus: string;
    CardIssuingReasonType: string;
    EmbossName1: string;
    EmbossName2: string;
    ErrorCode: string;
    StateCode: string;
    Address: string;
    ZipCode: string;
    ContractType: string;
    ExportDateTime: any;
    ExpiryDate: any;
    SearchStartDate: any;
    SearchEndDate: any;
    ErrorDescription: string;
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
     * @param cardEmbossReport
     */
    constructor(cardEmbossReport?) {
        cardEmbossReport = cardEmbossReport || {};
        this.Id = cardEmbossReport.Id;
        this.ErrorDescription = cardEmbossReport.ErrorDescription;
        this.TenantId = cardEmbossReport.TenantId;
        this.InsertDateTime = cardEmbossReport.InsertDateTime;
        this.CardId = cardEmbossReport.CardId;
        this.InsertDate = cardEmbossReport.InsertDate;
        this.CustomerId = cardEmbossReport.CustomerId;
        this.CardOrderId = cardEmbossReport.CardOrderId;
        this.BranchId = cardEmbossReport.BranchId;
        this.PanSequenceNumber = cardEmbossReport.PanSequenceNumber;
        this.ExportCount = cardEmbossReport.ExportCount;
        this.FileId = cardEmbossReport.FileId;
        this.ProductId = cardEmbossReport.ProductId;
        this.CountryId = cardEmbossReport.CountryId;
        this.CityId = cardEmbossReport.CityId;
        this.CountyId = cardEmbossReport.CountyId;
        this.IsNoNameCard = cardEmbossReport.IsNoNameCard;
        this.IsExported = cardEmbossReport.IsExported;
        this.CardTokenNumber = cardEmbossReport.CardTokenNumber;
        this.FileName = cardEmbossReport.FileName;
        this.EmbossStatus = cardEmbossReport.EmbossStatus;
        this.CardIssuingReasonType = cardEmbossReport.CardIssuingReasonType;
        this.EmbossName1 = cardEmbossReport.EmbossName1;
        this.EmbossName2 = cardEmbossReport.EmbossName2;
        this.ErrorCode = cardEmbossReport.ErrorCode;
        this.StateCode = cardEmbossReport.StateCode;
        this.Address = cardEmbossReport.Address;
        this.ZipCode = cardEmbossReport.ZipCode;
        this.ContractType = cardEmbossReport.ContractType;
        this.ExportDateTime = cardEmbossReport.ExportDateTime;
        this.ExpiryDate = cardEmbossReport.ExpiryDate;
        this.SearchStartDate = cardEmbossReport.SearchStartDate;
        this.SearchEndDate = cardEmbossReport.SearchEndDate;
        this.images = cardEmbossReport.images || [];
    }
}
