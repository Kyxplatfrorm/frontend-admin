export class Currency {
    Id: number;
    CurrencyCode: string;
    CurrencyCodeNumeric: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    CurrencyCodeExternal: string;
    CurrencySymbol: string;
    CountryName: string;
    CurrencyName: string;
    IconUrl: string;
    IsSettlementCurrency: boolean;
    IsCryptoCurrency: boolean;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param currency
     */
    constructor(currency?) {
        currency = currency || {};
        this.Id = currency.Id;
        this.CurrencyCode = currency.CurrencyCode;
        this.CurrencyCodeNumeric = currency.CurrencyCodeNumeric;
        this.CurrencyCodeExternal = currency.CurrencyCodeExternal;
        this.CurrencySymbol = currency.CurrencySymbol;
        this.CountryName = currency.CountryName;
        this.CurrencyName = currency.CurrencyName;
        this.IconUrl = currency.IconUrl;
        this.IsSettlementCurrency = currency.IsSettlementCurrency;
        this.IsCryptoCurrency = currency.IsCryptoCurrency;
        this.InsertDateTime = currency.InsertDateTime;
        this.UpdateDateTime = currency.UpdateDateTime;
        this.images = currency.images || [];
    }
}
