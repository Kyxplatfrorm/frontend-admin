export class GenerateCvvApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    Cvv?: string;
}

export class GenerateKcvApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyCheckValue?: string;
}

export class GenerateKeyApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyUnderLmk?: string;
    KeyUnderZmk?: string;
}

export class KeyZmkTmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: KeyZmkTmkEntity[];
}
export class KeyZmkTmkEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class EncryptDataApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    EncryptedData?: string;
}

export class DecryptDataApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    DecryptedData?: string;
}

export class ImportKeyApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyUnderLmk?: string;
}
export class ExportKeyApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyUnderZmk?: string;
}
export class NetworkStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
}

export class GeneratePinLmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    PinLmk?: number;
}

export class SendRawMessageApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    HsmRawHexResponse?: string;
}

export class HsmKcvKeyTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HsmKcvKeyTypeEntity[];
}
export class HsmKcvKeyTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class HsmKcvKeyLengthFlagTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HsmKcvKeyLengthFlagTypeEntity[];
}
export class HsmKcvKeyLengthFlagTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class HsmImportExportKeyTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: HsmImportExportKeyTypeEntity[];
}
export class HsmImportExportKeyTypeEntity {
    Id?: number;
    ParameterKey?: string;
    Description?: string;
}

export class GenerateMacApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    Mac?: string;
}

export class GeneratePinChangeScriptApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    IssuerScript?: string;
}

export class GeneratePinChangeScriptForEmv4ApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    IssuerScript?: string;
}

export class GeneratePinUnBlockScriptApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    IssuerScript?: string;
}

export class GeneratePinUnBlockScriptForEmv4ApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    IssuerScript?: string;
}

export class GeneratePvvApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    Pvv?: string;
}

export class GenerateTrackDataApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    Track1?: string;
    Track2?: string;
    Track2Chip?: string;
    Cvv?: string;
    ICvv?: string;
    Cvv2?: string;
}

export class GenerateZpkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ZpkUnderLmk?: string;
    ZpkUnderZmk?: string;
    ZpkKcv?: string;
}

export class ImportKeyForKeyBlockApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyUnderLmkWithKcv?: string;
}

export class ImportZpkForKeyBlockApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyUnderLmkWithKcv?: string;
}

export class TranslateKeyFromOldLmkToNewLmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    KeyUnderLmk?: string;
}

export class TranslateZmkFromOldLmkToNewLmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ZmkKeyUnderLmk?: string;
}

export class TranslateZpkFromOldLmkToNewLmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ZpkUnderLmk?: string;
}

export class TranslateZpkLmkToZpkZmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ZpkUnderZmk?: string;
    ZpkKcv?: string;
}

export class TranslateZpkZmkToZpkLmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ZpkUnderLmk?: string;
    ZpkKcv?: string;
}

export class TranslatePinLmk2ZpkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    PinUnderZpk?: string;
}

export class TranslatePinUnderZpk2LmkApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    PinLmk?: number;
}

export class TranslatePinUnderZpkToZpk2ApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    LengthOfThePin?: string;
    PinUnderDestinationZpk?: string;
    DestinationPinBlockFormat?: string;
}

export class VerifyArqcAndGenerateArpcApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ArpcData?: string;
}

export class VerifyArqcAndGenerateArpcEmv4ApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    HsmErrorCode?: string;
    HsmErrorDescription?: string;
    ArpcData?: string;
}
