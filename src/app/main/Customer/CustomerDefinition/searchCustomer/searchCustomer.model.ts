import { CustomerEntity, StateListEntity } from "app/ui/customerDefinition";

export class SearchCustomer {
    Id: number;
    CustomerId: number;
    CompanyId: number;
    CustomerNumber: string;
    CustomerName: string;
    IdentityNumber: string;
    CellPhoneNumber: string;
    Email: string;
    SearchStartDate: any;
    SearchEndDate: any;
    ZipCode: string;
    Address: string;
    BirthOfPlace: string;
    IdentityTypeId: number;
    Surname: string;
    MiddleName: string;
    Name: string;
    CompanyName: string;
    InternationalPhoneCode: string;
    CustomerTypeId: number;
    BirthDate: any;
    CountryId: number;
    CityId: number;
    CountyId: number;
    Description: string;
    CurrencyCode: string;
    SuffixCode: string;
    IsMainAccount: boolean;
    CustomerFullName: string;
    CustomerStatus: string;
    CustomerSegment: string;
    FullCellPhoneNumber: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    CustomerList: Array<CustomerEntity>;
    StateList: Array<StateListEntity>;
    CityName: string;
    CountyName: string;
    CustomerType: string;
    StateId: number;
    ParameterKey: string;
    CustomerSegmentId: number;
    CustomerStatusId: number;
    CustomerStatusChangeDatetime: any;
    OccupationId: number;
    AccountStatusId: number;
    AccountStatusName: string;
    AccountCode: string;
    CurrencyCodeId: number;
    CurrencyCodeName: string;
    Balance: number;
    CurrencyId: number;
    CurrencyName: string;

    /**
     * Constructor
     *
     * @param searchCustomer
     */
    constructor(searchCustomer?) {
        searchCustomer = searchCustomer || {};
        this.Id = searchCustomer.Id;
        this.CustomerId = searchCustomer.CustomerId;
        this.CompanyId = searchCustomer.CompanyId;
        this.CustomerNumber = searchCustomer.CustomerNumber;
        this.CustomerName = searchCustomer.CustomerName;
        this.IdentityNumber = searchCustomer.IdentityNumber;
        this.CellPhoneNumber = searchCustomer.CellPhoneNumber;
        this.Email = searchCustomer.Email;
        this.SearchStartDate = searchCustomer.SearchStartDate;
        this.SearchEndDate = searchCustomer.SearchEndDate;
        this.ZipCode = searchCustomer.ZipCode;
        this.Address = searchCustomer.Address;
        this.BirthOfPlace = searchCustomer.BirthOfPlace;
        this.Surname = searchCustomer.Surname;
        this.MiddleName = searchCustomer.MiddleName;
        this.Name = searchCustomer.Name;
        this.CompanyName = searchCustomer.CompanyName;
        this.InternationalPhoneCode = searchCustomer.InternationalPhoneCode;
        this.BirthDate = searchCustomer.BirthDate;
        this.CountryId = searchCustomer.CountryId;
        this.CityId = searchCustomer.CityId;
        this.CountyId = searchCustomer.CountyId;
        this.Description = searchCustomer.Description;
        this.CurrencyCode = searchCustomer.CurrencyCode;
        this.SuffixCode = searchCustomer.SuffixCode;
        this.IsMainAccount = searchCustomer.IsMainAccount;
        this.CustomerFullName = searchCustomer.CustomerFullName;
        this.CustomerStatus = searchCustomer.CustomerStatus;
        this.CustomerSegment = searchCustomer.CustomerSegment;
        this.FullCellPhoneNumber = searchCustomer.FullCellPhoneNumber;
        this.InsertDateTime = searchCustomer.InsertDateTime;
        this.UpdateDateTime = searchCustomer.UpdateDateTime;
        this.CustomerList = searchCustomer.CustomerList;
        this.CityName = searchCustomer.CityName;
        this.CountyName = searchCustomer.CountyName;
        this.CustomerTypeId = searchCustomer.CustomerTypeId;
        this.IdentityTypeId = searchCustomer.IdentityTypeId;
        this.CustomerType = searchCustomer.CustomerType;
        this.StateId = searchCustomer.StateId;
        this.StateList = searchCustomer.StateList;
        this.ParameterKey = searchCustomer.ParameterKey;
        this.CustomerSegmentId = searchCustomer.CustomerSegmentId;
        this.CustomerStatusId = searchCustomer.CustomerStatusId;
        this.CustomerStatusChangeDatetime =
            searchCustomer.CustomerStatusChangeDatetime;
        this.OccupationId = searchCustomer.OccupationId;
        this.AccountStatusId = searchCustomer.AccountStatusId;
        this.AccountStatusName = searchCustomer.AccountStatusName;
        this.AccountCode = searchCustomer.AccountCode;
        this.CurrencyCodeId = searchCustomer.CurrencyCodeId;
        this.CurrencyCodeName = searchCustomer.CurrencyCodeName;
        this.Balance = searchCustomer.Balance;
        this.CurrencyId = searchCustomer.CurrencyId;
        this.CurrencyName = searchCustomer.CurrencyName;
    }
}
