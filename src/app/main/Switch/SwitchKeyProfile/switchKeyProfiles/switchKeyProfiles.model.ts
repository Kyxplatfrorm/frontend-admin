import { DetailListEntity } from "app/ui/switchKeyProfile";

export class SwitchKey {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    ProfileName: string;
    ProfileId: number;
    KeyIndex: string;
    KeyVariant: string;
    KeyType: string;
    KeyValue: string;
    KeyCheckValue: string;
    TemporaryKeyValue: string;
    TemporaryKeyCheckValue: string;
    KeyLmkType: string;
    DetailList: Array<DetailListEntity>;
    KeyTypeId: number;
    KeyLmkTypeId: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchKey
     */
    constructor(switchKey?) {
        switchKey = switchKey || {};
        this.Id = switchKey.Id;
        this.ProfileName = switchKey.ProfileName;
        this.ProfileId = switchKey.ProfileId;
        this.KeyIndex = switchKey.KeyIndex;
        this.KeyVariant = switchKey.KeyVariant;
        this.KeyType = switchKey.KeyType;
        this.KeyValue = switchKey.KeyValue;
        this.KeyCheckValue = switchKey.KeyCheckValue;
        this.InsertDateTime = switchKey.InsertDateTime;
        this.UpdateDateTime = switchKey.UpdateDateTime;
        this.TemporaryKeyValue = switchKey.TemporaryKeyValue;
        this.TemporaryKeyCheckValue = switchKey.TemporaryKeyCheckValue;
        this.KeyLmkType = switchKey.KeyLmkType;
        this.DetailList = switchKey.DetailList;
        this.KeyTypeId = switchKey.KeyTypeId;
        this.KeyLmkTypeId = switchKey.KeyLmkTypeId;
        this.images = switchKey.images || [];
    }
}
