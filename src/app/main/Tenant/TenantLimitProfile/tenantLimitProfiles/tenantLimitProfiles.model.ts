import { TenantLimitProfileDetailEntity } from "app/ui/tenantLimitProfile";

export class TenantLimit {
    Id: number;
    Description: string;
    InsertDateTime: any;
    UpdateDateTime: any;
    TenantId: number;
    ProfileName: string;
    ProfileId: number;
    TransactionGroup: string;
    TransactionGroupName: string;
    TransactionGroupId: number;
    HasOneTimeMaxAmount: boolean;
    OneTimeMaxAmount: number;
    HasDailytenantLimitAmount: boolean;
    DailytenantLimitAmount: number;
    HasDailytenantLimitCount: boolean;
    DailytenantLimitCount: number;
    HasWeeklytenantLimitAmount: boolean;
    WeeklytenantLimitAmount: number;
    HasWeeklytenantLimitCount: boolean;
    WeeklytenantLimitCount: number;
    HasMonthlytenantLimitAmount: boolean;
    MonthlytenantLimitAmount: number;
    HasMonthlytenantLimitCount: boolean;
    MonthlytenantLimitCount: number;
    HasYearlytenantLimitAmount: boolean;
    YearlytenantLimitAmount: number;
    HasYearlytenantLimitCount: boolean;
    YearlytenantLimitCount: number;
    CurrencyCode: string;
    CurrencyId: number;
    CustomerSegment: string;
    CustomerSegmentName: string;
    CustomerSegmentId: number;
    HasDailyLimitAmount: boolean;
    DailyLimitAmount: number;
    HasDailyLimitCount: boolean;
    DailyLimitCount: number;
    HasWeeklyLimitAmount: boolean;
    WeeklyLimitAmount: number;
    HasWeeklyLimitCount: boolean;
    WeeklyLimitCount: number;
    HasMonthlyLimitAmount: boolean;
    MonthlyLimitAmount: number;
    HasMonthlyLimitCount: boolean;
    MonthlyLimitCount: number;
    HasYearlyLimitAmount: boolean;
    YearlyLimitAmount: number;
    HasYearlyLimitCount: boolean;
    YearlyLimitCount: number;
    TenantLimitProfileDetailList: TenantLimitProfileDetailEntity[];
    images: {
        default: boolean;
        id: string;
        url: string;
        type: string;
    }[];

    /**
     * Constructor
     *
     * @param tenantLimit
     */
    constructor(tenantLimit?) {
        tenantLimit = tenantLimit || {};
        this.Id = tenantLimit.Id;
        this.TenantId = tenantLimit.TenantId;
        this.InsertDateTime = tenantLimit.InsertDateTime;
        this.UpdateDateTime = tenantLimit.UpdateDateTime;
        this.ProfileId = tenantLimit.ProfileId;
        this.TransactionGroup = tenantLimit.TransactionGroup;
        this.TransactionGroupName = tenantLimit.TransactionGroupName;
        this.TransactionGroupId = tenantLimit.TransactionGroupId;
        this.HasOneTimeMaxAmount = tenantLimit.HasOneTimeMaxAmount;
        this.OneTimeMaxAmount = tenantLimit.OneTimeMaxAmount;
        this.HasDailytenantLimitAmount = tenantLimit.HasDailytenantLimitAmount;
        this.DailytenantLimitAmount = tenantLimit.DailytenantLimitAmount;
        this.HasDailytenantLimitCount = tenantLimit.HasDailytenantLimitCount;
        this.DailytenantLimitCount = tenantLimit.DailytenantLimitCount;
        this.HasWeeklytenantLimitAmount =
            tenantLimit.HasWeeklytenantLimitAmount;
        this.WeeklytenantLimitAmount = tenantLimit.WeeklytenantLimitAmount;
        this.HasWeeklytenantLimitCount = tenantLimit.HasWeeklytenantLimitCount;
        this.ProfileName = tenantLimit.ProfileName;
        this.WeeklytenantLimitCount = tenantLimit.WeeklytenantLimitCount;
        this.HasMonthlytenantLimitAmount =
            tenantLimit.HasMonthlytenantLimitAmount;
        this.MonthlytenantLimitAmount = tenantLimit.MonthlytenantLimitAmount;
        this.HasMonthlytenantLimitCount =
            tenantLimit.HasMonthlytenantLimitCount;
        this.MonthlytenantLimitCount = tenantLimit.MonthlytenantLimitCount;
        this.HasYearlytenantLimitAmount =
            tenantLimit.HasYearlytenantLimitAmount;
        this.YearlytenantLimitAmount = tenantLimit.YearlytenantLimitAmount;
        this.HasYearlytenantLimitCount = tenantLimit.HasYearlytenantLimitCount;
        this.YearlytenantLimitCount = tenantLimit.YearlytenantLimitCount;
        this.TenantLimitProfileDetailList =
            tenantLimit.TenantLimitProfileDetailList;
        this.CurrencyCode = tenantLimit.CurrencyCode;
        this.CurrencyId = tenantLimit.CurrencyId;
        this.Description = tenantLimit.Description;
        this.CustomerSegment = tenantLimit.CustomerSegment;
        this.CustomerSegmentName = tenantLimit.CustomerSegmentName;
        this.CustomerSegmentId = tenantLimit.CustomerSegmentId;
        this.HasDailyLimitAmount = tenantLimit.HasDailyLimitAmount;
        this.DailyLimitAmount = tenantLimit.DailyLimitAmount;
        this.HasDailyLimitCount = tenantLimit.HasDailyLimitCount;
        this.DailyLimitCount = tenantLimit.DailyLimitCount;
        this.HasWeeklyLimitAmount = tenantLimit.HasWeeklyLimitAmount;
        this.WeeklyLimitAmount = tenantLimit.WeeklyLimitAmount;
        this.HasWeeklyLimitCount = tenantLimit.HasWeeklyLimitCount;
        this.WeeklyLimitCount = tenantLimit.WeeklyLimitCount;
        this.HasMonthlyLimitAmount = tenantLimit.HasMonthlyLimitAmount;
        this.MonthlyLimitAmount = tenantLimit.MonthlyLimitAmount;
        this.HasMonthlyLimitCount = tenantLimit.HasMonthlyLimitCount;
        this.MonthlyLimitCount = tenantLimit.MonthlyLimitCount;
        this.HasYearlyLimitAmount = tenantLimit.HasYearlyLimitAmount;
        this.YearlyLimitAmount = tenantLimit.YearlyLimitAmount;
        this.HasYearlyLimitCount = tenantLimit.HasYearlyLimitCount;
        this.YearlyLimitCount = tenantLimit.YearlyLimitCount;
        this.CustomerSegment = tenantLimit.CustomerSegment;
        this.CustomerSegmentName = tenantLimit.CustomerSegmentName;
        this.CustomerSegmentId = tenantLimit.CustomerSegmentId;
        this.images = tenantLimit.images || [];
    }
}
