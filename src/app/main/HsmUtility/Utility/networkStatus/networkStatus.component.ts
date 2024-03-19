import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialogRef } from "@angular/material/dialog";
import { AlertSnackBar } from "app/_helpers/AlertSnackbar";
import { NetWorkStatus } from "./networkStatus.model";
import { NetworkStatusService } from "./networkStatus.service";

@Component({
    selector: "networkStatus",
    templateUrl: "./networkStatus.component.html",
    styleUrls: ["./networkStatus.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class NetWorkStatusComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    networkStatus: NetWorkStatus;
    pageType: string;
    visible: boolean = false;
    networkStatusForm: FormGroup;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private networkStatusService: NetworkStatusService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.networkStatusService.onNetworkStatusChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((networkStatus) => {
                this.networkStatus = new NetWorkStatus(networkStatus);
                this.networkStatusForm = this.createNetWorkStatusForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createNetWorkStatusForm
     *
     * @returns {FormGroup}
     */
    createNetWorkStatusForm(): FormGroup {
        return this._formBuilder.group({
            LmkType: [this.networkStatus.LmkType],
            HsmErrorCode: [this.networkStatus.HsmErrorCode],
            HsmErrorDescription: [this.networkStatus.HsmErrorDescription],
        });
    }

    /**
     * NetWorkStatusButton
     */
    NetWorkStatusButton(): void {
        const data = this.networkStatusForm.getRawValue();
        if (
            data.LmkType === undefined ||
            data.LmkType === "" ||
            data.LmkType === null
        ) {
            this.alertMessage.AlertShow();
            return;
        }
        this.networkStatusService.NetworkStatus(data).then(() => {
            this.networkStatusService.onNetworkStatusChanged.next(data);
            this.generateHsmErrorCode = this.networkStatusService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.networkStatusService.hsmErrorDescription;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.networkStatusForm.reset();
    }
}
