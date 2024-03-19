export class EncryptedDataApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    EncryptedData?: string;
}

export class XorApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    Result?: string;
}

export class TripleDesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    Result?: string;
}

export class AesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    Result?: string;
}

export class GenerateKcvApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    Result?: string;
}

export class DataConversionApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    Result?: string;
}

export class EncryptionTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: EncryptionTypeEntity[];
}
export class EncryptionTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class EncryptionModesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: EncryptionModesEntity[];
}
export class EncryptionModesEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class DataConversionTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: DataConversionTypeEntity[];
}
export class DataConversionTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}
