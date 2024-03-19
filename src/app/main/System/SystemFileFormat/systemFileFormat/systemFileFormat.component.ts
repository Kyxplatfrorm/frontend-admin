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
import { SystemFileFormat } from "../systemFileFormats/systemFileFormats.model";
import {
    FileDirectionTypeEntity,
    FileFormatTypeEntity,
} from "app/ui/systemFileFormat";
import { SystemFileFormatService } from "./systemFileFormat.service";
import { SystemFileFormatsService } from "../systemFileFormats/systemFileFormats.service";
import { SearchSystemFileFormatService } from "../searchSystemFileFormat/searchSystemFileFormat.service";
import AddSystemFileFormatAlert from "./addSystemFileFormat";
import UpdateSystemFileFormatAlert from "./updateSystemFileFormat";

@Component({
    selector: "systemFileFormat",
    templateUrl: "./systemFileFormat.component.html",
    styleUrls: ["./systemFileFormat.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SystemFileFormatComponent implements OnInit, OnDestroy {
    dialogRef: any;
    systemFileFormat: SystemFileFormat;
    pageType: string;
    fileFormatType: FileFormatTypeEntity[];
    fileDirectionType: FileDirectionTypeEntity[];
    systemFileFormatForm: FormGroup;
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
        private systemFileFormatService: SystemFileFormatService,
        private systemFileFormatsService: SystemFileFormatsService,
        private searchSystemFileFormatService: SearchSystemFileFormatService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private addSystemFileFormatAlert: AddSystemFileFormatAlert,
        private updateSystemFileFormatAlert: UpdateSystemFileFormatAlert,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.systemFileFormat = new SystemFileFormat();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.systemFileFormatsService.GetFileDirectionTypes().then(() => {
            this.fileDirectionType =
                this.systemFileFormatsService.fileDirectionTypeApiResponse.ParameterList;
        });

        this.systemFileFormatsService.GetFileFormatTypes().then(() => {
            this.fileFormatType =
                this.systemFileFormatsService.fileFormatTypeApiResponse.ParameterList;
        });

        this.systemFileFormatService.onSystemFileFormatChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((systemFileFormat) => {
                if (systemFileFormat) {
                    this.systemFileFormat = new SystemFileFormat(
                        systemFileFormat
                    );
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.systemFileFormat = new SystemFileFormat();
                }
                this.systemFileFormatForm = this.createSystemFileFormatForm();
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
     *  createSystemFileFormatForm
     *
     * @returns {FormGroup}
     */
    createSystemFileFormatForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.systemFileFormat.Id],
            FileFormatCode: [this.systemFileFormat.FileFormatCode],
            FileNameFormat: [this.systemFileFormat.FileNameFormat],
            FileFormatTypeId: [this.systemFileFormat.FileFormatTypeId],
            Description: [this.systemFileFormat.Description],
            FileDirectionTypeId: [this.systemFileFormat.FileDirectionTypeId],
        });
    }

    /**
     * CreateSystemFileFormat
     */
    CreateSystemFileFormat(): void {
        const data = this.systemFileFormatForm.getRawValue();
        this.systemFileFormatService.CreateSystemFileFormat(data).then(() => {
            this.systemFileFormatService.onSystemFileFormatChanged.next(data);
            this.router.navigate([
                "/System/SystemFileFormat/searchSystemFileFormat",
            ]);
            this.searchSystemFileFormatService.SearchSystemFileFormat(
                this.systemFileFormat
            );
            this.addSystemFileFormatAlert.AddSystemFileFormatShow();
        });
    }

    /**
     * UpdateSystemFileFormat
     */
    UpdateSystemFileFormat(): void {
        const data = this.systemFileFormatForm.getRawValue();
        this.systemFileFormatService.UpdateSystemFileFormat(data).then(() => {
            this.systemFileFormatService.onSystemFileFormatChanged.next(data);
            this.router.navigate([
                "/System/SystemFileFormat/searchSystemFileFormat",
            ]);
            this.searchSystemFileFormatService.SearchSystemFileFormat(
                this.systemFileFormat
            );
            this.updateSystemFileFormatAlert.UpdateSystemFileFormatAlertShow();
        });
    }
}
