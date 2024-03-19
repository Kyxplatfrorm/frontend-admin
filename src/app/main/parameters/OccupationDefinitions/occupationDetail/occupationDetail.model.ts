export class Occupation {
    Id: number;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    OccupationCode: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param occupation
     */
    constructor(occupation?) {
        occupation = occupation || {};
        this.Id = occupation.Id;
        this.Description = occupation.Description;
        this.OccupationCode = occupation.OccupationCode;
        this.InsertDateTime = occupation.InsertDateTime;
        this.UpdateDateTime = occupation.UpdateDateTime;
        this.images = occupation.images || [];
    }
}
