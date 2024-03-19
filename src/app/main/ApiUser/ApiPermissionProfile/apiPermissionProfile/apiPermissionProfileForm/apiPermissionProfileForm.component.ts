import {
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { Subject } from "rxjs";
import { ApiPermissionProfile } from "../../apiPermissionProfiles/apiPermissionProfiles.model";
import {
    ApiDefinitionEntity,
    ApiLimitProfileEntity,
    ApiPermissionProfileListEntity,
} from "app/ui/apiPermissionProfile";
import { ApiPermissionProfilesService } from "../../apiPermissionProfiles/apiPermissionProfiles.service";
import { ApiPermissionProfileService } from "../apiPermissionProfile.service";

@Component({
    selector: "apiPermissionProfileForm-dialog",
    templateUrl: "./apiPermissionProfileForm.component.html",
    styleUrls: ["./apiPermissionProfileForm.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ApiPermissionFormFormDialogComponent {
    action: string;
    apiPermissionProfile: ApiPermissionProfile;
    apiPermissionProfileForm: FormGroup;
    dialogTitle: string;
    apiDefinition: ApiDefinitionEntity[];
    apiLimitProfile: ApiLimitProfileEntity[];
    apiPermissionProfileList: ApiPermissionProfileListEntity[];
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;
    userTypeId: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ApiPermissionFormFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ApiPermissionFormFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private apiPermissionProfilesService: ApiPermissionProfilesService,
        private apiPermissionProfileService: ApiPermissionProfileService,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.apiPermissionProfile = new ApiPermissionProfile();
        this._unsubscribeAll = new Subject();
        this.action = _data.action;
        var popUpHeaderTextApiPermissionProfile = "";
        if (this.action === "edit") {
            popUpHeaderTextApiPermissionProfile = "EDITPROFILE";
            this.apiPermissionProfile = _data.apiPermissionProfile;
            const userTypeId =
                this.apiPermissionProfileService.getSelectedUserTypeId();
            this.apiPermissionProfilesService
                .GetApiDefinitions(userTypeId)
                .then(() => {
                    this.apiDefinition =
                        this.apiPermissionProfilesService.apiDefinitionApiResponse.ParameterList;
                });
        } else {
            const userTypeId =
                this.apiPermissionProfileService.getSelectedUserTypeId();
            this.apiPermissionProfilesService
                .GetApiDefinitions(userTypeId)
                .then(() => {
                    this.apiDefinition =
                        this.apiPermissionProfilesService.apiDefinitionApiResponse.ParameterList;
                });
            popUpHeaderTextApiPermissionProfile = "NEWPROFILE";
            this.apiPermissionProfile = new ApiPermissionProfile({});
        }
        this._fuseTranslationLoaderService
            .getTranslation(popUpHeaderTextApiPermissionProfile)
            .subscribe((x) => (this.dialogTitle = x));
        this.apiPermissionProfileForm = this.createApiPermissionProfileForm();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.apiPermissionProfilesService.GetApiLimitProfiles().then(() => {
            this.apiLimitProfile =
                this.apiPermissionProfilesService.apiLimitProfileApiResponse.ParameterList;
        });
    }

    /**
     * createApiPermissionProfileForm
     *
     * @returns {FormGroup}
     */
    createApiPermissionProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.apiPermissionProfile.Id],
            ProfileId: [this.apiPermissionProfile.ProfileId],
            ApiDefinitionId: [this.apiPermissionProfile.ApiDefinitionId],
            HasApiLimitProfile: [this.apiPermissionProfile.HasApiLimitProfile],
            ApiLimitProfileId: [this.apiPermissionProfile.ApiLimitProfileId],
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
}
