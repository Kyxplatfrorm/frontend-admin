export class State {
    Id: number;
    CountryCode: number;
    StateCode: number;
    StateAlphaCode: string;
    StateName: string;

    /**
     * Constructor
     *
     * @param state
     */
    constructor(state?) {
        state = state || {};
        this.Id = state.Id;
        this.CountryCode = state.CountryCode;
        this.StateCode = state.StateCode;
        this.StateAlphaCode = state.StateAlphaCode;
        this.StateName = state.StateName;
    }
}
