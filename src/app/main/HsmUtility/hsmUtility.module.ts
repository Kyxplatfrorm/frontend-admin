import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTree, MatTreeModule, MatTreeNode } from "@angular/material/tree";
import { FuseWidgetModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { GenerateCvvModule } from "./Utility/generateCvv/generateCvv.module";
import { GenerateKcvModule } from "./Utility/generateKcv/generateKcv.module";
import { GenerateKeyModule } from "./Utility/generateKey/generateKey.module";
import { EncryptDataModule } from "./Utility/encryptData/encryptData.module";
import { DecryptDataModule } from "./Utility/decryptData/decryptData.module";
import { ImportKeyModule } from "./Utility/importKey/importKey.module";
import { ExportKeyModule } from "./Utility/exportKey/exportKey.module";
import { NetWorkStatusModule } from "./Utility/networkStatus/networkStatus.module";
import { GeneratePinLmkModule } from "./Utility/generatePinLmk/generatePinLmk.module";
import { SendRawMessageModule } from "./Utility/sendRawMessage/sendRawMessage.module";
import { GenerateMacModule } from "./Utility/generateMac/generateMac.module";
import { GeneratePinChangeScriptModule } from "./Utility/generatePinChangeScript/generatePinChangeScript.module";
import { GeneratePinChangeScriptEmv4Module } from "./Utility/generatePinChangeScriptEmv4/generatePinChangeScriptEmv4.module";
import { GeneratePinUnBlockScriptModule } from "./Utility/generatePinUnBlockScript/generatePinUnBlockScript.module";
import { GeneratePinUnBlockScriptEmv4Module } from "./Utility/generatePinUnBlockScriptEmv4/generatePinUnBlockScriptEmv4.module";
import { GeneratePvvModule } from "./Utility/generatePvv/generatePvv.module";
import { GenerateTrackDataModule } from "./Utility/generateTrackData/generateTrackData.module";
import { GenerateZpkModule } from "./Utility/generateZpk/generateZpk.module";
import { ImportKeyForKeyBlockModule } from "./Utility/importKeyForKeyBlock/importKeyForKeyBlock.module";
import { ImportZpkForKeyBlockModule } from "./Utility/importZpkForKeyBlock/importZpkForKeyBlock.module";
import { TranslateKeyFromOldLmkToNewLmkModule } from "./Utility/translateKeyFromOldLmkToNewLmk/translateKeyFromOldLmkToNewLmk.module";
import { TranslateZmkFromOldLmkToNewLmkModule } from "./Utility/translateZmkFromOldLmkToNewLmk/translateZmkFromOldLmkToNewLmk.module";
import { TranslateZpkFromOldLmkToNewLmkModule } from "./Utility/translateZpkFromOldLmkToNewLmk/translateZpkFromOldLmkToNewLmk.module";
import { TranslateZpkLmkToZpkZmkModule } from "./Utility/translateZpkLmkToZpkZmk/translateZpkLmkToZpkZmk.module";
import { TranslateZpkZmkToZpkLmkModule } from "./Utility/translateZpkZmkToZpkLmk/translateZpkZmkToZpkLmk.module";
import { TranslatePinLmkToZpkModule } from "./Utility/translatePinLmkToZpk/translatePinLmkToZpk.module";
import { TranslatePinZpkToLmkModule } from "./Utility/translatePinZpkToLmk/translatePinZpkToLmk.module";
import { TranslatePinZpkToZpk2Module } from "./Utility/translatePinZpkToZpk2/translatePinZpkToZpk2.module";
import { VerifyArqcAndGenerateArpcModule } from "./Utility/verifyArqcAndGenerateArpc/verifyArqcAndGenerateArpc.module";
import { VerifyArqcAndGenerateArpcEmv4Module } from "./Utility/verifyArqcAndGenerateArpcEmv4/verifyArqcAndGenerateArpcEmv4.module";

@NgModule({
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatTreeModule,
        GenerateCvvModule,
        GenerateKcvModule,
        GenerateKeyModule,
        EncryptDataModule,
        DecryptDataModule,
        ImportKeyModule,
        ExportKeyModule,
        NetWorkStatusModule,
        GeneratePinLmkModule,
        SendRawMessageModule,
        GenerateMacModule,
        GeneratePinChangeScriptModule,
        GeneratePinChangeScriptEmv4Module,
        GeneratePinUnBlockScriptModule,
        GeneratePinUnBlockScriptEmv4Module,
        GeneratePvvModule,
        GenerateTrackDataModule,
        GenerateZpkModule,
        ImportKeyForKeyBlockModule,
        ImportZpkForKeyBlockModule,
        TranslateKeyFromOldLmkToNewLmkModule,
        TranslateZmkFromOldLmkToNewLmkModule,
        TranslateZpkFromOldLmkToNewLmkModule,
        TranslateZpkLmkToZpkZmkModule,
        TranslateZpkZmkToZpkLmkModule,
        TranslatePinLmkToZpkModule,
        TranslatePinZpkToLmkModule,
        TranslatePinZpkToZpk2Module,
        VerifyArqcAndGenerateArpcModule,
        VerifyArqcAndGenerateArpcEmv4Module,
    ],
})
export class HsmUtilityModule {}
