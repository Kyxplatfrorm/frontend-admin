import { CityEntity, StateEntity } from "app/ui/country";
export class Country {
    Id: number;
    CountryCode: number;
    StateList: Array<StateEntity>;
    CountryId: number;
    CountryName: string;
    StateCode: number;
    StateAlphaCode: string;
    StateName: string;
    HasState: boolean;
    CityList: Array<CityEntity>;
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
        this.StateList = country.StateList;
        this.CountryCode = country.CountryCode;
        this.CountryName = country.CountryName;
        this.HasState = country.HasState;
        this.CountryId = country.CountryId;
        this.StateCode = country.StateCode;
        this.StateAlphaCode = country.StateAlphaCode;
        this.StateName = country.StateName;
        this.images = country.images || [];
    }
}
