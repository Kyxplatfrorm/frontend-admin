import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import MenusDataSource from "./menus.datasource";
import { MenusService } from "./menus.service";
import { ActivatedRoute } from "@angular/router";
import { MenuProductService } from "../menuProduct/menuProduct.service";

@Component({
    selector: "menus",
    templateUrl: "./menus.component.html",
    styleUrls: ["./menus.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class MenusComponent implements OnInit {
    menusDataSource: MenusDataSource | null;
    displayedColumns = [
        "Id",
        "MenuOrder",
        "MenuName",
        "ParentMenuName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    menusPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    menusSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    menuProductId: number;
    routeParams: any;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private menusService: MenusService,
        private menuProductService: MenuProductService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
        this.menuProductId = menuProductService.GetSelectedMenuProductId();
    }
    ngOnInit(): void {
        this.menusDataSource = new MenusDataSource(
            this.menusService,
            this.menusPaginator,
            this.menusSort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.menusDataSource) {
                    return;
                }
                this.menusDataSource.filter = this.filter.nativeElement.value;
            });
    }

    refreshMenuDataSource(): void {
        this.menusDataSource = new MenusDataSource(
            this.menusService,
            this.menusPaginator,
            this.menusSort
        );
    }

    /**
     * DeleteMenu
     */
    DeleteMenu(menu): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.menusService
                    .DeleteMenu(menu)

                    .then(() => {
                        this.menusService.GetMenus().then(() => {
                            this.refreshMenuDataSource();
                        });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
