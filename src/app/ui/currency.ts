export class CurrencyApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CurrencyList?: CurrencyEntity[];
}

export class CurrencyEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    CurrencyCode?: string;
    CurrencyCodeNumeric?: string;
    CurrencyCodeExternal?: string;
    CurrencySymbol?: string;
    CountryName?: string;
    CurrencyName?: string;
    IconUrl?: string;
    IsSettlementCurrency?: boolean;
    IsCryptoCurrency?: boolean;
}
