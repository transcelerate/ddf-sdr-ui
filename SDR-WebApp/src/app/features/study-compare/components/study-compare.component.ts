import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-study-compare',
  templateUrl: './study-compare.component.html',
  styleUrls: ['./study-compare.component.scss']
})
export class StudyCompareComponent implements OnInit {

  constructor(private ds: DialogService, public router: Router,
    public route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.ds.changeDialogState('Search Study Definitions');
  }
  versionCompare() {
    this.router.navigate(
      [
        'studyCompare',
        {
          studyId: '92322b5e-3ee5-4d67-8052-a1086674a216',
          verA: '3',
          verB: '1',
        },
      ],
      { relativeTo: this.route }
    );
  }

}
