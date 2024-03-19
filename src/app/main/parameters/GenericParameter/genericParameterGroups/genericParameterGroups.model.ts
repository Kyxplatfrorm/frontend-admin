import {
    GenericParameterEntity,
    GenericParameterGroupEntity,
} from "app/ui/genericParameterGroups";

export class GenericParameterGroup {
    Id: number;
    Description: string;
    ConfigGroupId: number;
    GroupCode: string;
    ParameterKey: string;
    ParameterValue: string;
    ParameterValue1: string;
    ParameterValue2: string;
    ParameterValue3: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    GenericParameterGroupList: Array<GenericParameterGroupEntity>;
    GenericParameterList: Array<GenericParameterEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param genericParameterGroup
     */
    constructor(genericParameterGroup?) {
        genericParameterGroup = genericParameterGroup || {};
        this.Id = genericParameterGroup.Id;
        this.Description = genericParameterGroup.Description;
        this.ParameterKey = genericParameterGroup.ParameterKey;
        this.ParameterValue = genericParameterGroup.ParameterValue;
        this.ParameterValue1 = genericParameterGroup.ParameterValue1;
        this.ParameterValue2 = genericParameterGroup.ParameterValue2;
        this.ParameterValue3 = genericParameterGroup.ParameterValue3;
        this.GroupCode = genericParameterGroup.GroupCode;
        this.InsertDateTime = genericParameterGroup.InsertDateTime;
        this.UpdateDateTime = genericParameterGroup.UpdateDateTime;
        this.GenericParameterGroupList =
            genericParameterGroup.GenericParameterGroupList;
        this.ConfigGroupId = genericParameterGroup.ConfigGroupId;
        this.GenericParameterList = genericParameterGroup.GenericParameterList;
        this.images = genericParameterGroup.images || [];
    }
}
