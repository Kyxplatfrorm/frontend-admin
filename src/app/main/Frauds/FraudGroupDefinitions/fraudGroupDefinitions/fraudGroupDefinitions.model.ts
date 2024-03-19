export class FraudGroup {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    ApplicationTypeId: number;
    UserTypeId: number;
    TenantId: number;
    IsBuiltInDefinition: boolean;
    Description: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param fraudGroup
     */
    constructor(fraudGroup?) {
        fraudGroup = fraudGroup || {};
        this.Id = fraudGroup.Id;
        this.IsBuiltInDefinition = fraudGroup.IsBuiltInDefinition;
        this.Description = fraudGroup.Description;
        this.images = fraudGroup.images || [];
    }
}
