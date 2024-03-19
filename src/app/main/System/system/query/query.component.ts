import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { Query } from "../querys/querys.model";
import { Router } from "@angular/router";
import { QueryService } from "./query.service";
import AddAlertQuery from "./addAlertQuery";
import UpdateAlertQuery from "./updateAlertQuery";
import { SearchQueryService } from "../searchQuery/searchQuery.service";
import { QueryTypeEntity } from "app/ui/query";

@Component({
    selector: "query",
    templateUrl: "./query.component.html",
    styleUrls: ["./query.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class QueryComponent implements OnInit, OnDestroy {
    dialogRef: any;
    query: Query;
    pageType: string;
    queryForm: FormGroup;
    queryTypeList: QueryTypeEntity[];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

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
        private queryservice: QueryService,
        private searchQueryService: SearchQueryService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private router: Router,
        private addAlertQuery: AddAlertQuery,
        private updateAlertQuery: UpdateAlertQuery
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.query = new Query();
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.searchQueryService.GetQueryTypes().then(() => {
            this.queryTypeList =
                this.searchQueryService.queryTypeResponse.ParameterList;
        });
        this.queryservice.onQueryChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((query) => {
                if (query) {
                    this.query = new Query(query);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.query = new Query();
                }
                this.queryForm = this.createQueryForm();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     *  createQueryForm
     *
     * @returns {FormGroup}
     */
    createQueryForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.query.Id],
            QueryType: [this.query.QueryType],
            QueryTypeId: [this.query.QueryTypeId],
            QueryCode: [this.query.QueryCode],
            Description: [this.query.Description],
            QueryText: [this.query.QueryText],
        });
    }

    /**
     * UpdateQuery
     */
    UpdateQuery(): void {
        const data = this.queryForm.getRawValue();
        this.queryservice.UpdateQuery(data).then(() => {
            this.queryservice.onQueryChanged.next(data);
            this.router.navigate(["/System/system/searchQuery"]);
            this.updateAlertQuery.UpdateAlertQueryShow();
            this.searchQueryService.SearchQuery(this.query);
        });
    }
    /**
     * CreateQuery
     */
    CreateQuery(): void {
        const data = this.queryForm.getRawValue();
        this.queryservice.CreateQuery(data).then(() => {
            this.queryservice.onQueryChanged.next(data);
            this.router.navigate(["/System/system/searchQuery"]);
            this.addAlertQuery.AddAlertQueryShow();
            this.searchQueryService.SearchQuery(this.query);
        });
    }
}
