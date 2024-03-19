export class UserProfile {
    Id: number;
    ForceTwoFactorAuth: boolean;
    ProfileCode: string;
    HasSessionTimeOut: boolean;
    InsertDateTime: any;
    UpdateDateTime: any;
    SessionTimeInMinutes: number;
    MinimumPasswordLenght: number;
    PasswordNumericLenght: number;
    PasswordBigLetterLength: number;
    PasswordSmallLetterLength: number;
    PasswordSpecialCharacterLength: number;
    PasswordRenewPeriod: number;
    LastPasswordCheckCount: number;
    TemporarilyPasswordValidHours: number;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param userprofile
     */
    constructor(userprofile?) {
        userprofile = userprofile || {};
        this.Id = userprofile.Id;
        this.TemporarilyPasswordValidHours =
            userprofile.TemporarilyPasswordValidHours;
        this.LastPasswordCheckCount = userprofile.LastPasswordCheckCount;
        this.PasswordRenewPeriod = userprofile.PasswordRenewPeriod;
        this.PasswordSpecialCharacterLength =
            userprofile.PasswordSpecialCharacterLength;
        this.PasswordSmallLetterLength = userprofile.PasswordSmallLetterLength;
        this.PasswordBigLetterLength = userprofile.PasswordBigLetterLength;
        this.PasswordNumericLenght = userprofile.PasswordNumericLenght;
        this.MinimumPasswordLenght = userprofile.MinimumPasswordLenght;
        this.SessionTimeInMinutes = userprofile.SessionTimeInMinutes;
        this.ForceTwoFactorAuth = userprofile.ForceTwoFactorAuth;
        this.ProfileCode = userprofile.ProfileCode;
        this.HasSessionTimeOut = userprofile.HasSessionTimeOut;
        this.InsertDateTime = userprofile.InsertDateTime;
        this.UpdateDateTime = userprofile.UpdateDateTime;
        this.images = userprofile.images || [];
    }
}
