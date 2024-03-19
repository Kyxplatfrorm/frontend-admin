import { LogEntity } from "app/ui/applicationLog";

export class ApplicationLog {
    Id: number;
    IsRunning: boolean;
    ApplicationId: number;
    ServiceName: string;
    ServerName: string;
    ApplicationType: string;
    StartDateTime: any;
    EndDateTime: any;
    InsertDateTime: any;
    UpdateDateTime: any;
    LastLogId: number;
    ProcessId: number;
    ProcessName: string;
    FirtStartDateTime: any;
    LogList: Array<LogEntity>;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param applicationlog
     */
    constructor(applicationlog?) {
        applicationlog = applicationlog || {};
        this.Id = applicationlog.Id;
        this.IsRunning = applicationlog.IsRunning;
        this.ApplicationId = applicationlog.ApplicationId;
        this.ServiceName = applicationlog.ServiceName;
        this.ServerName = applicationlog.ServerName;
        this.ApplicationType = applicationlog.ApplicationType;
        this.StartDateTime = applicationlog.StartDateTime;
        this.EndDateTime = applicationlog.EndDateTime;
        this.InsertDateTime = applicationlog.InsertDateTime;
        this.UpdateDateTime = applicationlog.UpdateDateTime;
        this.LastLogId = applicationlog.LastLogId;
        this.ProcessId = applicationlog.ProcessId;
        this.ProcessId = applicationlog.ProcessId;
        this.ProcessName = applicationlog.ProcessName;
        this.LogList = applicationlog.LogList;
        this.FirtStartDateTime = applicationlog.FirtStartDateTime;
        this.images = applicationlog.images || [];
    }
}
