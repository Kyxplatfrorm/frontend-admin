export class Resource {
    Id: number;
    LanguageCode: string;
    Description: string;
    ErrorId: number;

    /**
     * Constructor
     *
     * @param resource
     */
    constructor(resource) {
        {
            this.Id = resource.Id;
            this.LanguageCode = resource.LanguageCode;
            this.Description = resource.Description;
            this.ErrorId = resource.ErrorId;
        }
    }
}
