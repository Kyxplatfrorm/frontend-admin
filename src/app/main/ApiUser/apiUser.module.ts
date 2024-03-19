import { NgModule } from "@angular/core";
import { ApiLimitProfilesModule } from "./ApiLimitProfile/apiLimitProfiles/apiLimitProfiles.module";
import { ApiLimitProfileModule } from "./ApiLimitProfile/apiLimitProfile/apiLimitProfile.module";
import { ApiPermissionProfilesModule } from "./ApiPermissionProfile/apiPermissionProfiles/apiPermissionProfiles.module";
import { ApiPermissionProfileModule } from "./ApiPermissionProfile/apiPermissionProfile/apiPermissionProfile.module";
import { ApiUserDefinitionsModule } from "./ApiUserDefinition/apiUserDefinitions/apiUserDefinitions.module";
import { ApiUserDefinitionModule } from "./ApiUserDefinition/apiUserDefinition/apiUserDefinition.module";
import { SearchApiUserDefinitionModule } from "./ApiUserDefinition/searchApiUserDefinition/searchApiUserDefinition.module";

@NgModule({
    imports: [
        ApiLimitProfilesModule,
        ApiLimitProfileModule,
        ApiPermissionProfilesModule,
        ApiPermissionProfileModule,
        ApiUserDefinitionsModule,
        ApiUserDefinitionModule,
        SearchApiUserDefinitionModule,
    ],
})
export class ApiUserModule {}
