import { NgModule } from "@angular/core";
import { TokenizeCardModule } from "./tokenizeCardNumber/tokenizeCardNumber.module";
import { UtilitiesModule } from "./utility/utility.module";
import { XorModule } from "./xor/xor.module";
import { TripleDesModule } from "./tripleDes/tripleDes.module";
import { AesModule } from "./aes/aes.module";
import { KcvModule } from "./generateKcv/generateKcv.module";
import { DataConversionModule } from "./dataConversion/dataConversion.module";

@NgModule({
    imports: [
        UtilitiesModule,
        TokenizeCardModule,
        XorModule,
        TripleDesModule,
        AesModule,
        KcvModule,
        DataConversionModule,
    ],
})
export class UtilityModule {}
