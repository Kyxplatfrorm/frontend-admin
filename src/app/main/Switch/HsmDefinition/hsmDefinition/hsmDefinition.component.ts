import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
import { HsmDefinition } from "../hsmDefinitions/hsmDefinitions.model";
import { HsmLmkTypeEntity, HsmTypeEntity } from "app/ui/hsmDefinition";
import { HsmDefinitionService } from "./hsmDefinition.service";
import { HsmDefinitionsService } from "../hsmDefinitions/hsmDefinitions.service";
import UpdateAlertHsmDefinition from "./updateHsmDefinitionAlert";
import AddAlertHsmDefinition from "./addHsmDefinitionAlert";

@Component({
    selector: "hsmDefinition",
    templateUrl: "./hsmDefinition.component.html",
    styleUrls: ["./hsmDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class HsmDefinitionComponent implements OnInit, OnDestroy {
    dialogRef: any;
    hsmDefinition: HsmDefinition;
    pageType: string;
    hsmDefinitionForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    hsmTypeList: HsmTypeEntity[];
    hsmLmkTypeList: HsmLmkTypeEntity[];

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
        private hsmDefinitionService: HsmDefinitionService,
        private hsmDefinitionsService: HsmDefinitionsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertHsmDefinition: AddAlertHsmDefinition,
        private updateAlertHsmDefinition: UpdateAlertHsmDefinition,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.hsmDefinition = new HsmDefinition();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.hsmDefinitionsService.GetHsmTypes().then(() => {
            this.hsmTypeList =
                this.hsmDefinitionsService.hsmTypeApiResponse.ParameterList;
        });
        this.hsmDefinitionsService.GetHsmLmkTypes().then(() => {
            this.hsmLmkTypeList =
                this.hsmDefinitionsService.hsmLmkTypeApiResponse.ParameterList;
        });
        this.hsmDefinitionService.onHsmDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((hsmDefinition) => {
                if (hsmDefinition) {
                    this.hsmDefinition = new HsmDefinition(hsmDefinition);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.hsmDefinition = new HsmDefinition();
                }
                this.hsmDefinitionForm = this.createHsmDefinitionForm();
            });
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createHsmDefinitionForm
     *
     * @returns {FormGroup}
     */
    createHsmDefinitionForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.hsmDefinition.Id],
            HsmTypeId: [this.hsmDefinition.HsmTypeId],
            LmkTypeId: [this.hsmDefinition.LmkTypeId],
            Description: [this.hsmDefinition.Description],
            HsmIpAddress: [this.hsmDefinition.HsmIpAddress],
            HsmPort: [this.hsmDefinition.HsmPort],
            PinLmkLength: [this.hsmDefinition.PinLmkLength],
        });
    }

    /**
     * UpdateHsmDefinition
     */
    UpdateHsmDefinition(): void {
        const data = this.hsmDefinitionForm.getRawValue();
        this.hsmDefinitionService.UpdateHsmDefinition(data).then(() => {
            this.hsmDefinitionService.onHsmDefinitionChanged.next(data);

            this.router.navigate(["/Switch/HsmDefinition/hsmDefinitions"]);
            this.updateAlertHsmDefinition.UpdateAlertHsmDefinitionShow();
        });
    }

    /**
     * CreateHsmDefinition
     */
    CreateHsmDefinition(): void {
        const data = this.hsmDefinitionForm.getRawValue();
        this.hsmDefinitionService.CreateHsmDefinition(data).then(() => {
            this.hsmDefinitionService.onHsmDefinitionChanged.next(data);
            this.router.navigate(["/Switch/HsmDefinition/hsmDefinitions"]);
            this.addAlertHsmDefinition.AddAlertHsmDefinitionShow();
        });
    }
}
