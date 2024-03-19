import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
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
import { SystemFileInformation } from "../systemFileInformations/systemFileInformations.model";
import { SystemFileInformationService } from "./systemFileInformation.service";
import { SearchSystemFileInformationService } from "../searchSystemFileInformation/searchSystemFileInformation.service";
import { SystemFileInformationsService } from "../systemFileInformations/systemFileInformations.service";
import {
    FileDirectionTypeEntity,
    FileFormatTypeEntity,
    FileSourceTypeEntity,
    FileStatusTypeEntity,
    TenantDefinitionEntity,
} from "app/ui/systemFileInformation";

@Component({
    selector: "systemFileInformation",
    templateUrl: "./systemFileInformation.component.html",
    styleUrls: ["./systemFileInformation.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SystemFileInformationComponent implements OnInit, OnDestroy {
    dialogRef: any;
    systemFileInformation: SystemFileInformation;
    pageType: string;
    systemFileInformationForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    tenant: TenantDefinitionEntity[];
    fileSourceType: FileSourceTypeEntity[];
    fileStatusType: FileStatusTypeEntity[];
    fileDirectionType: FileDirectionTypeEntity[];
    fileFormatType: FileFormatTypeEntity[];
    
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
        private systemFileInformationService: SystemFileInformationService,
        private searchSystemFileInformationService: SearchSystemFileInformationService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private systemFileInformationsService: SystemFileInformationsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemFileInformation = new SystemFileInformation();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.systemFileInformationsService.GetTenants().then(() => {
            this.tenant =
                this.systemFileInformationsService.tenantApiResponse.TenantDefinitionList;
        });

        this.systemFileInformationsService.GetFileDirectionTypes().then(() => {
            this.fileDirectionType =
                this.systemFileInformationsService.fileDirectionTypeApiResponse.ParameterList;
        });

        this.systemFileInformationsService.GetFileFormatTypes().then(() => {
            this.fileFormatType =
                this.systemFileInformationsService.fileFormatTypeApiResponse.ParameterList;
        });

        this.systemFileInformationsService.GetFileSources().then(() => {
            this.fileSourceType =
                this.systemFileInformationsService.fileSourceTypeApiResponse.ParameterList;
        });

        this.systemFileInformationsService.GetFileStatues().then(() => {
            this.fileStatusType =
                this.systemFileInformationsService.fileStatusTypeApiResponse.ParameterList;
        });
        this.systemFileInformationService.onSystemFileInformationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((systemFileInformation) => {
                this.systemFileInformation = new SystemFileInformation(
                    systemFileInformation
                );
                this.pageType = "edit";

                this.systemFileInformationForm =
                    this.createSystemFileInformationForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createSystemFileInformationForm
     *
     * @returns {FormGroup}
     */
    createSystemFileInformationForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.systemFileInformation.Id],
            TenantId: [this.systemFileInformation.TenantId],
            RejectCount: [this.systemFileInformation.RejectCount],
            RecordCount: [this.systemFileInformation.RecordCount],
            DailyFileIndex: [this.systemFileInformation.DailyFileIndex],
            FileSize: [this.systemFileInformation.FileSize],
            FileDirectionTypeId: [
                this.systemFileInformation.FileDirectionTypeId,
            ],
            FileFormatTypeId: [this.systemFileInformation.FileFormatTypeId],
            FileStatusId: [this.systemFileInformation.FileStatusId],
            FileSourceId: [this.systemFileInformation.FileSourceId],
            FileName: [this.systemFileInformation.FileName],
            FileFormatCode: [this.systemFileInformation.FileFormatCode],
            IsTenantFile: [this.systemFileInformation.IsTenantFile],
            InsertDateTime: [this.systemFileInformation.InsertDateTime],
        });
    }
}
