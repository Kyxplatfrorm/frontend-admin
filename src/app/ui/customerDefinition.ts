export class CustomerApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CustomerList?: CustomerEntity[];
}
export class CustomerEntity {
    Id?: number;
    CustomerFullName?: string;
    CustomerType?: number;
    CustomerNumber?: string;
    CustomerStatus?: string;
    CustomerSegment?: string;
    FullCellPhoneNumber?: string;
    InsertDateTime?: any;
    UpdateDateTime?: any;
    AccountList?: AccountListEntity[];
}
export class AccountListEntity {
    Id?: number;
    CustomerId?: number;
    IsMainAccount?: boolean;
    AccountStatusId?: number;
    AccountStatusName?: string;
    Description?: string;
    AccountCode?: string;
    CurrencyCodeId?: number;
    CurrencyCodeName?: string;
    Balance?: number;
}

export class CustomerAccountApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CustomerAccount?: CustomerAccountEntity[];
}
export class CustomerAccountEntity {
    Id?: number;
    CustomerId?: number;
    IsMainAccount?: boolean;
    AccountStatusId?: number;
    AccountStatusName?: string;
    Description?: string;
    AccountCode?: string;
    CurrencyCodeId?: number;
    CurrencyCodeName?: string;
    Balance?: number;
}
export class CustomerTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CustomerTypeEntity[];
}
export class CustomerTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
export class IdentityTypeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: IdentityTypeEntity[];
}
export class IdentityTypeEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
export class AccountStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: AccountStatusEntity[];
}
export class AccountStatusEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
export class CustomerStatusApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CustomerStatusEntity[];
}
export class CustomerStatusEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CustomerSegmentsApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CustomerSegmentsEntity[];
}
export class CustomerSegmentsEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class CountriesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CountryList?: CountryListEntity[];
}
export class CountryListEntity {
    Id?: number;
    Description?: string;
    HasState?: boolean;
    StateList?: StateListEntity[];
}

export class StateListEntity {
    Id?: number;
    Description?: string;
    CountryId: number;
}

export class CitiesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CityList?: CityListEntity[];
}
export class CityListEntity {
    Id?: number;
    Description?: string;
}

export class CountiesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    CountyList?: CountyListEntity[];
}
export class CountyListEntity {
    Id?: number;
    Description?: string;
}

export class CurrenciesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: CurrenciesEntity[];
}
export class CurrenciesEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}

export class StatesByCountryIdApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    ParameterList?: StatesByCountryIdEntity[];
}
export class StatesByCountryIdEntity {
    Id?: number;
    Description?: string;
    ParameterKey?: string;
}
