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
import { SendRawMessage } from "./sendRawMessage.model";
import { SendRawMessageService } from "./sendRawMessage.service";

@Component({
    selector: "sendRawMessage",
    templateUrl: "./sendRawMessage.component.html",
    styleUrls: ["./sendRawMessage.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SendRawMessageComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    sendRawMessage: SendRawMessage;
    pageType: string;
    visible: boolean = false;
    sendRawMessageForm: FormGroup;
    rawHexResponse: string;
    generateHsmErrorCode: string;
    generateHsmErrorDescription: string;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private sendRawMessageService: SendRawMessageService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private alertMessage: AlertSnackBar
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.sendRawMessageService.onSendRawMessageChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sendRawMessage) => {
                this.sendRawMessage = new SendRawMessage(sendRawMessage);
                this.sendRawMessageForm = this.createSendRawMessageForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    /**
     *  createSendRawMessageForm
     *
     * @returns {FormGroup}
     */
    createSendRawMessageForm(): FormGroup {
        return this._formBuilder.group({
            LmkType: [this.sendRawMessage.LmkType],
            HsmRawHexRequest: [this.sendRawMessage.HsmRawHexRequest],
            HsmRawHexResponse: [this.sendRawMessage.HsmRawHexResponse],
            HsmErrorCode: [this.sendRawMessage.HsmErrorCode],
            HsmErrorDescription: [this.sendRawMessage.HsmErrorDescription],
        });
    }

    /**
     * SendRawMessageButton
     */
    SendRawMessageButton(): void {
        const data = this.sendRawMessageForm.getRawValue();
        this.sendRawMessageService.SendRawMessage(data).then(() => {
            this.sendRawMessageService.onSendRawMessageChanged.next(data);
            this.generateHsmErrorCode = this.sendRawMessageService.hsmErrorCode;
            this.generateHsmErrorDescription =
                this.sendRawMessageService.hsmErrorDescription;
            this.rawHexResponse = this.sendRawMessageService.hsmRawHexResponse;
        });
    }

    /**
     * ClearButton
     */
    ClearButton(): void {
        this.sendRawMessageForm.reset();
    }
}
