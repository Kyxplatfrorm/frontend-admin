import { StateEntity } from "app/ui/country";

export class Country {
    Id: number;
    CountryCode: number;
    CountryId: number;
    CountryName: string;
    StateCode: number;
    StateAlphaCode: string;
    StateName: string;
    DefaultCurrencyCode: string;
    CountryIsoCode2: string;
    CountryIsoCode3: string;
    CountryPhoneCode: number;
    StateList: Array<StateEntity>;
    ExternalCountryCode: number;
    MaxPhoneLength: number;
    MinPhoneLength: number;
    PhoneMask: string;
    IconUrl: string;
    IsGlobalRegistrationEnabled: boolean;
    IsLocalRegistrationEnabled: boolean;
    HasState: boolean;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param country
     */
    constructor(country?) {
        country = country || {};
        this.Id = country.Id;
        this.CountryCode = country.CountryCode;
        this.CountryName = country.CountryName;
        this.DefaultCurrencyCode = country.DefaultCurrencyCode;
        this.CountryIsoCode2 = country.CountryIsoCode2;
        this.CountryIsoCode3 = country.CountryIsoCode3;
        this.CountryPhoneCode = country.CountryPhoneCode;
        this.ExternalCountryCode = country.ExternalCountryCode;
        this.MaxPhoneLength = country.MaxPhoneLength;
        this.MinPhoneLength = country.MinPhoneLength;
        this.PhoneMask = country.PhoneMask;
        this.IconUrl = country.IconUrl;
        this.IsGlobalRegistrationEnabled = country.IsGlobalRegistrationEnabled;
        this.IsLocalRegistrationEnabled = country.IsLocalRegistrationEnabled;
        this.StateList = country.StateList;
        this.HasState = country.HasState;
        this.CountryId = country.CountryId;
        this.StateCode = country.StateCode;
        this.StateAlphaCode = country.StateAlphaCode;
        this.StateName = country.StateName;
        this.images = country.images || [];
    }
}
