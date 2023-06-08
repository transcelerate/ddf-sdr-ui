import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, take } from 'rxjs';
import { ServiceCall } from '../../services/service-call/service-call.service';
import { CommonMethodsService } from '../../services/common-methods.service';
import { configList } from '../study-element-description/config/study-element-field-config';
import { DialogService } from '../../services/communication.service';

@Component({
  selector: 'app-version-comparison',
  templateUrl: './version-comparison.component.html',
  styleUrls: ['./version-comparison.component.scss'],
})
export class VersionComparisonComponent implements OnInit, OnDestroy {
  originalCode: string;
  editorOptions: MonacoEditorConstructionOptions;
  code: string;
  studyId: any;
  versionA: any;
  versionB: any;
  usdmVerA: any;
  usdmVerB: any;
  leftHeader: string;
  rightHeader: string;
  showheading: boolean;
  showError = false;
  studyId2: any;
  isFromCompare: boolean;
  studyOneTitle: any;
  studyTwoTitle: any;
  showExitBtn: boolean = false;
  constructor(
    private monacoLoaderService: MonacoEditorLoaderService,
    private _elementRef: ElementRef,
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private commonMethods: CommonMethodsService,
    private ds: DialogService,
    private spinner: NgxSpinnerService
  ) {
    this.ds.getExitBool.subscribe((state) => {
      if (state) {
        this.showExitBtn = state;
      }
    });
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => !!isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline',
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' }, // will inherit fontStyle from `comment` above
          ],
          colors: {
            'editor.background': '#ffffff', // code background
            'editor.foreground': '#000000', // corsour color
            'diffEditor.removedTextBackground': '#FCF55F',
            'diffEditor.insertedTextBackground': '#FCF55F',
            'editor.removedTextBackground': '#FCF55F',
            'editor.insertedTextBackground': '#FCF55F',
            //   'editor.lineHighlightBackground': '#000000',
            //   'editor.lineHighlightBorder': '#000000'
            //   'editor.lineHighlightBackground': '#9B9B9B', // line highlight colour
            //   'editorLineNumber.foreground': '#666666', // line number colour
            //   'editor.selectionBackground': '#666666', // code selection background
            //   'editor.inactiveSelectionBackground': '#7e890b'
          },
        });
      });
  }
  /**
   *getStudyElement api will be called twice for the 2 different version of the document. And get assigned to the monaco editor to the keyname
   "originalCode" for the lower version and appears on the left grid and to "code" for higer version and appears on
   the right side.
   */
  ngOnInit(): void {
    document.getElementsByTagName('h2')[0]?.classList.add('textCenter');
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        let verA = params['verA'];
        let verB = params['verB'];
        this.usdmVerA = params['usdmVerA'];
        this.usdmVerB = params['usdmVerB'];

        if (params['studyId2']) {
          this.studyId2 = params['studyId2'];
          this.versionA = verA;
          this.versionB = verB;
          this.isFromCompare = true;
          this.studyOneTitle = params['studyOneTitle'];
          this.studyTwoTitle = params['studyTwoTitle'];
        } else {
          this.versionA = Math.min(verA, verB).toString();
          this.versionB = Math.max(verA, verB).toString();
          if (this.versionA !== verA) {
            this.usdmVerA = params['usdmVerB'];
            this.usdmVerB = params['usdmVerA'];
          }

          this.studyId2 = this.studyId;
          this.isFromCompare = false;
        }
      }
    });
    this.editorOptions = {
      theme: 'myCustomTheme',
      language: 'xml',
      scrollbar: {
        // useShadows: false,
        // verticalHasArrows: true,
        // horizontalHasArrows: true,
        // set scrollbar hidden
        vertical: 'visible',
        horizontal: 'visible',
        handleMouseWheel: true,

        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 17,
        arrowSize: 30,
      },
    };
    this.spinner.show();
    this.commonMethods.getStudyLink({
      studyId: this.studyId,
      version: this.versionA,
      linkName: configList.STUDY_DEFINITION_LINK,
      callback: (url: any) => this.getStudyUsingLinks(url),
      errorCallback: (err: any) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
  }

  getStudyUsingLinks(url: any) {
    this.serviceCall
      // .getStudyElement(this.studyId, this.versionA)
      .getStudyElementWithVersion(this.usdmVerA, url)
      .subscribe({
        next: (studyDefinition: any) => {
          //this.leftHeader = versionA.auditTrail.SDRUploadVersion + '-' + moment(versionA.auditTrail.entryDateTime).format("DD/MM/YYYY");
          this.leftHeader =
            ' Version# ' +
            studyDefinition.auditTrail.SDRUploadVersion +
            '(Modified On:' +
            moment
              .utc(studyDefinition.auditTrail.entryDateTime)
              .local()
              .format('YYYY-MM-DD HH:mm:ss') +
            ')';
          if (this.usdmVerA === '1.0' || this.usdmVerA === '1.9') {
            this.originalCode = JSON.stringify(
              studyDefinition.clinicalStudy,
              null,
              '\t'
            );
          } else {
            this.originalCode = JSON.stringify(
              studyDefinition.study,
              null,
              '\t'
            );
          }

          this.commonMethods.getStudyLink({
            studyId: this.studyId2,
            version: this.versionB,
            linkName: configList.STUDY_DEFINITION_LINK,
            callback: (url: any) => this.getStudy2UsingLinks(url),
            errorCallback: (err: any) => {
              this.showError = true;
              this.spinner.hide();
            },
          });
        },
        error: (error) => {
          this.showError = true;
          this.spinner.hide();
        },
      });
  }

  getStudy2UsingLinks(url: any) {
    this.serviceCall
      //.getStudyElement(this.studyId2, this.versionB)
      .getStudyElementWithVersion(this.usdmVerB, url)
      .subscribe({
        next: (studyDefinition: any) => {
          this.spinner.hide();
          this.rightHeader =
            ' Version# ' +
            studyDefinition.auditTrail.SDRUploadVersion +
            '(Modified On:' +
            moment
              .utc(studyDefinition.auditTrail.entryDateTime)
              .local()
              .format('YYYY-MM-DD HH:mm:ss') +
            ')';
          if (this.isFromCompare) {
            this.leftHeader = 'Study - ' + this.studyOneTitle + this.leftHeader;
            this.rightHeader =
              'Study - ' + this.studyTwoTitle + this.rightHeader;
          }
          if (this.usdmVerB === '1.0' || this.usdmVerB === '1.9') {
            this.code = JSON.stringify(
              studyDefinition.clinicalStudy,
              null,
              '\t'
            );
          } else {
            this.code = JSON.stringify(studyDefinition.study, null, '\t');
          }
          var interval = setInterval(() => {
            if (
              this._elementRef.nativeElement.getElementsByClassName(
                'editor original'
              ).length > 0 &&
              !this.showheading
            ) {
              var div = document.createElement('div');
              div.className = 'editorHeading';
              div.textContent = this.leftHeader;

              var div1 = document.createElement('div');
              div1.className = 'editorHeading';
              div1.textContent = this.rightHeader;

              this._elementRef.nativeElement
                .getElementsByClassName('editor original')[0]
                .prepend(div);

              this._elementRef.nativeElement
                .getElementsByClassName('editor modified')[0]
                .prepend(div1);
              this.showheading = true;
              clearInterval(interval);
            } else {
              this.showheading = false;
            }
          }, 1000);
        },
        error: (error) => {
          this.spinner.hide();
          this.showError = true;
        },
      });
  }

  ngOnDestroy() {
    if (document.getElementsByTagName('h2').length > 0) {
      document.getElementsByTagName('h2')[0].classList.remove('textCenter');
    }
    this.ds.sendExitBool(false);
  }

  backToCompare() {
    this.ds.sendClearBool(true);
    this.router.navigate(['/comparison']);
  }
}
