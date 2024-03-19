import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Injectable,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject, fromEvent, ReplaySubject, Subject } from "rxjs";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { RoleDefinitionService } from "./roleDefinition.service";
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { takeUntil } from "rxjs/operators";
import { RoleDefinitionsService } from "../roleDefinitions/roleDefinitions.service";
import AddAlertRoleDefinition from "./addAlertRole";
import UpdateAlertRoleDefinition from "./updateAlertRole";
import {
    CreateRoleRequest,
    MenuListEntity,
    MenuTreeEntity,
    TenantDefinitionEntity,
    UpdateRoleRequest,
} from "app/ui/roleDefinition";
import { Role } from "../roleDefinitions/roleDefinitions.model";

@Component({
    selector: "roleDefinition",
    templateUrl: "./roleDefinition.component.html",
    styleUrls: ["./roleDefinition.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RoleDefinitionComponent {
    dialogRef: any;
    role: Role;
    pageType: string;
    roleForm: FormGroup;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    flatNodeMap = new Map<TodoItemNode, TodoItemNode>();
    nestedNodeMap = new Map<TodoItemNode, TodoItemNode>();
    selectedParent: TodoItemNode | null = null;
    newItemName = "";
    treeControl: FlatTreeControl<TodoItemNode>;
    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemNode>;
    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemNode>;
    checklistSelection = new SelectionModel<TodoItemNode>(true);
    menuTree: MenuTreeEntity[];
    menuTreeList: MenuListEntity[];
    tenantDefinition: TenantDefinitionEntity[];
    moduleId: number;

    /**
     * Constructor
     *
     *@param {ResourceDefinitionService} resourcedefinitionservice
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private cdr: ChangeDetectorRef,
        private roleDefinitionService: RoleDefinitionService,
        private roleDefinitionsService: RoleDefinitionsService,
        private _database: ChecklistDatabase,
        private addAlertRoleDefinition: AddAlertRoleDefinition,
        private updateAlertRoleDefinition: UpdateAlertRoleDefinition,
        private router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.role = new Role();
        this._unsubscribeAll = new Subject();
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren
        );
        this.treeControl = new FlatTreeControl<TodoItemNode>(
            this.getLevel,
            this.isExpandable
        );
        this.dataSource = new MatTreeFlatDataSource(
            this.treeControl,
            this.treeFlattener
        );

        _database.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });

        this.moduleId = this.roleDefinitionsService.GetSelectedModuleId();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.roleDefinitionService.onRoleDefinitionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((role) => {
                if (role) {
                    this.role = new Role(role);
                    this.pageType = "edit";
                    this.roleDefinitionService.GetMenuTree().then(() => {
                        this.menuTree =
                            this.roleDefinitionService.menuTreeApiResponse.MenuTree;

                        this._database.initialize(
                            this.menuTree,
                            this.roleDefinitionService.menuTreeApiResponse
                                .MenuList
                        );

                        for (
                            let i = 0;
                            i < this.role.SelectedMenuList.length;
                            i++
                        ) {
                            var nodes = this.treeControl.dataNodes.filter(
                                (x) => x.nodeid == this.role.SelectedMenuList[i]
                            );

                            for (let j = 0; j < nodes.length; j++) {
                                this.todoLeafItemSelectionToggle(nodes[j]);
                            }
                        }
                    });
                } else {
                    this.roleDefinitionsService.GetTenants().then(() => {
                        this.tenantDefinition =
                            this.roleDefinitionsService.tenantApiResponse.TenantDefinitionList;
                    });
                    this.pageType = "new";
                    this.role = new Role();
                    this.roleDefinitionService.GetMenuTree().then(() => {
                        this.menuTree =
                            this.roleDefinitionService.menuTreeApiResponse?.MenuTree;

                        this._database.initialize(
                            this.menuTree,
                            this.roleDefinitionService.menuTreeApiResponse
                                ?.MenuList
                        );
                    });
                }
                this.roleForm = this.createRoleForm();
            });
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * createRoleForm
     *
     * @returns {FormGroup}
     */
    createRoleForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.role.Id],
            TenantId: [this.role.TenatId],
            ProductModuleId: [this.role.ProductModuleId],
            RoleName: [this.role.RoleName],
            SelectedMenuList: [this.role.SelectedMenuList],
        });
    }
    CreateRole(): void {
        const data = this.roleForm.getRawValue();
        var createRoleRequest = new CreateRoleRequest();
        createRoleRequest.RoleName = data.RoleName;
        createRoleRequest.ProductModuleId = data.ProductModuleId;
        createRoleRequest.TenantId = data.TenantId;
        createRoleRequest.SelectedMenuList = this.getSelected();
        this.roleDefinitionService.CreateRole(createRoleRequest).then(() => {
            this.roleDefinitionService.onRoleDefinitionChanged.next(
                createRoleRequest
            );
            this.router.navigate(["/roleProduct", this.moduleId]);
            this.addAlertRoleDefinition.AddAlertRoleDefinitionShow();
            this.roleDefinitionsService.GetRoles();
        });
    }

    /**
     * UpdateRole
     */
    UpdateRole(): void {
        const data = this.roleForm.getRawValue();
        var updateRoleRequest = new UpdateRoleRequest();
        updateRoleRequest.RoleName = data.RoleName;
        updateRoleRequest.Id = data.Id;
        updateRoleRequest.SelectedMenuList = this.getSelected();
        this.roleDefinitionService.UpdateRole(updateRoleRequest).then(() => {
            this.roleDefinitionService.onRoleDefinitionChanged.next(
                updateRoleRequest
            );
            this.router.navigate(["/roleProduct", this.moduleId]);
            this.updateAlertRoleDefinition.UpdateAlertRoleDefinitionShow();
            this.roleDefinitionsService.GetRoles();
        });
    }

    /**
     * CreateRole
     */

    getSelected() {
        let selectedNodes = this.checklistSelection.selected;
        var selectedList = [];

        for (let i = 0; i < selectedNodes.length; i++) {
            selectedList[i] = selectedNodes[i].nodeid;
        }

        return selectedList;
    }

    getLevel = (node: TodoItemNode) => node.level;

    isExpandable = (node: TodoItemNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    getNodeId = (node: TodoItemNode) => node.nodeid;

    hasChild = (_: number, _nodeData: TodoItemNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: TodoItemNode) =>
        _nodeData.name === "";
    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode =
            existingNode && existingNode.nodeid === node.nodeid
                ? existingNode
                : new TodoItemNode();
        flatNode.name = node.name;
        flatNode.nodeid = node.nodeid;
        (flatNode.id = node.nodeid.toString()), (flatNode.level = level);
        flatNode.expandable = !!node.children?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected =
            descendants.length > 0 &&
            descendants.every((child) => {
                return this.checklistSelection.isSelected(child);
            });
        return descAllSelected;
    }
    descendantsPartiallySelected(node: TodoItemNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some((child) =>
            this.checklistSelection.isSelected(child)
        );
        return result && !this.descendantsAllSelected(node);
    }
    todoItemSelectionToggle(node: TodoItemNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);
        descendants.forEach((child) =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }
    todoLeafItemSelectionToggle(node: TodoItemNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }
    checkAllParentsSelection(node: TodoItemNode): void {
        let parent: TodoItemNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }
    checkRootNodeSelection(node: TodoItemNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected =
            descendants.length > 0 &&
            descendants.every((child) => {
                return this.checklistSelection.isSelected(child);
            });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }
    getParentNode(node: TodoItemNode): TodoItemNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }
    addNewItem(node: TodoItemNode) {
        const parentNode = this.flatNodeMap.get(node);
        this._database.insertItem(parentNode!, "");
        this.treeControl.expand(node);
    }
    saveNode(node: TodoItemNode, itemValue: string) {
        if (node != undefined) {
            const nestedNode = this.flatNodeMap.get(node);
            this._database.updateItem(nestedNode!, itemValue);
        }
    }
}

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children: TodoItemNode[];
    name: string;
    id: string;
    expandable: boolean;
    level: number;
    hasparentmenu: boolean;
    parentnodeid: number;
    isnode: boolean;
    nodeid: number;
    selected: boolean;
}

@Injectable()
export class ChecklistDatabase {
    menuTreeSearch: MenuTreeEntity[];
    menuListSearch: MenuListEntity[];
    todoTree: TodoItemNode[] = [];

    dataChange = new BehaviorSubject<TodoItemNode[]>([]);
    get data(): TodoItemNode[] {
        return this.dataChange.value;
    }
    constructor() {
        this.todoTree = [];
    }
    initialize(menuTree, menuList) {
        this.todoTree = [];
        this.menuTreeSearch = menuTree;
        this.menuListSearch = menuList;

        for (let i = 0; i < menuTree?.length; i++) {
            var parentNode = new TodoItemNode();
            parentNode.name = menuTree[i].MenuName;
            parentNode.id = menuTree[i].MenuCode;
            parentNode.children = null;
            parentNode.expandable = true;
            parentNode.level = menuTree[i].Id;
            parentNode.nodeid = menuTree[i].Id;
            parentNode.isnode = menuTree[i].IsNode;
            parentNode.hasparentmenu = menuTree[i].HasParentMenu;
            parentNode.parentnodeid = menuTree[i].ParentMenuId;
            parentNode.selected = menuTree[i].IsSelected;
            this.todoTree[i] = parentNode;
            this.buildFileTree(this.todoTree[i]);
            this.dataChange.next(this.todoTree);
        }
    }
    buildFileTree(parentNode: TodoItemNode) {
        var nodes = this.menuListSearch.filter(
            (x) => x.ParentMenuId == parentNode.level
        );

        for (let i = 0; i < nodes.length; i++) {
            if (parentNode.children == null) {
                parentNode.children = [];
            }

            var subMenu = new TodoItemNode();
            subMenu.name = nodes[i].MenuName;
            subMenu.id = nodes[i].MenuCode;
            subMenu.children = null;
            subMenu.expandable = true;
            subMenu.level = nodes[i].Id;
            subMenu.nodeid = nodes[i].Id;
            subMenu.isnode = !nodes[i].IsChildMenu;
            subMenu.hasparentmenu = nodes[i].HasParentMenu;
            subMenu.parentnodeid = nodes[i].ParentMenuId;
            subMenu.selected = nodes[i].IsSelected;
            parentNode.children[i] = subMenu;

            if (nodes[i].IsChildMenu === false) {
                this.buildFileTree(parentNode.children[i]);
            }
        }
    }
    insertItem(parent: TodoItemNode, name: string) {
        if (parent.children) {
            parent.children.push({ name: name } as TodoItemNode);
            this.dataChange.next(this.data);
        }
    }

    updateItem(node: TodoItemNode, name: string) {
        node.name = name;
        if (this.data != undefined) {
            this.dataChange.next(this.data);
        }
    }
}
