import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  AuthenticationResult,
  PublicClientApplication,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
// import { Studyelement } from '../models/studyelement';
import { ServiceCall } from '../../services/service-call/service-call.service';
import { Attribute, Accordian } from './model';
import { NgxSpinnerService } from 'ngx-spinner';
import * as mockJson from './config/SDR-StudySample-GET.json';
import { configList } from './config/study-element-field-config';
import { CommonMethodsService } from '../../services/common-methods.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-study-element-description',
  templateUrl: './study-element-description.component.html',
  styleUrls: ['./study-element-description.component.scss'],
})
/**
 *Study Element Details component
 */
export class StudyElementDescriptionComponent implements OnInit {
  @Output() backClicked = new EventEmitter();
  cloginDisplay = false;
  finalVal = new Accordian();
  tablecontent: Attribute[] = [];
  dataSource: any[] = [];
  studyelement: any;
  sponsorStudyId: any;
  sponsorVersionId: any;
  heading: string;
  studyId: any;
  versionId: any;
  showError = false;
  constructor(
    private el: ElementRef,
    private authService: MsalService,
    private spinner: NgxSpinnerService,
    private msalBroadcastService: MsalBroadcastService,
    private serviceCall: ServiceCall,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  /**
   *get the studyId and version id from rcent activity page or search page from routing
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.versionId = params['versionId'];
      }
      if (this.studyId && this.versionId) {
        localStorage.setItem('studyId', this.studyId);
        localStorage.setItem('versionId', this.versionId);
      }
    });

    this.heading = configList.HEADING;
    this.studyId = this.studyId
      ? this.studyId
      : localStorage.getItem('studyId');
    this.versionId = this.versionId
      ? this.versionId
      : localStorage.getItem('versionId');
    this.getstudyelement();
  }

  /**
   *to create attribute which is key value pair that get showed as table in right side
   *@param elem clinical study object which has only key value pair without child object
   */
  createAttribute(elem: any) {
    if (typeof elem[1] !== 'object' || elem[1] == null) {
      let attribute: Attribute = new Attribute();
      attribute.name = !isNaN(+elem[0])
        ? configList.NAME + ' ' + (Number(elem[0]) + 1)
        : elem[0];
      attribute.value = elem[1];
      return attribute;
    }
    return;
  }

  /**
   *to create child acordian structure if elem has child objects and not in the format of key value pair
   *@param elem clinical study object which has child object
   */
  createsubAccordian(objectVal: any) {
    if (typeof objectVal[1] === 'object' && objectVal[1] !== null) {
      let accordian = new Accordian();
      if (Object.entries(objectVal[1]).length == 0) {
        accordian.accordianName = objectVal[0];
      } else {
        Object.entries(objectVal[1]).forEach((elem) => {
          accordian.accordianName = objectVal[0];
          let attributeList = this.createAttribute(elem);
          if (typeof attributeList === 'object') {
            accordian.attributeList.push(attributeList);
          }
          let accordianList = this.createsubAccordian(elem);
          if (typeof accordianList === 'object') {
            accordian.subAccordianList.push(accordianList);
          }
        });
      }

      return accordian;
    }
    return;
  }
  /**
   *to get study details from api based on study id and version id
   */
  getstudyelement(): void {
    this.spinner.show();
    this.serviceCall.getStudyElement(this.studyId, this.versionId).subscribe({
      next: (studyelement: any) => {
        this.spinner.hide();
        let sponsorDetails = this.commonMethod.getSponsorDetails(studyelement);

        this.sponsorVersionId = sponsorDetails.versionId;

        this.finalVal.attributeList = [];
        this.finalVal.subAccordianList = [];

        Object.entries(studyelement['clinicalStudy']).forEach((elem) => {
          this.finalVal.accordianName =
            studyelement['clinicalStudy'].studyTitle;
          let attributeList = this.createAttribute(elem);
          if (typeof attributeList === 'object') {
            this.finalVal.attributeList.push(attributeList);
          }
          let accordianList = this.createsubAccordian(elem);

          if (typeof accordianList === 'object') {
            this.finalVal.subAccordianList.push(accordianList);
          }
        });
        this.showTableContent(this.finalVal, false, this.finalVal);
      },
      error: (error) => {
        this.showError = true;
        this.finalVal = new Accordian();
        this.spinner.hide();
      },
    });
  }
  /**
   *To highlight the text on click of the tree
   *@param val text which user clicks on the tree structure
   */
  setHighLighted(val: any) {
    val.forEach((elem: Accordian) => {
      elem.isHighlighted = false;
      if (elem.subAccordianList.length > 0) {
        this.setHighLighted(elem.subAccordianList);
      }
    });
  }
  /**
   *To show table contents on click of value on the tree
   *@param val text which user clicks on the tree structure
   *@param fromTitle Is the value clicked from user is the static study title
   *@param field Object for the text which user clicks on the tree structure
   */
  showTableContent(val: any, fromTitle?: boolean, field?: Accordian) {
    this.setHighLighted(this.finalVal.subAccordianList);
    this.finalVal.isHighlighted = false;
    val.isHighlighted = true;
    this.tablecontent = val.attributeList;
    //const myArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const toRemove = new Set(configList.KEYTOHIDE);
    if (field && !configList.EXCEPTIONFIELD.includes(field.accordianName))
      this.tablecontent = this.tablecontent.filter(
        (x: { name: string }) => !toRemove.has(x.name)
      );
    if (!fromTitle) {
      val.isSelected =
        val.subAccordianList.length == 0 ? true : !val.isSelected;
      val.subAccordianList = val.subAccordianList.map((mapElem: Accordian) => {
        mapElem.isShow = !mapElem.isShow;
        if (mapElem.subAccordianList.length == 0) {
          mapElem.isSelected = true;
        }
        mapElem.accordianName = !isNaN(+mapElem.accordianName)
          ? configList.NAME + ' ' + (Number(mapElem.accordianName) + 1)
          : mapElem.accordianName;

        return mapElem;
      });
    }
  }
  // backButtonClicked() {
  //   this.backClicked.emit(true);
  // }
  /**
   *Navigate to audit trail page
   */
  auditTrail() {
    this.router.navigate(
      [
        'audit',
        {
          studyId:
            this.studyId ||
            this.finalVal.attributeList.filter(
              (elem) => elem.name == 'studyId'
            )[0].value,
        },
      ],
      { relativeTo: this.route }
    );
  }
  /**
   *to set Localstorage for study and version id so page can be retrieved on refresh
   */
  ngOnDestroy() {
    localStorage.setItem('studyId', this.studyId);
    localStorage.setItem('versionId', this.versionId);
  }
}
