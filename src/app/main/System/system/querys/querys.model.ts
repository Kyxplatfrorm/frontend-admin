export class Query {
    Id: number;
    QueryTypeId: number;
    QueryCode: string;
    Description: string;
    InsertBeginDateTime: any;
    InsertEndDateTime: any;
    UpdateBeginDateTime: any;
    UpdateEndDateTime: any;
    QueryType: string;
    QueryText: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param query
     */
    constructor(query?) {
        query = query || {};
        this.Id = query.Id;
        this.QueryTypeId = query.QueryTypeId;
        this.QueryCode = query.QueryCode;
        this.Description = query.Description;
        this.InsertBeginDateTime = query.InsertBeginDateTime;
        this.InsertEndDateTime = query.InsertEndDateTime;
        this.UpdateBeginDateTime = query.UpdateBeginDateTime;
        this.UpdateEndDateTime = query.UpdateEndDateTime;
        this.QueryType = query.QueryType;
        this.QueryText = query.QueryText;
        this.InsertDateTime = query.InsertDateTime;
        this.UpdateDateTime = query.UpdateDateTime;
        this.images = query.images || [];
    }
}
