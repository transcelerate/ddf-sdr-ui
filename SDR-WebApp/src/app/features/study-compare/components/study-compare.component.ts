import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-study-compare',
  templateUrl: './study-compare.component.html',
  styleUrls: ['./study-compare.component.scss']
})
export class StudyCompareComponent implements OnInit {
  searchOne: any;
  searchTwo: any;
  studyOneId: any;
  studyOneVersion: any;
  studyTwoId: any;
  studyTwoVersion: any;
  studyOneTitle: any;
  studyTwoTitle: any;
  studyOneUSDMVer: any;
  studyTwoUSDMVer: any;
  toolTipOne: string;
  toolTipTwo: string;
  showError = false;
  constructor(private ds: DialogService, public router: Router,
    public route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.ds.changeDialogState('Search Study Definitions');
    const selectedValue = history.state.data;
    if (selectedValue) {
      if (history.state.from == 'search1') {
        localStorage.setItem('search1', JSON.stringify(selectedValue));
      } else {
        localStorage.setItem('search2', JSON.stringify(selectedValue));
      }

    }
    this.setModel();
  }
  setModel() {
    this.searchOne = localStorage.getItem('search1');
    this.searchTwo = localStorage.getItem('search2');
    if (this.searchOne) {
      this.searchOne = JSON.parse(this.searchOne);
      this.studyOneId = this.searchOne.clinicalStudy.uuid;
      this.studyOneTitle = this.searchOne.clinicalStudy.studyTitle;
      this.studyOneVersion = this.searchOne.auditTrail.SDRUploadVersion;
      this.studyOneUSDMVer = this.searchOne.auditTrail.usdmVersion;
      this.toolTipOne = this.studyOneTitle + '_Version' + this.studyOneVersion;
      localStorage.setItem(this.searchOne.clinicalStudy.uuid + '_' + this.searchOne.auditTrail.SDRUploadVersion + '_links', JSON.stringify(this.searchOne.links));
    } if (this.searchTwo) {
      this.searchTwo = JSON.parse(this.searchTwo);
      this.studyTwoId = this.searchTwo.clinicalStudy.uuid;
      this.studyTwoTitle = this.searchTwo.clinicalStudy.studyTitle;
      this.studyTwoVersion = this.searchTwo.auditTrail.SDRUploadVersion;
      this.studyTwoUSDMVer = this.searchTwo.auditTrail.usdmVersion;
      this.toolTipTwo = this.studyTwoTitle + '_Version' + this.studyTwoVersion;
      localStorage.setItem(this.searchTwo.clinicalStudy.uuid + '_' + this.searchTwo.auditTrail.SDRUploadVersion + '_links', JSON.stringify(this.searchTwo.links));
    }
  }
  versionCompare() {
    this.router.navigate(
      [
        'studyCompare',
        {
          studyId: this.studyOneId,
          verA: this.studyOneVersion,
          verB: this.studyTwoVersion,
          studyId2: this.studyTwoId,
          studyOneTitle: this.studyOneTitle,
          studyTwoTitle: this.studyTwoTitle,
          usdmVerA: this.studyOneUSDMVer,
          usdmVerB: this.studyTwoUSDMVer,
        },
      ],
      { relativeTo: this.route }
    );
  }

  clear() {
    this.studyTwoTitle = '';
    this.studyOneTitle = '';
    localStorage.setItem('search1', '');
    localStorage.setItem('search2', '');
    // TO-DO Check if clearing  the links storage is needed ?
  }
  redirect(from: any) {
    this.router.navigate(['/comparison/search'], { state: { from: from } });
  }


}
