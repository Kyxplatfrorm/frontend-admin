export class FraudAction {
    Id: number;
    ParameterKey: string;
    Description: string;
    TenantName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    SearchStartTime: any;
    SearchEndTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    InsertDate: number;
    ApplicationTypeId: number;
    FraudApiId: number;
    FraudRuleId: number;
    SessionId: number;
    UserId: number;
    CustomerId: number;
    CompanyId: number;
    CompanyPosId: number;
    FraudRuleActionTypeId: number;
    FraudRuleActionStatusId: number;
    TransactionAmount: number;
    ApplicationType: string;
    ApplicationTypeName: string;
    FraudRuleName: string;
    FraudApiName: string;
    UserName: string;
    CardToken: string;
    FraudRuleActionType: string;
    FraudRuleActionTypeName: string;
    FraudRuleActionStatus: string;
    FraudRuleActionStatusName: string;
    FraudRuleActionUser: string;
    ClientIp: string;
    TransactionCode: string;
    ReferenceNumber: string;
    FraudRuleActionDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param fraudAction
     */
    constructor(fraudAction?) {
        fraudAction = fraudAction || {};
        this.Id = fraudAction.Id;
        this.SearchStartTime = fraudAction.SearchStartTime;
        this.SearchEndTime = fraudAction.SearchEndTime;
        this.InsertDateTime = fraudAction.InsertDateTime;
        this.UpdateDateTime = fraudAction.UpdateDateTime;
        this.SearchStartDate = fraudAction.SearchStartDate;
        this.SearchEndDate = fraudAction.SearchEndDate;
        this.TenantId = fraudAction.TenantId;

        this.InsertDate = fraudAction.InsertDate;
        this.ApplicationTypeId = fraudAction.ApplicationTypeId;
        this.FraudApiId = fraudAction.FraudApiId;
        this.FraudRuleId = fraudAction.FraudRuleId;
        this.SessionId = fraudAction.SessionId;
        this.UserId = fraudAction.UserId;
        this.CustomerId = fraudAction.CustomerId;
        this.CompanyId = fraudAction.CompanyId;
        this.CompanyPosId = fraudAction.CompanyPosId;
        this.FraudRuleActionTypeId = fraudAction.FraudRuleActionTypeId;
        this.FraudRuleActionStatusId = fraudAction.FraudRuleActionStatusId;
        this.TransactionAmount = fraudAction.TransactionAmount;
        this.ApplicationType = fraudAction.ApplicationType;
        this.ApplicationTypeName = fraudAction.ApplicationTypeName;

        this.FraudRuleName = fraudAction.FraudRuleName;
        this.FraudApiName = fraudAction.FraudApiName;
        this.UserName = fraudAction.UserName;
        this.CardToken = fraudAction.CardToken;
        this.FraudRuleActionType = fraudAction.FraudRuleActionType;
        this.FraudRuleActionTypeName = fraudAction.FraudRuleActionTypeName;
        this.FraudRuleActionStatus = fraudAction.FraudRuleActionStatus;
        this.FraudRuleActionStatusName = fraudAction.FraudRuleActionStatusName;
        this.FraudRuleActionUser = fraudAction.FraudRuleActionUser;
        this.TransactionCode = fraudAction.TransactionCode;
        this.CardToken = fraudAction.CardToken;
        this.ReferenceNumber = fraudAction.ReferenceNumber;
        this.FraudRuleActionDateTime = fraudAction.FraudRuleActionDateTime;
        this.images = fraudAction.images || [];
    }
}
