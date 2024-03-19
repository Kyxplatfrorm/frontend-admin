import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Menu } from "../menus/menus.model";
import { MenusService } from "../menus/menus.service";
import AddAlertSubMenu from "./AddAlertSubMenu";
import { SubMenuFormDialogComponent } from "./subMenuForm/subMenuForm.component";
import SubMenuDataSource from "./subMenu.datasource";
import { SubMenuService } from "./subMenu.service";
import UpdateAlertSubMenu from "./updateAlertSubMenu";
import { ParentMenuEntity } from "app/ui/menuDefinition";
import { MenuProductService } from "../menuProduct/menuProduct.service";

@Component({
    selector: "subMenu",
    templateUrl: "./subMenu.component.html",
    styleUrls: ["./subMenu.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SubMenuComponent {
    subMenuDataSource: SubMenuDataSource | null;
    dialogRef: any;
    menu: Menu;
    pageType: string;
    subMenuForm: FormGroup;
    displayedColumns = [
        "MenuOrder",
        "MenuCode",
        "MenuName",
        "TranslateKey",
        "MenuIcon",
        "MenuUrl",
        "ControllerName",
        "RelatedControllerName",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true })
    subMenuPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    subMenuSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    parentMenu: ParentMenuEntity[];
    menuModuleId: number;
    menusModuleId: number;
    parentMenuModuleId: number;

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
        private menusService: MenusService,
        private subMenuService: SubMenuService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private translate: TranslateService,
        private router: Router,
        private addAlertSubMenu: AddAlertSubMenu,
        private updateAlertSubMenu: UpdateAlertSubMenu,
        private cdr: ChangeDetectorRef,
        private menuProductService: MenuProductService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.menu = new Menu();
        this._unsubscribeAll = new Subject();
        this.menuModuleId = menusService.GetSelectedModuleId();
        this.menusModuleId = menuProductService.GetSelectedMenuProductId();
        this.parentMenuModuleId = this.menusModuleId;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.subMenuService.GetParentMenus(this.menuModuleId).then(() => {
            this.parentMenu =
                this.subMenuService.parentMenuApiResponse.ParameterList;
        });
        this.subMenuDataSource = new SubMenuDataSource(
            this.subMenuService,
            this.subMenuPaginator,
            this.subMenuSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.subMenuDataSource) {
                    return;
                }
                this.subMenuDataSource.filter = this.filter.nativeElement.value;
            });

        this.subMenuService.onSubMenuChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((menu) => {
                if (menu) {
                    this.menu = new Menu(menu);
                    this.pageType = "edit";
                    this.subMenuService.subMenuList = menu.SubMenuList;
                } else {
                    this.pageType = "new";
                    this.menu = new Menu();
                    this.subMenuService.subMenuList = menu.SubMenuList;
                }
                this.subMenuForm = this.createSubMenuForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    refreshSubMenuDataSource(): void {
        this.subMenuDataSource = new SubMenuDataSource(
            this.subMenuService,
            this.subMenuPaginator,
            this.subMenuSort
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createSubMenuForm
     *
     * @returns {FormGroup}
     */
    createSubMenuForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.menu.Id],
            MenuOrder: [this.menu.MenuOrder],
            MenuCode: [this.menu.MenuCode],
            MenuName: [this.menu.MenuName],
            TranslateKey: [this.menu.TranslateKey],
            HasParentMenu: [this.menu.HasParentMenu],
            ParentMenuId: [this.menu.ParentMenuId],
        });
    }

    /**
     * UpdateMenu
     */
    UpdateMenu(): void {
        const data = this.subMenuForm.getRawValue();
        this.subMenuService.UpdateMenu(data).then(() => {
            this.subMenuService.onSubMenuChanged.next(data);
            this.router.navigate(["System/Menu/menus"]);
            this.updateAlertSubMenu.UpdateAlertSubMenuShow();
        });
    }

    /**
     * CreateMenu
     */
    CreateMenu(): void {
        const data = this.subMenuForm.getRawValue();
        this.subMenuService.CreateMenu(data).then(() => {
            this.subMenuService.onSubMenuChanged.next(data);
            this.router.navigate(["System/Menu/menus"]);
            this.addAlertSubMenu.AddAlertSubMenuShow();
        });
    }

    /**
     * New Form
     */
    NewForm(): void {
        this.dialogRef = this._matDialog.open(SubMenuFormDialogComponent, {
            panelClass: "subMenuForm-dialog",
            data: {
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            var menuRequest = response.getRawValue();
            menuRequest.ParentMenuId = this.menu.Id;
            this.subMenuService.CreateSubMenu(menuRequest).then(() => {
                this.subMenuService.GetMenu().then(() => {
                    this.refreshSubMenuDataSource();
                });
            });
        });
    }

    /**
     * EditMenu
     *
     * @param menu
     */
    EditMenu(menu): void {
        this.dialogRef = this._matDialog.open(SubMenuFormDialogComponent, {
            panelClass: "subMenuForm-dialog",
            data: {
                menu: menu,
                action: "edit",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            var menuRequest = formData.getRawValue();
            menuRequest.ParentMenuId = this.menu.ParentMenuId;
            switch (actionType) {
                /**
                 * Save menu
                 */
                case "save":
                    this.subMenuService.UpdateSubMenu(menuRequest).then(() => {
                        this.subMenuService.GetMenu().then(() => {
                            this.refreshSubMenuDataSource();
                        });
                    });
                    break;
                /**
                 *DeleteSubMenu
                 */
                case "delete":
                    this.DeleteSubMenu(menu);
                    break;
            }
        });
    }

    /**
     * DeleteSubMenu
     */
    DeleteSubMenu(menu): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.subMenuService.DeleteSubMenu(menu).then(() => {
                    this.subMenuService.GetMenu().then(() => {
                        this.refreshSubMenuDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
