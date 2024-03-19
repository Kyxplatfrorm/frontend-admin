export class HsmDefinitionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmDeviceList?: HsmDeviceListEntity[];
}

export class HsmDeviceListEntity {
    Id?: number;
    HsmIpAddress?: string;
    HsmPort?: number;
    InsertDateTime?: any;
    PinLmkLength?: number;
    UpdateDateTime?: any;
    LmkType?: string;
    HsmType?: string;
    Description?: string;
}
export class HsmTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HsmTypeEntity[];
}

export class HsmTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class HsmLmkTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HsmLmkTypeEntity[];
}

export class HsmLmkTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
