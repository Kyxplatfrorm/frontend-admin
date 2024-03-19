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
import { RoleDefinitionsService } from "./roleDefinitions.service";
import RoleDefinitionsDataSource from "./roleDefinitions.datasource";
import { ActivatedRoute } from "@angular/router";
import { Role } from "./roleDefinitions.model";
import { RoleProductService } from "../roleProduct/roleProduct.service";

@Component({
    selector: "roleDefinitions",
    templateUrl: "./roleDefinitions.component.html",
    styleUrls: ["./roleDefinitions.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleDefinitionsComponent implements OnInit {
    roleDefinitonsDataSoruce: RoleDefinitionsDataSource | null;
    displayedColumns = [
        "Id",
        "RoleName",
        "InsertDateTime",
        "UpdateDateTime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    roleDefinitionsPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    roleDefinitionsSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;
    routeParams: any;
    role: Role;
    moduleId: number;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private roleDefinitonsService: RoleDefinitionsService,
        private roleProductService: RoleProductService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        _router: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.routeParams = _router.snapshot.params;
        this.moduleId = roleProductService.GetSelectedProductId();
    }
    ngOnInit(): void {
        this.roleDefinitonsDataSoruce = new RoleDefinitionsDataSource(
            this.roleDefinitonsService,
            this.roleDefinitionsPaginator,
            this.roleDefinitionsSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.roleDefinitonsDataSoruce) {
                    return;
                }
                this.roleDefinitonsDataSoruce.filter =
                    this.filter.nativeElement.value;
            });
    }
    refreshRoleDefinitionsDataSource(): void {
        this.roleDefinitonsDataSoruce = new RoleDefinitionsDataSource(
            this.roleDefinitonsService,
            this.roleDefinitionsPaginator,
            this.roleDefinitionsSort
        );
    }
    /**
     * DeleteRole
     */
    DeleteRole(role): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage;
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.roleDefinitonsService.DeleteRole(role).then(() => {
                    this.roleDefinitonsService.GetRoles().then(() => {
                        this.refreshRoleDefinitionsDataSource();
                    });
                });
            }
            this.confirmDialogRef = null;
        });
    }
}
