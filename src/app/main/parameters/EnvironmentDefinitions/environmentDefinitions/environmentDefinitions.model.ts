export class EnvironmentDefinition {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    EnvironmentType: string;
    EnvironmentTypeName: string;
    EnvironmentTypeId: number;
    IsProduction: boolean;
    Description: string;
    ParameterKey: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param environmentDefinition
     */
    constructor(environmentDefinition?) {
        environmentDefinition = environmentDefinition || {};
        this.Id = environmentDefinition.Id;
        this.EnvironmentType = environmentDefinition.EnvironmentType;
        this.EnvironmentTypeName = environmentDefinition.EnvironmentTypeName;
        this.EnvironmentTypeId = environmentDefinition.EnvironmentTypeId;
        this.IsProduction = environmentDefinition.IsProduction;
        this.Description = environmentDefinition.Description;
        this.InsertDateTime = environmentDefinition.InsertDateTime;
        this.UpdateDateTime = environmentDefinition.UpdateDateTime;
        this.ParameterKey = environmentDefinition.ParameterKey;
        this.images = environmentDefinition.images || [];
    }
}
