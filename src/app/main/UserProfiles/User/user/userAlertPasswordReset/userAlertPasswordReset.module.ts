import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateModule } from "@ngx-translate/core";
import { UserAlertPasswordResetDialogComponent } from "./userAlertPasswordReset.component";

@NgModule({
    declarations: [UserAlertPasswordResetDialogComponent],
    imports: [MatDialogModule, MatButtonModule, TranslateModule],
    entryComponents: [FuseConfirmDialogComponent],
})
export class UserPasswordResetDialogModule {}
