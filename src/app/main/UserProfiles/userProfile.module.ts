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
import { MatTreeModule } from "@angular/material/tree";
import { FuseWidgetModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RoleDefinitionModule } from "./Role/roleDefinition/roleDefinition.module";
import { RoleDefinitionsModule } from "./Role/roleDefinitions/roleDefinitions.module";
import { SearchSessionModule } from "./Session/searchSession/searchSession.module";
import { SessionModule } from "./Session/session/session.module";
import { SessionsModule } from "./Session/sessions/sessions.module";
import { MyProfileModule } from "./User/myProfile/myProfile.module";
import { SearchUserModule } from "./User/searchUser/searchUser.module";
import { UserModule } from "./User/user/user.module";
import { UserPasswordCountDialogModule } from "./User/user/userAlertPasswordCount/userAlertPasswordCount.module";
import { UserPasswordResetDialogModule } from "./User/user/userAlertPasswordReset/userAlertPasswordReset.module";
import { UserNewModule } from "./User/userNew/userNew.module";
import { UsersModule } from "./User/users/users.module";
import { UserDetailModule } from "./userProfileDetail/userProfileDetail.module";
import { UserProfilesModule } from "./userProfiles/userProfiles.module";
import { RoleProductsModule } from "./Role/roleProducts/roleProducts.module";
import { RoleProductModule } from "./Role/roleProduct/roleProduct.module";
import { MenusModule } from "./Menu/menus/menus.module";
import { SubMenuModule } from "./Menu/subMenu/subMenu.module";
import { MenuProductsModule } from "./Menu/menuProducts/menuProducts.module";
import { MenuProductModule } from "./Menu/menuProduct/menuProduct.module";

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
        UserProfilesModule,
        UserDetailModule,
        SessionsModule,
        SessionModule,
        SearchSessionModule,
        UsersModule,
        SearchUserModule,
        UserModule,
        UserPasswordResetDialogModule,
        UserPasswordCountDialogModule,
        UserNewModule,
        MyProfileModule,
        RoleDefinitionsModule,
        RoleDefinitionModule,
        MatTreeModule,
        RoleProductsModule,
        RoleProductModule,
        MenusModule,
        SubMenuModule,
        MenuProductsModule,
        MenuProductModule,
    ],
})
export class UserProfileModule {}
