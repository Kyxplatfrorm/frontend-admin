export class OtpVerifyLogin {
    Otp: string;
    OtpId: number;

    /**
     * Constructor
     *
     * @param otpVerifyLogin
     */
    constructor(otpVerifyLogin?) {
        otpVerifyLogin = otpVerifyLogin || {};
        this.Otp = otpVerifyLogin.Otp;
        this.OtpId = otpVerifyLogin.OtpId;
    }
}
