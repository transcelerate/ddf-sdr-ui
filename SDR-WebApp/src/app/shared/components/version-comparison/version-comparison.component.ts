import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { DiffEditorModel } from 'ngx-monaco-editor';
import {
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, take } from 'rxjs';
import { ServiceCall } from '../../services/service-call/service-call.service';
@Component({
  selector: 'app-version-comparison',
  templateUrl: './version-comparison.component.html',
  styleUrls: ['./version-comparison.component.scss'],
})
export class VersionComparisonComponent implements OnInit {
  originalCode: string;
  editorOptions: MonacoEditorConstructionOptions;
  code: string;
  studyId: any;
  versionA: any;
  versionB: any;
  leftHeader: string;
  rightHeader: string;
  showheading: boolean;
  //   options = {
  //     theme: 'vs-dark',
  //     automaticLayout: true
  //   };

  constructor(
    private monacoLoaderService: MonacoEditorLoaderService,
    private _elementRef: ElementRef,
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService
  ) {
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

        //  this._elementRef.nativeElement.getElementsByClassName(
        //    'original'
        //  )[0].appendChild('<span> A >> Version 3.4');
        //  this._elementRef.nativeElement.getElementsByClassName(
        //    'modified'
        //  )[0].appendChild('<span> A >> Version 3.4');
      });
  }

  ngOnInit(): void {
    document.getElementsByTagName('h2')[0].classList.add('textCenter');
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.versionA = params['verA'];
        this.versionB = params['verB'];
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
        handleMouseWheel:true,
    
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 17,
        arrowSize: 30
      }
    };
    this.spinner.show();
    this.serviceCall
      .getStudyElement(this.studyId, Math.min(this.versionA, this.versionB))
      .subscribe({
        next: (versionA: any) => {
          //this.leftHeader = versionA.auditTrail.studyVersion + '-' + moment(versionA.auditTrail.entryDateTime).format("DD/MM/YYYY");
          this.leftHeader =
            versionA.auditTrail.studyVersion +
            '(Modified On:' +
            versionA.auditTrail.entryDateTime +
            ')';
          this.originalCode = JSON.stringify(
            versionA.clinicalStudy,
            null,
            '\t'
          );

          this.serviceCall
            .getStudyElement(
              this.studyId,
              Math.max(this.versionA, this.versionB)
            )
            .subscribe({
              next: (versionB: any) => {
                this.spinner.hide();
                this.rightHeader =
                  versionB.auditTrail.studyVersion +
                  '(Modified On:' +
                  versionB.auditTrail.entryDateTime +
                  ')';
                this.code = JSON.stringify(versionB.clinicalStudy, null, '\t');
                var interval = setInterval(() => {
                  debugger;
                  if (
                    this._elementRef.nativeElement.getElementsByClassName(
                      'editor original'
                    ).length > 0 &&
                    !this.showheading
                  ) {
                    var div = document.createElement('div');
                    div.className = 'editorHeading';
                    div.textContent = 'Version#' + this.leftHeader;

                    var div1 = document.createElement('div');
                    div1.className = 'editorHeading';
                    div1.textContent = 'Version#' + this.rightHeader;

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
                console.log(error);
                this.spinner.hide();
                alert('Service error');
              },
            });
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
          alert('Service error');
        },
      });
  }
  ngOnDestroy() {
    document.getElementsByTagName('h2')[0].classList.remove('textCenter');
  }
}
