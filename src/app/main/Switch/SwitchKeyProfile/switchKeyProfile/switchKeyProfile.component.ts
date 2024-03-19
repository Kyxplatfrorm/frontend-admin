import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, ReplaySubject, Subject } from "rxjs";
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
import { Router } from "@angular/router";
import SwitchKeyProfileDataSource from "./switchKeyProfile.datasource";
import { SwitchKey } from "../switchKeyProfiles/switchKeyProfiles.model";
import { SwitchKeyProfilesService } from "../switchKeyProfiles/switchKeyProfiles.service";
import { SwitchKeyProfileService } from "./switchKeyProfile.service";
import AddAlertSwitchKeyProfile from "./addSwitchKeyProfileAlert";
import UpdateAlertSwitchKeyProfile from "./updateSwitchKeyProfileAlert";
import { SwitchKeyProfileFormDialogComponent } from "./switchKeyProfileForm/switchKeyProfileForm.component";

@Component({
    selector: "switchKeyProfile",
    templateUrl: "./switchKeyProfile.component.html",
    styleUrls: ["./switchKeyProfile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SwitchKeyProfileComponent {
    switchKeyProfileDataSource: SwitchKeyProfileDataSource | null;
    dialogRef: any;
    switchKey: SwitchKey;
    pageType: string;
    switchKeyProfileForm: FormGroup;
    displayedColumns = [
        "KeyIndex",
        "KeyVariant",
        "KeyType",
        "KeyLmkType",
        "KeyValue",
        "KeyCheckValue",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    switchKeyProfilePaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    switchKeyProfileSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;

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
        private switchKeyProfilesService: SwitchKeyProfilesService,
        private switchKeyProfileService: SwitchKeyProfileService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertSwitchKeyProfile: AddAlertSwitchKeyProfile,
        private updateAlertSwitchKeyProfile: UpdateAlertSwitchKeyProfile,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.switchKey = new SwitchKey();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.switchKeyProfileDataSource = new SwitchKeyProfileDataSource(
            this.switchKeyProfileService,
            this.switchKeyProfilePaginator,
            this.switchKeyProfileSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.switchKeyProfileDataSource) {
                    return;
                }
                this.switchKeyProfileDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.switchKeyProfileService.onSwitchKeyProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((switchKey) => {
                if (switchKey) {
                    this.switchKey = new SwitchKey(switchKey);
                    this.pageType = "edit";
                    this.switchKeyProfileService.detailList =
                        switchKey.DetailList;
                } else {
                    this.pageType = "new";
                    this.switchKeyProfileService.detailList =
                        switchKey.DetailList;
                }
                this.switchKeyProfileForm = this.createSwitchKeyProfileForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    refreshSwitchKeyProfileDataSource(): void {
        this.switchKeyProfileDataSource = new SwitchKeyProfileDataSource(
            this.switchKeyProfileService,
            this.switchKeyProfilePaginator,
            this.switchKeyProfileSort
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createSwitchKeyProfileForm
     *
     * @returns {FormGroup}
     */
    createSwitchKeyProfileForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.switchKey.Id],
            ProfileName: [this.switchKey.ProfileName],
        });
    }

    /**
     * UpdateSwitchKeyProfile
     */
    UpdateSwitchKeyProfile(): void {
        const data = this.switchKeyProfileForm.getRawValue();
        this.switchKeyProfileService.UpdateSwitchKeyProfile(data).then(() => {
            this.switchKeyProfileService.onSwitchKeyProfileChanged.next(data);
            this.router.navigate(["Switch/SwitchKeyProfile/switchKeyProfiles"]);
            this.updateAlertSwitchKeyProfile.UpdateAlertSwitchKeyProfileShow();
        });
    }

    /**
     * CreateSwitchKeyProfile
     */
    CreateSwitchKeyProfile(): void {
        const data = this.switchKeyProfileForm.getRawValue();
        this.switchKeyProfileService.CreateSwitchKeyProfile(data).then(() => {
            this.switchKeyProfileService.onSwitchKeyProfileChanged.next(data);
            this.router.navigate(["Switch/SwitchKeyProfile/switchKeyProfiles"]);
            this.addAlertSwitchKeyProfile.AddAlertSwitchKeyProfileShow();
        });
    }

    /**
     * New Form
     */
    newForm(): void {
        this.dialogRef = this._matDialog.open(
            SwitchKeyProfileFormDialogComponent,
            {
                panelClass: "switchKeyProfileForm-dialog",
                data: {
                    action: "new",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var switchKeyProfileRequest = response.getRawValue();
            switchKeyProfileRequest.ProfileId = this.switchKey.Id;
            this.switchKeyProfileService
                .CreateSwitchKeyProfileDetail(switchKeyProfileRequest)
                .then(() => {
                    this.switchKeyProfileService
                        .GetSwitchKeyProfile()
                        .then(() => {
                            this.refreshSwitchKeyProfileDataSource();
                        });
                });
        });
    }

    /**
     * EditSwitchKeyProfile
     *
     * @param switchKey
     */
    EditSwitchKeyProfile(switchKey): void {
        this.dialogRef = this._matDialog.open(
            SwitchKeyProfileFormDialogComponent,
            {
                panelClass: "switchKeyProfileForm-dialog",
                data: {
                    switchKey: switchKey,
                    action: "edit",
                },
            }
        );
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var switchKeyProfileRequest = formData.getRawValue();
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this.switchKeyProfileService
                        .UpdateSwitchKeyProfileDetail(switchKeyProfileRequest)
                        .then(() => {
                            this.switchKeyProfileService
                                .GetSwitchKeyProfile()
                                .then(() => {
                                    this.refreshSwitchKeyProfileDataSource();
                                });
                        });
                    break;
                /**
                 * DeleteSwitchKeyProfileDetail
                 */
                case "delete":
                    this.DeleteSwitchKeyProfileDetail(switchKey);
                    break;
            }
        });
    }

    /**
     * DeleteSwitchKeyProfileDetail
     */
    DeleteSwitchKeyProfileDetail(switchKey): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.switchKeyProfileService
                    .DeleteSwitchKeyProfileDetail(switchKey)
                    .then(() => {
                        this.switchKeyProfileService
                            .GetSwitchKeyProfile()
                            .then(() => {
                                this.refreshSwitchKeyProfileDataSource();
                            });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
