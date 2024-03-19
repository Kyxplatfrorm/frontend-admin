import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TenantCardAuthorization } from "../tenantCardAuthorizationProfiles/tenantCardAuthorizationProfiles.model";
import { TenantDefinitionEntity } from "app/ui/tenantCardAuthorizationProfile";
import { TenantCardAuthorizationProfilesService } from "../tenantCardAuthorizationProfiles/tenantCardAuthorizationProfiles.service";
import { TenantCardAuthorizationProfileService } from "./tenantCardAuthorizationProfile.service";
import UpdateAlertTenantCardAuthorizationProfile from "./updateTenantCardAuthorizationProfileAlert";

@Component({
    selector: "tenantCardAuthorizationProfile",
    templateUrl: "./tenantCardAuthorizationProfile.component.html",
    styleUrls: ["./tenantCardAuthorizationProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TenantCardAuthorizationComponent {
    dialogRef: any;
    tenantCardAuthorization: TenantCardAuthorization;
    pageType: string;
    tenantCardAuthorizationForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    routeParams: any;
    tenantDefinitionList: TenantDefinitionEntity[];

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
        private tenantCardAuthorizationProfilesService: TenantCardAuthorizationProfilesService,
        private tenantCardAuthorizationProfileService: TenantCardAuthorizationProfileService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private updateAlertTenantCardAuthorization: UpdateAlertTenantCardAuthorizationProfile,
        private cdr: ChangeDetectorRef,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.tenantCardAuthorization = new TenantCardAuthorization();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.tenantCardAuthorizationProfilesService.GetTenants().then(() => {
            this.tenantDefinitionList =
                this.tenantCardAuthorizationProfilesService.tenantApiResponse.TenantDefinitionList;
        });

        this.tenantCardAuthorizationProfileService.onTenantCardAuthorizationProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tenantCardAuthorization) => {
                if (tenantCardAuthorization) {
                    this.tenantCardAuthorization = new TenantCardAuthorization(
                        tenantCardAuthorization
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                }
                this.tenantCardAuthorizationForm =
                    this.createTenantCardAuthorizationForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createTenantCardAuthorizationForm
     *
     * @returns {FormGroup}
     */
    createTenantCardAuthorizationForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.tenantCardAuthorization.Id],
            TenantId: [this.tenantCardAuthorization.TenantId],
            HasExternalAuthorization: [
                this.tenantCardAuthorization.HasExternalAuthorization,
            ],
            AuthorizationUrl: [this.tenantCardAuthorization.AuthorizationUrl],
            EncryptedApiKey: [this.tenantCardAuthorization.EncryptedApiKey],
            EncryptedSecretKey: [
                this.tenantCardAuthorization.EncryptedSecretKey,
            ],
            SendDailySettlementFile: [
                this.tenantCardAuthorization.SendDailySettlementFile,
            ],
            SftpServer: [this.tenantCardAuthorization.SftpServer],
            SftpPort: [this.tenantCardAuthorization.SftpPort],
            SftpUserName: [this.tenantCardAuthorization.SftpUserName],
            SftpEncryptedPassword: [
                this.tenantCardAuthorization.SftpEncryptedPassword,
            ],
            SftpPath: [this.tenantCardAuthorization.SftpPath],
            ExportDailySettlementFileToLocalFolder: [
                this.tenantCardAuthorization
                    .ExportDailySettlementFileToLocalFolder,
            ],
            SettlementFilePath: [
                this.tenantCardAuthorization.SettlementFilePath,
            ],
        });
    }

    /**
     * UpdateTenantCardAuthorizationProfile
     */
    UpdateTenantCardAuthorizationProfile(): void {
        const data = this.tenantCardAuthorizationForm.getRawValue();
        this.tenantCardAuthorizationProfileService
            .UpdateTenantCardAuthorizationProfile(data)
            .then(() => {
                this.tenantCardAuthorizationProfileService.onTenantCardAuthorizationProfileChanged.next(
                    data
                );
                this.router.navigate([
                    "Tenants/TenantCardAuthorizationProfile/tenantCardAuthorizationProfiles",
                ]);
                this.updateAlertTenantCardAuthorization.UpdateAlertTenantCardAuthorizationProfileShow();
            });
    }
}
