export class FraudRule {
    Id: number;
    ParameterKey: string;
    Description: string;
    TenantName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    IsBuiltInDefinition: boolean;
    SearchStartTime: any;
    SearchEndTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    IsActive: boolean;
    HasFraudRule: boolean;
    HasFraudQuery: boolean;
    FraudQuery: string;
    FraudRuleActionType: string;
    FraudGroupId: number;
    FraudGroupName: string;
    FraudRuleActionTypeId: number;
    FraudRuleActionTypeName: string;
    FraudRuleCheckTimeType: string;
    FraudRuleCheckTimeTypeId: number;
    FraudRuleCheckTimeTypeName: string;
    FraudRuleCheckTime: number;
    FraudRuleCheckCount: number;
    FraudRuleCheckAmount: number;
    LogFraudRule: boolean;
    StartDateTime: any;
    EndDateTime: any;
    NotificationTypeId: number;
    ErrorCode: string;
    ErrorDescription: string;
    NotificationType: string;
    NotificationTypeName: string;
    NotificationTemplateCode: string;
    SendNotification: boolean;
    FraudApiId: number;
    FraudApiName: string;
    FraudRuleId: number;
    FraudRuleName: string;
    Priority: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param fraudRule
     */
    constructor(fraudRule?) {
        fraudRule = fraudRule || {};
        this.Id = fraudRule.Id;
        this.FraudApiId = fraudRule.FraudApiId;
        this.FraudApiName = fraudRule.FraudApiName;
        this.FraudRuleId = fraudRule.FraudRuleId;
        this.FraudRuleName = fraudRule.FraudRuleName;
        this.Priority = fraudRule.Priority;
        this.ParameterKey = fraudRule.ParameterKey;
        this.ErrorCode = fraudRule.ErrorCode;
        this.ErrorDescription = fraudRule.ErrorDescription;
        this.NotificationTypeId = fraudRule.NotificationTypeId;
        this.NotificationType = fraudRule.NotificationType;
        this.NotificationTypeName = fraudRule.NotificationTypeName;
        this.NotificationTemplateCode = fraudRule.NotificationTemplateCode;
        this.SendNotification = fraudRule.SendNotification;
        this.Description = fraudRule.Description;
        this.HasFraudRule = fraudRule.HasFraudRule;
        this.SearchStartTime = fraudRule.SearchStartTime;
        this.SearchEndTime = fraudRule.SearchEndTime;
        this.InsertDateTime = fraudRule.InsertDateTime;
        this.UpdateDateTime = fraudRule.UpdateDateTime;
        this.SearchStartDate = fraudRule.SearchStartDate;
        this.SearchEndDate = fraudRule.SearchEndDate;
        this.TenantId = fraudRule.TenantId;
        this.IsBuiltInDefinition = fraudRule.IsBuiltInDefinition;
        this.IsActive = fraudRule.IsActive;
        this.HasFraudQuery = fraudRule.HasFraudQuery;
        this.FraudQuery = fraudRule.FraudQuery;
        this.FraudRuleActionType = fraudRule.FraudRuleActionType;
        this.FraudGroupId = fraudRule.FraudGroupId;
        this.FraudRuleCheckTimeTypeId = fraudRule.FraudRuleCheckTimeTypeId;
        this.FraudGroupName = fraudRule.FraudGroupName;
        this.FraudRuleActionTypeId = fraudRule.FraudRuleActionTypeId;
        this.FraudRuleActionTypeName = fraudRule.FraudRuleActionTypeName;
        this.FraudRuleCheckTimeType = fraudRule.FraudRuleCheckTimeType;
        this.FraudRuleCheckTimeTypeName = fraudRule.FraudRuleCheckTimeTypeName;
        this.FraudRuleCheckTime = fraudRule.FraudRuleCheckTime;
        this.FraudRuleCheckCount = fraudRule.FraudRuleCheckCount;
        this.FraudRuleCheckAmount = fraudRule.FraudRuleCheckAmount;
        this.LogFraudRule = fraudRule.LogFraudRule;
        this.StartDateTime = fraudRule.StartDateTime;
        this.EndDateTime = fraudRule.EndDateTime;
        this.images = fraudRule.images || [];
    }
}
