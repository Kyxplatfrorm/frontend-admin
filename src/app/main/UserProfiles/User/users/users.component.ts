import { Component } from "@angular/core";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { User } from "./users.model";
import { SearchUserService } from "../searchUser/searchUser.service";
import {
    CustomerTypeEntity,
    UserStatusEntity,
    UserTypeEntity,
} from "app/ui/userDefinition";
import { TenantDefinitionEntity } from "app/ui/tenant";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { UsersService } from "./users.service";
import { Router } from "@angular/router";

@Component({
    selector: "users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
    user: User;
    usersForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    userTypeList: UserTypeEntity[];
    userStatusList: UserStatusEntity[];
    customerTypeList: CustomerTypeEntity[];
    tenantList: TenantDefinitionEntity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private searchUserService: SearchUserService,
        private usersService: UsersService,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.user = new User();
        this._unsubscribeAll = new Subject();
        this.user.InsertBeginDateTime = new Date();
    }

    ngOnInit(): void {
        this.usersService.GetUserTypes().then(() => {
            this.userTypeList =
                this.usersService.userTypeResponse.ParameterList;
        });
        this.usersService.GetUserStatus().then(() => {
            this.userStatusList =
                this.usersService.userStatusResponse.ParameterList;
        });
        this.usersService.GetCustomerType().then(() => {
            this.customerTypeList =
                this.usersService.customerTypeResponse.ParameterList;
        });
        this.usersService.GetTenants().then(() => {
            this.tenantList =
                this.usersService.tenantDefApiResponse.TenantDefinitionList;
        });
        this.usersForm = this.createUserForm();
    }

    /**
     *  createUserForm
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup {
        return this._formBuilder.group({
            HasApiKey: [this.user.HasApiKey],
            UserTypeId: [this.user.UserTypeId],
            UserName: [this.user.UserName],
            UserFullName: [this.user.UserFullName],
            SelectedUserStatus: [this.user.SelectedUserStatus],
            TenantId: [this.user.TenantId],
            CustomerTypeId: [this.user.CustomerTypeId],
            CustomerId: [this.user.CustomerId],
            InsertBeginDateTime: [this.user.InsertBeginDateTime],
            InsertEndDateTime: [this.user.InsertEndDateTime],
            UpdateBeginDateTime: [this.user.UpdateBeginDateTime],
            UpdateEndDateTime: [this.user.UpdateEndDateTime],
            PhoneNumber: [this.user.PhoneNumber],
            Email: [this.user.Email],
            CompanyId: [this.user.CompanyId],
        });
    }
    ClearButton() {
        this.usersForm.controls["UserTypeId"].reset();
        this.usersForm.controls["UserName"].reset();
        this.usersForm.controls["UserFullName"].reset();
        this.usersForm.controls["SelectedUserStatus"].reset();
        this.usersForm.controls["CustomerTypeId"].reset();
        this.usersForm.controls["CustomerId"].reset();
        this.usersForm.controls["InsertBeginDateTime"].reset();
        this.usersForm.controls["InsertEndDateTime"].reset();
        this.usersForm.controls["UpdateBeginDateTime"].reset();
        this.usersForm.controls["UpdateEndDateTime"].reset();
        this.usersForm.controls["TenantId"].reset();
        this.usersForm.controls["HasApiKey"].reset();
        this.usersForm.controls["PhoneNumber"].reset();
        this.usersForm.controls["Email"].reset();
        this.usersForm.controls["CompanyId"].reset();
    }

    /**
     * SearchUser
     */
    SearchUser(): void {
        const data = this.usersForm.getRawValue();
        this.searchUserService.SearchUser(data).then(() => {
            this.searchUserService.onSearchUserChanged.next(data);
            this.router.navigate(["/UserProfiles/User/searchUser"]);
        });
    }

    onDateInsertBeginChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );

        this.user.InsertBeginDateTime = utcDate;
        const ınsertBeginDateTime = new Date(this.user.InsertBeginDateTime);
        const ınsertBeginDateTimeString = ınsertBeginDateTime.toISOString();
    }

    onDateInsertEndChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );

        this.user.InsertEndDateTime = utcDate;
        const ınsertEndDateTime = new Date(this.user.InsertEndDateTime);
        const ınsertEndDateTimeString = ınsertEndDateTime.toISOString();
    }
    onDateUpdateBeginChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );

        this.user.UpdateBeginDateTime = utcDate;
        const updateBeginDateTime = new Date(this.user.UpdateBeginDateTime);
        const updateBeginDateTimeString = updateBeginDateTime.toISOString();
    }

    onDateUpdateEndChange(event: MatDatepickerInputEvent<Date>) {
        const selectedDate = new Date(event.value);
        const utcDate = new Date(
            Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedDate.getHours(),
                selectedDate.getMinutes(),
                selectedDate.getSeconds()
            )
        );

        this.user.UpdateEndDateTime = utcDate;
        const updateEndDateTime = new Date(this.user.UpdateEndDateTime);
        const updateEndDateTimeString = updateEndDateTime.toISOString();
    }
}
