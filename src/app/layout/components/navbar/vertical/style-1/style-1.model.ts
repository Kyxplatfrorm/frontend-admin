export class CurrentUserLogin {
    Username: string;
    Password: string;
    Email: string;
    UserFullName: string;
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param currentUserLogin
     */
    constructor(currentUserLogin?) {
        currentUserLogin = currentUserLogin || {};
        this.Username = currentUserLogin.Username;
        this.Email = currentUserLogin.Email;
        this.Password = currentUserLogin.Password;
        this.UserFullName = currentUserLogin.UserFullName;
        this.images = currentUserLogin.images || [];
    }
}
