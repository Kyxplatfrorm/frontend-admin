import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { TenantLimit } from "../../tenantLimitProfiles/tenantLimitProfiles.model";
import { TenantLimitProfilesService } from "../../tenantLimitProfiles/tenantLimitProfiles.service";
import {
    CustomerSegmentEntity,
    LimitCardTransactionGroupEntity,
} from "app/ui/tenantLimitProfile";

@Component({
    selector: "tenantLimitProfileForm-dialog",
    templateUrl: "./tenantLimitProfileForm.component.html",
    styleUrls: ["./tenantLimitProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TenantLimitProfileFormDialogComponent {
    action: string;
    tenantLimit: TenantLimit;
    tenantLimitProfileForm: FormGroup;
    dialogTitle: string;
    limitCardTransaction: LimitCardTransactionGroupEntity[];
    customerSegment: CustomerSegmentEntity[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<TenantLimitProfileFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TenantLimitProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private tenantLimitProfilesService: TenantLimitProfilesService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.action = _data.action;
        var popUpHeaderTextTenantLimitProfile = "";
        if (this.action === "edit") {
            popUpHeaderTextTenantLimitProfile = "EDITPROFILE";
            this.tenantLimit = _data.tenantLimit;
        } else {
            popUpHeaderTextTenantLimitProfile = "NEWPROFILE";
            this.tenantLimit = new TenantLimit({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextTenantLimitProfile)
            .subscribe((x) => (this.dialogTitle = x));
        this.tenantLimitProfileForm = this.createTenantLimitProfileForm();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantLimitProfilesService.GetCardTransactionGroup().then(() => {
            this.limitCardTransaction =
                this.tenantLimitProfilesService.limitCardTransactionGroupApiResponse.ParameterList;
        });
    }

    /**
     * createTenantLimitProfileForm
     *
     * @returns {FormGroup}
     */
    createTenantLimitProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantLimit.Id],
            TransactionGroupId: [this.tenantLimit.TransactionGroupId],
            ProfileId: [this.tenantLimit.ProfileId],
            HasOneTimeMaxAmount: [this.tenantLimit.HasOneTimeMaxAmount],
            OneTimeMaxAmount: [this.tenantLimit.OneTimeMaxAmount],
            HasDailyLimitAmount: [this.tenantLimit.HasDailyLimitAmount],
            DailyLimitAmount: [this.tenantLimit.DailyLimitAmount],
            HasDailyLimitCount: [this.tenantLimit.HasDailyLimitCount],
            DailyLimitCount: [this.tenantLimit.DailyLimitCount],
            HasWeeklyLimitAmount: [this.tenantLimit.HasWeeklyLimitAmount],
            WeeklyLimitAmount: [this.tenantLimit.WeeklyLimitAmount],
            HasWeeklyLimitCount: [this.tenantLimit.HasWeeklyLimitCount],
            WeeklyLimitCount: [this.tenantLimit.WeeklyLimitCount],
            HasMonthlyLimitAmount: [this.tenantLimit.HasMonthlyLimitAmount],
            MonthlyLimitAmount: [this.tenantLimit.MonthlyLimitAmount],
            HasMonthlyLimitCount: [this.tenantLimit.HasMonthlyLimitCount],
            MonthlyLimitCount: [this.tenantLimit.MonthlyLimitCount],
            HasYearlyLimitAmount: [this.tenantLimit.HasYearlyLimitAmount],
            YearlyLimitAmount: [this.tenantLimit.YearlyLimitAmount],
            HasYearlyLimitCount: [this.tenantLimit.HasYearlyLimitCount],
            YearlyLimitCount: [this.tenantLimit.YearlyLimitCount],
            TransactionGroupName: [this.tenantLimit.TransactionGroupName],
            TransactionGroup: [this.tenantLimit.TransactionGroup],
        });
    }
}
