import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import SearchSessionDataSource from "./searchSession.datasource";
import { SearchSessionService } from "./searchSession.service";
import { Session } from "../sessions/sessions.model";
import { SearchSessionDialogComponent } from "./searchSessionForm/searchSessionForm.component";

@Component({
    selector: "searchSession",
    templateUrl: "./searchSession.component.html",
    styleUrls: ["./searchSession.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SearchSessionComponent implements OnInit {
    searchSessionDataSource: SearchSessionDataSource | null;
    dialogRef: any;
    sessionForm: FormGroup;
    session: Session;
    displayedColumns = [
        "Id",
        "UserId",
        "SessionStatus",
        "UserName",
        "UserType",
        "Server",
        "ClientIp",
        "StartDateTime",
        "EndDatetime",
        "Buttons",
    ];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    form: FormGroup;
    visible: boolean = false;
    @ViewChild(MatPaginator, { static: true })
    searchSessionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    searchSessionSort: MatSort;
    @ViewChild("filter", { static: true })
    filter: ElementRef;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     *
     */

    constructor(
        private searchSessionService: SearchSessionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.session = new Session();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.searchSessionDataSource = new SearchSessionDataSource(
            this.searchSessionService,
            this.searchSessionPaginator,
            this.searchSessionSort
        );
        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchSessionDataSource) {
                    return;
                }
                this.searchSessionDataSource.filter =
                    this.filter.nativeElement.value;
            });
        this.sessionForm = this.createSessionForm();
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }
    /**
     * createSessionForm
     *
     * @returns {FormGroup}
     */
    createSessionForm(): FormGroup {
        return this._formBuilder.group({
            SessionId: [this.session.Id],
            SessionStatusId: [this.session.SessionStatusId],
        });
    }

    refreshSearchSessionDataSource(): void {
        this.searchSessionDataSource = new SearchSessionDataSource(
            this.searchSessionService,
            this.searchSessionPaginator,
            this.searchSessionSort
        );
    }

    /**
     * editSearchSession
     *
     * @param session
     */
    editSearchSession(session): void {
        this.dialogRef = this._matDialog.open(SearchSessionDialogComponent, {
            panelClass: "searchSessionForm-dialog",
            data: {
                session: session,
                action: "new",
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const formData: FormGroup = response[1];
            var searchSessionRequest = formData.getRawValue();
            this.session.SessionId = searchSessionRequest.SessionId;
            this.searchSessionService
                .UpdateSessionStatus(searchSessionRequest)
                .then(() => {
                    this.searchSessionService
                        .SearchSession(this.session)
                        .then(() => {
                            this.refreshSearchSessionDataSource();
                        });
                });
        });
    }
}
