import { FuseNavigation } from "@fuse/types";

export class AuthenticationMenuTreeApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    MenuTree?: FuseNavigation[];
}

export class ServiceApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
}
