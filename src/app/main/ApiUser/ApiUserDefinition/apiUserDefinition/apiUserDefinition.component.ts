import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { ApiUser } from "../apiUserDefinitions/apiUserDefinitions.model";
import { ApiUserDefinitionService } from "./apiUserDefinition.service";
import UpdateAlertApiUserDefinition from "./updateApiUserDefinitionAlert";
import AddAlertApiUserDefinition from "./addApiUserDefinitionAlert";
import { ApiUserDefinitionsService } from "../apiUserDefinitions/apiUserDefinitions.service";
import { SearchApiUserDefinitionService } from "../searchApiUserDefinition/searchApiUserDefinition.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    ApiPermissionProfilesEntity,
    UserStatusEntity,
} from "app/ui/apiUserDefinition";
import { UserTypeEntity } from "app/ui/userDefinition";
import { TenantDefinitionEntity } from "app/ui/tenant";

@Component({
    selector: "apiUserDefinition",
    templateUrl: "./apiUserDefinition.component.html",
    styleUrls: ["./apiUserDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ApiUserDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    apiUser: ApiUser;
    pageType: string;
    apiUserDefinitionForm: FormGroup;
    userStatusList: UserStatusEntity[];
    apiPermissionProfiles: ApiPermissionProfilesEntity[];
    tenantList: TenantDefinitionEntity[];
    userTypeList: UserTypeEntity[];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    routeParams: any;
    permittedIpAddressList: string[] = [];
    apiKey: boolean = false;
    secretKey: boolean = false;

    /**
     * Constructor
     *
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private apiUserDefinitionService: ApiUserDefinitionService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private updateAlertApiUserDefinition: UpdateAlertApiUserDefinition,
        private addAlertApiUserDefinition: AddAlertApiUserDefinition,
        private cdr: ChangeDetectorRef,
        private apiUserDefinitionsService: ApiUserDefinitionsService,
        private searchApiUserDefinitionService: SearchApiUserDefinitionService,
        _router: ActivatedRoute,
        private _matDialog: MatDialog
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.apiUser = new ApiUser();
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.apiUserDefinitionForm = this._formBuilder.group({
            ApiKey: ["", Validators.required],
            SecretKey: ["", [Validators.required, confirmKeyValidator]],
        });

        this.apiUserDefinitionForm
            .get("ApiKey")
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.apiUserDefinitionForm
                    .get("SecretKey")
                    .updateValueAndValidity();
            });
        this.apiUserDefinitionsService.GetUserStatus().then(() => {
            this.userStatusList =
                this.apiUserDefinitionsService.userStatusResponse.ParameterList;
        });
        this.apiUserDefinitionsService.GetApiPermissionProfiles().then(() => {
            this.apiPermissionProfiles =
                this.apiUserDefinitionsService.apiPermissionProfilesApiResponse.ParameterList;
        });
        this.apiUserDefinitionsService.GetUserTypes().then(() => {
            this.userTypeList =
                this.apiUserDefinitionsService.userTypeResponse.ParameterList;
        });

        this.apiUserDefinitionsService.GetTenants().then(() => {
            this.tenantList =
                this.apiUserDefinitionsService.tenantDefApiResponse.TenantDefinitionList;
        });

        this.apiUserDefinitionService.onApiUserDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((apiUser) => {
                if (apiUser) {
                    this.apiUser = new ApiUser(apiUser);
                    this.pageType = "edit";

                    if (this.apiUser.PermittedIpAddressList != undefined) {
                        this.apiUser.PermittedIpAddressList.forEach(
                            (ipAddress) => {
                                this.addIpAddress(ipAddress);
                            }
                        );
                    }
                } else {
                    this.pageType = "new";
                    this.apiUser = new ApiUser();
                    if (this.apiUser.PermittedIpAddressList != undefined) {
                        this.apiUser.PermittedIpAddressList.forEach(
                            (ipAddress) => {
                                this.addIpAddress(ipAddress);
                            }
                        );
                    }
                    this.apiUser.CustomerId = 0;
                    this.apiUser.CustomerType = "";
                }
                this.apiUserDefinitionForm = this.createApiUserForm();
            });
    }

    visibilityApiKey() {
        this.apiKey = !this.apiKey;
    }
    visibilitySecretKey() {
        this.secretKey = !this.secretKey;
    }

    addIpAddress(ipAddress: string): void {
        if (ipAddress && ipAddress.trim() !== "") {
            const cleanedIpAddress = ipAddress.trim();
            if (!this.permittedIpAddressList.includes(cleanedIpAddress)) {
                this.permittedIpAddressList.push(cleanedIpAddress);
            }
        }
    }

    clearIpAddress(index: number): void {
        if (index >= 0 && index < this.permittedIpAddressList.length) {
            this.permittedIpAddressList.splice(index, 1);
        }
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createApiUserForm
     *
     * @returns {FormGroup}
     */
    createApiUserForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.apiUser.Id],
            UserName: [this.apiUser.UserName],
            UserFullName: [this.apiUser.UserFullName],
            CustomerType: [this.apiUser.CustomerType],
            UserStatusId: [this.apiUser.UserStatusId],
            UtcTimeOffset: [this.apiUser.UtcTimeOffset],
            WrongAttemptCount: [this.apiUser.WrongAttemptCount],
            Email: [this.apiUser.Email],
            HasIpRestriction: [this.apiUser.HasIpRestriction],
            PermittedIpAddressList: [this.apiUser.PermittedIpAddressList],
            CustomerId: [this.apiUser.CustomerId],
            CompanyId: [this.apiUser.CompanyId],
            CompanyName: [this.apiUser.CompanyName],
            HasApiPermissionProfile: [this.apiUser.HasApiPermissionProfile],
            ApiPermissionProfileId: [this.apiUser.ApiPermissionProfileId],
            HasExpiryDate: [this.apiUser.HasExpiryDate],
            StartDateTime: [this.apiUser.StartDateTime],
            EndDateTime: [this.apiUser.EndDateTime],
            IpAddress: [this.apiUser.IpAddress],
            ApiKey: [this.apiUser.ApiKey],
            SecretKey: [this.apiUser.SecretKey],
            UserTypeId: [this.apiUser.UserTypeId],
            TenantId: [this.apiUser.TenantId],
        });
    }

    formatIpAddress(event: any): void {
        const inputElement = event.target;
        let inputValue = inputElement.value.replace(/[^\d.]/g, "");
        inputValue = inputValue.substring(0, 15);
        const segments = inputValue.split(".");
        inputValue = segments
            .map((segment) => {
                if (segment.length > 3) {
                    return segment.substring(0, 3);
                }
                return segment;
            })
            .join(".");

        inputElement.value = inputValue;
        this.apiUserDefinitionForm.patchValue({ IpAddress: inputValue });
    }

    /**
     * CreateApiUserDefinition
     */
    CreateApiUserDefinition(): void {
        const data = this.apiUserDefinitionForm.getRawValue();
        data.PermittedIpAddressList = this.permittedIpAddressList;
        this.apiUserDefinitionService.CreateApiUser(data).then(() => {
            this.apiUserDefinitionService.onApiUserDefinitionChanged.next(data);
            this.router.navigate([
                "ApiUser/ApiUserDefinition/searchApiUserDefinition",
            ]);
            this.addAlertApiUserDefinition.AddAlertApiUserDefinitionShow();
            this.searchApiUserDefinitionService.SearchApiUser(this.apiUser);
        });
    }

    /**
     * UpdateApiUserDefinition
     */
    UpdateApiUserDefinition(): void {
        const data = this.apiUserDefinitionForm.getRawValue();
        data.PermittedIpAddressList = this.permittedIpAddressList;
        this.apiUserDefinitionService.UpdateApiUser(data).then(() => {
            this.apiUserDefinitionService.onApiUserDefinitionChanged.next(data);
            this.router.navigate([
                "ApiUser/ApiUserDefinition/searchApiUserDefinition",
            ]);
            this.updateAlertApiUserDefinition.UpdateAlertApiUserDefinitionShow();
        });
    }

    onStartDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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
        this.apiUser.StartDateTime = utcDate;
        const startDateTime = new Date(this.apiUser.StartDateTime);
        const startDateTimeString = startDateTime.toISOString();
    }

    onEndDateTimeChange(event: MatDatepickerInputEvent<Date>) {
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

        this.apiUser.EndDateTime = utcDate;
        const endDateTime = new Date(this.apiUser.EndDateTime);
        const endDateTimeString = endDateTime.toISOString();
    }
}

export const confirmKeyValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const ApiKey = control.parent.get("ApiKey");
    const SecretKey = control.parent.get("SecretKey");

    if (!ApiKey || !SecretKey) {
        return null;
    }

    if (SecretKey.value === "") {
        return null;
    }

    if (ApiKey.value === SecretKey.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
