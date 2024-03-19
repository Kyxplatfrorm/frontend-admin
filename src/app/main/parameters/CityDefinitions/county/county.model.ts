export class County {
    Id: number;
    CountryId: number;
    CityId: number;
    CityCode: number;
    CountryCode: number;
    StateCode: number;
    StateId : number;
    CityName: string;
    CountyName: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param county
     */
    constructor(county?) {
        county = county || {};
        this.Id = county.Id;
        this.CountryId = county.CountryId;
        this.CityId = county.CityId;
        this.CityCode = county.CityCode;
        this.CityName = county.CityName;
        this.CountyName = county.CountyName;
        this.CountryCode = county.CountryCode;
        this.StateCode = county.StateCode;
        this.StateId = county.StateId;
        this.images = county.images || [];
    }
}
