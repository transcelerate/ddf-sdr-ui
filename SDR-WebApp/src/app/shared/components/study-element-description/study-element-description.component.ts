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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(Object.keys(params).length !==0 ){
        this.studyId = params['studyId'];
        this.versionId = params['versionId'];
      }
     
    });
    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
    //   )
    //   .subscribe((result: EventMessage) => {
    //     console.log('result', result);
    //   });
    this.heading = configList.HEADING;

    this.getstudyelement();
  }

  // isShowAttribute(content: any){
  //   if(content.name)

  // }
  createAttribute(elem: any) {
    if (typeof elem[1] !== 'object' || elem[1] == null) {
      let attribute: Attribute = new Attribute();
      attribute.name = elem[0];
      attribute.value = elem[1];
      return attribute;
      //attributeList.push(attribute)
    }
    return;
  }

  createsubAccordian(objectVal: any) {
    if (typeof objectVal[1] === 'object' && objectVal[1] !== null) {
      let accordian = new Accordian();

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

      return accordian;
    }
    return;
  }

  getstudyelement(): void {
    //
    this.spinner.show();
    this.serviceCall.getStudyElement(this.studyId, this.versionId).subscribe({
      next: (studyelement: any) => {
        //this.userExists = true;
        this.spinner.hide();

        // this.studyelement = studyelement.clinicalStudy;
      //  studyelement = mockJson;
     let sponsorDetails = this.commonMethod.getSponsorDetails(studyelement);
      //   this.sponsorStudyId = sponsorDetails.studyId;
      this.sponsorVersionId = sponsorDetails.versionId;
        // studyelement = val.clinicalStudy;

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
          // accordianList = accordianList.map(mapElem=>{
          //   mapElem.isShow = true;
          //   return mapElem;
          // });

          if (typeof accordianList === 'object') {
            this.finalVal.subAccordianList.push(accordianList);
          }
          //this.finalVal.subAccordianList.push(this.createsubAccordian(elem));
        });
        console.log(this.finalVal);
        this.showTableContent(this.finalVal, false, this.finalVal);

        //this.dataSource = Object.entries(this.studyelement);
        // this.dataSource = Object.entries(this.studyelement);
        // console.log(Object.entries(this.studyelement));
        //this.dataSource = Object.entries(this.studyelement)[0][1];
      },
      error: (error) => {
        console.log(error);
        // this.userExists = false;
      },
    });
  }

  setLoginDisplay() {
    //this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
  setHighLighted(val: any) {
    val.forEach((elem: Accordian) => {
      elem.isHighlighted = false;
      if (elem.subAccordianList.length > 0) {
        this.setHighLighted(elem.subAccordianList);
      }
    });
  }
  showTableContent(val: any, fromTitle?: boolean, field?: Accordian) {
    // if(event){
    //   // this.el.nativeElement.querySelector("li").forEach((element: { removeClass: (arg0: string) => void; }) => {
    //   //   element.removeClass("activeSelected");
    //   // });
    //   event.srcElement.classList.add("activeSelected");
    // }
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

        //mapElem.isSelected = !mapElem.isSelected && mapElem.subAccordianList.length == 0;
        return mapElem;
      });
    }
  }
  backButtonClicked() {
    this.backClicked.emit(true);
  }
  auditTrail(){
    this.router.navigate(["audit",  {
      studyId : this.studyId || this.finalVal.attributeList.filter(elem=>elem.name == "studyId")[0].value,
    } ], {relativeTo: this.route});
  }
}
