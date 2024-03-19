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
import { SystemKey } from "../systemKeyDefinitions/systemKeyDefinitions.model";
import { KeyTypeEntity } from "app/ui/systemKeyProfile";
import { SystemKeyDefinitionService } from "./systemKeyDefinition.service";
import { SystemKeyDefinitionsService } from "../systemKeyDefinitions/systemKeyDefinitions.service";
import { SearchSystemKeyDefinitionService } from "../searchSystemDefinition/searchSystemDefinition.service";
import AddSystemKeyDefinitionAlert from "./addSystemKeyDefinition";
import UpdateSystemKeyDefinitionAlert from "./updateSystemKeyDefinition";

@Component({
    selector: "systemKeyDefinition",
    templateUrl: "./systemKeyDefinition.component.html",
    styleUrls: ["./systemKeyDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SystemKeyDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    systemKey: SystemKey;
    pageType: string;
    keyType: KeyTypeEntity[];
    systemKeyDefinitionForm: FormGroup;
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
        private systemKeyDefinitionService: SystemKeyDefinitionService,
        private systemKeyDefinitionsService: SystemKeyDefinitionsService,
        private searchSystemKeyDefinitionService: SearchSystemKeyDefinitionService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addSystemKeyDefinitionAlert: AddSystemKeyDefinitionAlert,
        private updateSystemKeyDefinitionAlert: UpdateSystemKeyDefinitionAlert,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemKey = new SystemKey();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.systemKeyDefinitionsService.GetKeyTypes().then(() => {
            this.keyType =
                this.systemKeyDefinitionsService.keyTypeApiResponse.ParameterList;
        });

        this.systemKeyDefinitionService.onSystemKeyDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((systemKey) => {
                if (systemKey) {
                    this.systemKey = new SystemKey(systemKey);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.systemKey = new SystemKey();
                }
                this.systemKeyDefinitionForm =
                    this.createSystemKeyDefinitionForm();
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
     *  createSystemKeyDefinitionForm
     *
     * @returns {FormGroup}
     */
    createSystemKeyDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.systemKey.Id],
            KeyTypeId: [this.systemKey.KeyTypeId],
            KeyCode: [this.systemKey.KeyCode],
            KeyValue: [this.systemKey.KeyValue],
            Description: [this.systemKey.Description],
            EncryptedKeySecretPassword: [
                this.systemKey.EncryptedKeySecretPassword,
            ],
        });
    }

    /**
     * CreateSystemKeyDefinition
     */
    CreateSystemKeyDefinition(): void {
        const data = this.systemKeyDefinitionForm.getRawValue();
        this.systemKeyDefinitionService
            .CreateSystemKeyDefinition(data)
            .then(() => {
                this.systemKeyDefinitionService.onSystemKeyDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/System/SystemKeyDefinition/searchSystemKeyDefinition",
                ]);
                this.searchSystemKeyDefinitionService.SearchSystemKeyDefinition(
                    this.systemKey
                );
                this.addSystemKeyDefinitionAlert.AddSystemKeyDefinitionShow();
            });
    }

    /**
     * UpdateSystemKeyDefinition
     */
    UpdateSystemKeyDefinition(): void {
        const data = this.systemKeyDefinitionForm.getRawValue();
        this.systemKeyDefinitionService
            .UpdateSystemKeyDefinition(data)
            .then(() => {
                this.systemKeyDefinitionService.onSystemKeyDefinitionChanged.next(
                    data
                );
                this.router.navigate([
                    "/System/SystemKeyDefinition/searchSystemKeyDefinition",
                ]);
                this.searchSystemKeyDefinitionService.SearchSystemKeyDefinition(
                    this.systemKey
                );
                this.updateSystemKeyDefinitionAlert.UpdateSystemKeyDefinitionAlertShow();
            });
    }
}
