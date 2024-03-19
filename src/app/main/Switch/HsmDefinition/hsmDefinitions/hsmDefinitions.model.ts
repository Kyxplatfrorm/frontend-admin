export class HsmDefinition {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    Description: string;
    ParameterKey: string;
    HsmType: string;
    HsmIpAddress: string;
    HsmPort: number;
    PinLmkLength: number;
    LmkType: string;
    HsmTypeId: number;
    LmkTypeId: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param hsmDefinition
     */
    constructor(hsmDefinition?) {
        hsmDefinition = hsmDefinition || {};
        this.Id = hsmDefinition.Id;
        this.HsmType = hsmDefinition.HsmType;
        this.HsmIpAddress = hsmDefinition.HsmIpAddress;
        this.HsmPort = hsmDefinition.HsmPort;
        this.PinLmkLength = hsmDefinition.PinLmkLength;
        this.LmkType = hsmDefinition.LmkType;
        this.HsmTypeId = hsmDefinition.HsmTypeId;
        this.LmkTypeId = hsmDefinition.LmkTypeId;
        this.InsertDateTime = hsmDefinition.InsertDateTime;
        this.UpdateDateTime = hsmDefinition.UpdateDateTime;
        this.Description = hsmDefinition.Description;
        this.ParameterKey = hsmDefinition.ParameterKey;
        this.images = hsmDefinition.images || [];
    }
}
