export class SystemFileFormat {
    Id: number;
    ParameterKey: string;
    Description: string;
    CompanyId: number;
    TenantId: number;
    TenantName: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    SearchStartDate: any;
    SearchEndDate: any;
    FileFormatCode: string;
    FileNameFormat: string;
    FileFormatType: string;
    FileFormatTypeId: number;
    FileFormatTypeName: string;
    FileDirectionType: string;
    FileDirectionTypeId: number;
    FileDirectionTypeName: string;

    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param systemFileFormat
     */
    constructor(systemFileFormat?) {
        systemFileFormat = systemFileFormat || {};
        this.Id = systemFileFormat.Id;
        this.TenantId = systemFileFormat.TenantId;
        this.TenantName = systemFileFormat.TenantName;
        this.ParameterKey = systemFileFormat.ParameterKey;
        this.Description = systemFileFormat.Description;
        this.CompanyId = systemFileFormat.CompanyId;
        this.InsertDateTime = systemFileFormat.InsertDateTime;
        this.UpdateDateTime = systemFileFormat.UpdateDateTime;
        this.SearchStartDate = systemFileFormat.SearchStartDate;
        this.SearchEndDate = systemFileFormat.SearchEndDate;
        this.FileFormatCode = systemFileFormat.FileFormatCode;
        this.FileNameFormat = systemFileFormat.FileNameFormat;
        this.FileFormatType = systemFileFormat.FileFormatType;
        this.FileFormatTypeId = systemFileFormat.FileFormatTypeId;
        this.FileFormatTypeName = systemFileFormat.FileFormatTypeName;
        this.FileDirectionType = systemFileFormat.FileDirectionType;
        this.FileDirectionTypeId = systemFileFormat.FileDirectionTypeId;
        this.FileDirectionTypeName = systemFileFormat.FileDirectionTypeName;
        this.images = systemFileFormat.images || [];
    }
}
