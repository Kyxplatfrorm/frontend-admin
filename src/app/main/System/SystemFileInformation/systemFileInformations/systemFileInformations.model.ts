export class SystemFileInformation {
    Id: number;
    UserId: number;
    TenantId: number;
    SearchStartDate: any;
    SearchEndDate: any;
    SearchStartTime: number;
    SearchEndTime: number;
    Description: string;
    ParameterKey: string;
    TenantName: string;
    IsTenantFile: boolean;
    InsertDate: number;
    FileSourceId: number;
    FileStatusId: number;
    FileFormatTypeId: number;
    FileDirectionTypeId: number;
    FileSize: number;
    DailyFileIndex: number;
    RecordCount: number;
    RejectCount: number;
    FileFormatCode: string;
    FileName: string;
    FileSource: string;
    FileSourceName: string;
    FileStatus: string;
    FileStatusName: string;
    FileFormatType: string;
    FileFormatTypeName: string;
    FileDirectionType: string;
    FileDirectionTypeName: string;
    InsertDateTime: any;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param systemFileInformation
     */
    constructor(systemFileInformation?) {
        systemFileInformation = systemFileInformation || {};
        this.Id = systemFileInformation.Id;
        this.InsertDateTime = systemFileInformation.InsertDateTime;
        this.Description = systemFileInformation.Description;
        this.ParameterKey = systemFileInformation.ParameterKey;
        this.TenantName = systemFileInformation.TenantName;
        this.IsTenantFile = systemFileInformation.IsTenantFile;
        this.InsertDate = systemFileInformation.InsertDate;
        this.TenantId = systemFileInformation.TenantId;
        this.FileSourceId = systemFileInformation.FileSourceId;
        this.FileStatusId = systemFileInformation.FileStatusId;
        this.FileFormatTypeId = systemFileInformation.FileFormatTypeId;
        this.FileDirectionTypeId = systemFileInformation.FileDirectionTypeId;
        this.FileSize = systemFileInformation.FileSize;
        this.DailyFileIndex = systemFileInformation.DailyFileIndex;
        this.RecordCount = systemFileInformation.RecordCount;
        this.UserId = systemFileInformation.UserId;
        this.RejectCount = systemFileInformation.RejectCount;
        this.FileFormatCode = systemFileInformation.FileFormatCode;
        this.FileName = systemFileInformation.FileName;
        this.FileSource = systemFileInformation.FileSource;
        this.FileSourceName = systemFileInformation.FileSourceName;
        this.FileStatus = systemFileInformation.FileStatus;
        this.FileStatusName = systemFileInformation.FileStatusName;
        this.FileFormatType = systemFileInformation.FileFormatType;
        this.FileFormatTypeName = systemFileInformation.FileFormatTypeName;
        this.FileDirectionType = systemFileInformation.FileDirectionType;
        this.FileDirectionTypeName =
            systemFileInformation.FileDirectionTypeName;
        this.SearchStartDate = systemFileInformation.SearchStartDate;
        this.SearchEndDate = systemFileInformation.SearchEndDate;
        this.SearchEndTime = systemFileInformation.SearchEndTime;
        this.SearchEndTime = systemFileInformation.SearchEndTime;
        this.images = systemFileInformation.images || [];
    }
}
