import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { TenantWebHook } from "../tenantWebHookProfiles/tenantWebHookProfiles.model";
import {
    TenantDefinitionEntity,
    WebHookTypeEntity,
} from "app/ui/tenantWebHookProfile";
import { TenantWebHookProfileService } from "./tenantWebHookProfile.service";
import { TenantWebHookProfilesService } from "../tenantWebHookProfiles/tenantWebHookProfiles.service";
import { SearchTenantWebHookProfileService } from "../searchTenantWebHookProfile/searchTenantWebHookProfile.service";
import AddTenantWebHookProfile from "./addTenantWebHookProfile";
import UpdateTenantWebHookProfileAlert from "./updateTenantWebHookProfile";

@Component({
    selector: "tenantWebHookProfile",
    templateUrl: "./tenantWebHookProfile.component.html",
    styleUrls: ["./tenantWebHookProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TenantWebHookProfileComponent implements OnInit, OnDestroy {
    dialogRef: any;
    tenantWebHook: TenantWebHook;
    pageType: string;
    webHookType: WebHookTypeEntity[];
    tenant: TenantDefinitionEntity[];
    tenantWebHookProfileForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

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
        private tenantWebHookProfileService: TenantWebHookProfileService,
        private tenantWebHookProfilesService: TenantWebHookProfilesService,
        private searchTenantWebHookProfileService: SearchTenantWebHookProfileService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addTenantWebHookProfile: AddTenantWebHookProfile,
        private updateTenantWebHookProfileAlert: UpdateTenantWebHookProfileAlert,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.tenantWebHook = new TenantWebHook();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantWebHookProfilesService.GetWebHookTypes().then(() => {
            this.webHookType =
                this.tenantWebHookProfilesService.webHookTypeApiResponse.ParameterList;
        });

        this.tenantWebHookProfilesService.GetTenants().then(() => {
            this.tenant =
                this.tenantWebHookProfilesService.tenantApiResponse.TenantDefinitionList;
        });

        this.tenantWebHookProfileService.onTenantWebHookProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tenantWebHook) => {
                if (tenantWebHook) {
                    this.tenantWebHook = new TenantWebHook(tenantWebHook);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.tenantWebHook = new TenantWebHook();
                }
                this.tenantWebHookProfileForm =
                    this.createTenantWebHookProfileForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     *  createTenantWebHookProfileForm
     *
     * @returns {FormGroup}
     */
    createTenantWebHookProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantWebHook.Id],
            TenantId: [this.tenantWebHook.TenantId],
            IsActive: [this.tenantWebHook.IsActive],
            WebHookTypeId: [this.tenantWebHook.WebHookTypeId],
            WebHookUrl: [this.tenantWebHook.WebHookUrl],
            WebHookApiPath: [this.tenantWebHook.WebHookApiPath],
            HttpHeaderApiKeyName: [this.tenantWebHook.HttpHeaderApiKeyName],
            EncryptedApiKey: [this.tenantWebHook.EncryptedApiKey],
        });
    }

    /**
     * CreateTenantWebHookProfile
     */
    CreateTenantWebHookProfile(): void {
        const data = this.tenantWebHookProfileForm.getRawValue();
        this.tenantWebHookProfileService
            .CreateTenantWebHookProfile(data)
            .then(() => {
                this.tenantWebHookProfileService.onTenantWebHookProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "/WebHook/TenantWebHookProfiles/searchTenantWebHookProfile",
                ]);
                this.searchTenantWebHookProfileService.SearchTenantWebHookProfile(
                    this.tenantWebHook
                );
                this.addTenantWebHookProfile.AddTenantWebHookProfileShow();
            });
    }

    /**
     * UpdateTenantWebHookProfile
     */
    UpdateTenantWebHookProfile(): void {
        const data = this.tenantWebHookProfileForm.getRawValue();
        this.tenantWebHookProfileService
            .UpdateTenantWebHookProfile(data)
            .then(() => {
                this.tenantWebHookProfileService.onTenantWebHookProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "/WebHook/TenantWebHookProfiles/searchTenantWebHookProfile",
                ]);
                this.searchTenantWebHookProfileService.SearchTenantWebHookProfile(
                    this.tenantWebHook
                );
                this.updateTenantWebHookProfileAlert.UpdateTenantWebHookProfileAlertShow();
            });
    }
}
