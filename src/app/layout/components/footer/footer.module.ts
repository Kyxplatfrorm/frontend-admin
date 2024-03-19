import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TranslateModule } from "@ngx-translate/core";

import { FuseSharedModule } from "@fuse/shared.module";

import { FooterComponent } from "app/layout/components/footer/footer.component";

@NgModule({
    declarations: [FooterComponent],
    imports: [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        TranslateModule,

        FuseSharedModule,
    ],
    exports: [FooterComponent],
})
export class FooterModule {}
