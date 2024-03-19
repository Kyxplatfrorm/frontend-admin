import { CountyEntity } from "app/ui/city";

export class City {
    Id: number;
    CountryId: number;
    CityId: number;
    StateId: number;
    HasState: boolean;
    CityCode: number;
    CountryCode: number;
    StateCode: number;
    CityName: string;
    CountyName: string;
    CountyList: Array<CountyEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param city
     */
    constructor(city?) {
        city = city || {};
        this.Id = city.Id;
        this.CountryId = city.CountryId;
        this.CityId = city.CityId;
        this.StateId = city.StateId;
        this.HasState = city.HasState;
        this.CityCode = city.CityCode;
        this.CityName = city.CityName;
        this.CountyList = city.CountyList;
        this.CountryCode = city.CountryCode;
        this.StateCode = city.StateCode;
        this.CountyName = city.CountyName;
        this.images = city.images || [];
    }
}
