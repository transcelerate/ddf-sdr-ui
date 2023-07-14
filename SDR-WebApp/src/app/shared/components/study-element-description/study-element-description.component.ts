import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
export class StudyElementDescriptionComponent implements OnInit, OnDestroy {
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
  isValidUSDMVersion = false;
  usdmVersion: any;
  soaNavigationBoolean: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private serviceCall: ServiceCall,
    private commonMethods: CommonMethodsService,
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
        this.usdmVersion = params['usdmVersion'];
      }
      if (this.studyId && this.versionId) {
        localStorage.setItem('studyId', this.studyId);
        localStorage.setItem('versionId', this.versionId);
        localStorage.setItem('usdmVersion', this.usdmVersion);
      }
    });

    this.heading = configList.HEADING;
    this.studyId = this.studyId
      ? this.studyId
      : localStorage.getItem('studyId');
    this.versionId = this.versionId
      ? this.versionId
      : localStorage.getItem('versionId');
    this.usdmVersion = this.usdmVersion
      ? this.usdmVersion
      : localStorage.getItem('usdmVersion');
    this.getstudyelement();
  }

  checkLocationPath(isSoa: boolean): void {
    this.soaNavigationBoolean = isSoa;
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
    this.commonMethods.getStudyLink({
      studyId: this.studyId,
      version: this.versionId,
      linkName: configList.STUDY_DEFINITION_LINK,
      callback: (url: any) => this.getStudyElementUsingLink(url),
      errorCallback: (err: any) => {
        this.showError = true;
        this.finalVal = new Accordian();
        this.spinner.hide();
      },
    });
  }

  getStudyElementUsingLink(url: any) {
    this.serviceCall
      .getStudyElementWithVersion(this.usdmVersion, url)
      .subscribe({
        //this.serviceCall.getStudyElement(this.studyId, this.versionId).subscribe({
        next: (studyelement: any) => {
          this.spinner.hide();
          let sponsorDetails =
            this.commonMethods.getSponsorDetails(studyelement);

          this.sponsorVersionId = sponsorDetails.versionId;
          this.finalVal.attributeList = [];
          this.finalVal.subAccordianList = [];

          // To check if SoA Matrix needs to be enabled.
          // TO-Do add another AND condition to check if link exists but study designs dont exist

          this.isValidUSDMVersion = typeof this.getSoALink() === 'string';
          let clinicalElem: any;
          if (
            studyelement.auditTrail.usdmVersion === '1.0' ||
            studyelement.auditTrail.usdmVersion === '1.9'
          ) {
            clinicalElem = studyelement['clinicalStudy'];
          } else {
            clinicalElem = studyelement['study'];
          }
          Object.entries(clinicalElem).forEach((elem) => {
            this.finalVal.accordianName = clinicalElem.studyTitle;
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

  getSoALink() {
    const localStorageKey = this.studyId + '_' + this.versionId + '_links';
    var links: any = localStorage.getItem(localStorageKey);
    if (!links || links === 'undefined') {
      this.serviceCall.getStudyLinks(this.studyId, this.versionId).subscribe({
        next: (p: any) => {
          localStorage.setItem(localStorageKey, JSON.stringify(p.links));
          return p.links.SoA;
        },
        error: (error) => {
          this.showError = true;
          this.finalVal = new Accordian();
          this.spinner.hide();
        },
      });
    } else {
      var parsedLinks = JSON.parse(links);
      return parsedLinks.SoA;
    }
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
   *Navigate to SoA matrix page
   */
  soaMatrix() {
    this.router.navigate(
      [
        'soa',
        {
          // this may not be required. To be revisited
          studyId:
            this.studyId ||
            this.finalVal.attributeList.filter(
              (elem) => elem.name == 'studyId'
            )[0].value,
          versionId: this.versionId,
          usdmVersion: this.usdmVersion,
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
    localStorage.setItem('usdmVersion', this.usdmVersion);
  }
}
