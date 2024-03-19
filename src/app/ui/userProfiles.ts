export class UserProfilesApiResponse {
    IsSucceeded?: boolean;
    ErrorCode?: number;
    ErrorDescription?: string;
    ProcessDateTime?: Date;
    UserProfileList?: UserProfileEntity[];
}

export class UserProfileEntity {
    Id?: number;
    IsRecordValid?: boolean;
    RecordVersion?: number;
    InsertDateTime?: any;
    InsertUserId?: number;
    UpdateDateTime?: any;
    UpdateUserId?: any;
    ForceTwoFactorAuth?: boolean;
    ProfileCode?: string;
    HasSessionTimeOut?: boolean;
    SessionTimeInMinutes?: number;
    MinimumPasswordLenght?: number;
    PasswordNumericLenght?: number;
    PasswordBigLetterLength?: number;
    PasswordSmallLetterLength?: number;
    PasswordSpecialCharacterLength?: number;
    PasswordRenewPeriod?: number;
    LastPasswordCheckCount?: number;
    TemporarilyPasswordValidHours?: number;
}
