export class SwitchTransactionCodeMap {
    Id: number;
    InsertDateTime: any;
    UpdateDateTime: any;
    NetworkType: string;
    ParameterKey: string;
    Description: string;
    NetworkTypeId: number;
    NetworkTypeName: string;
    IsActive: boolean;
    Mti: number;
    TransactionEntryTypeId: number;
    TransactionCodeId: number;
    TransactionAmount: number;
    Priority: number;
    ProcessingCode: string;
    TransactionEntryType: string;
    TransactionEntryTypeName: string;
    TransactionCode: string;
    TransactionCodeName: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param switchTransactionCodeMap
     */
    constructor(switchTransactionCodeMap?) {
        switchTransactionCodeMap = switchTransactionCodeMap || {};
        this.Id = switchTransactionCodeMap.Id;
        this.NetworkTypeId = switchTransactionCodeMap.NetworkTypeId;
        this.NetworkTypeName = switchTransactionCodeMap.NetworkTypeName;
        this.NetworkType = switchTransactionCodeMap.NetworkType;
        this.IsActive = switchTransactionCodeMap.IsActive;
        this.Mti = switchTransactionCodeMap.Mti;
        this.TransactionEntryTypeId =
            switchTransactionCodeMap.TransactionEntryTypeId;
        this.TransactionCodeId = switchTransactionCodeMap.TransactionCodeId;
        this.ParameterKey = switchTransactionCodeMap.ParameterKey;
        this.Description = switchTransactionCodeMap.Description;
        this.TransactionAmount = switchTransactionCodeMap.TransactionAmount;
        this.Priority = switchTransactionCodeMap.Priority;
        this.ProcessingCode = switchTransactionCodeMap.ProcessingCode;
        this.InsertDateTime = switchTransactionCodeMap.InsertDateTime;
        this.UpdateDateTime = switchTransactionCodeMap.UpdateDateTime;
        this.TransactionEntryType =
            switchTransactionCodeMap.TransactionEntryType;
        this.TransactionEntryTypeName =
            switchTransactionCodeMap.TransactionEntryTypeName;
        this.TransactionCode = switchTransactionCodeMap.TransactionCode;
        this.TransactionCodeName = switchTransactionCodeMap.TransactionCodeName;
        this.images = switchTransactionCodeMap.images || [];
    }
}
