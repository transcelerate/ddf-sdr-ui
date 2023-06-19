import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { ServiceCall } from '../../shared/services/service-call/service-call.service';
// import * as mockJson from './sample-data.json';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit {
  @ViewChildren('tabset2') tabset2: any;
  @ViewChild('accordionRow') accordionRow: ElementRef;
  studyId: any;
  versionId: any;
  tabs: any;
  selectedTab: boolean = false;
  usdmVersion: any;
  showError = false;
  bsModalRef?: BsModalRef;
  headerColumns = [
    {
      key: 'encounterName',
      label: 'Encounter (Planned Time)',
    },
    {
      key: 'timingValue',
      label: 'Timing',
    },
    {
      key: 'timingWindow',
      label: 'Window',
    },
    {
      key: 'activity',
      label: 'Activity',
    },
  ];
  activityFootnotes: any[] = [];
  procedureFootnotes: any[] = [];
  activeTab: any;
  activeNestedTab: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService,
    private commonMethods: CommonMethodsService,
    private modalService: BsModalService,
    private parentComponent: StudyElementDescriptionComponent,
    private changeDetect: ChangeDetectorRef
  ) {
    this.parentComponent.checkLocationPath(true);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.versionId = params['versionId'];
        this.usdmVersion = params['usdmVersion'];
      }
    });
    this.tabset2 = this.tabset2?.toArray();
    this.getSoADetails();
  }

  getSoADetails() {
    this.spinner.show();
    this.commonMethods.getStudyLink({
      studyId: this.studyId,
      version: this.versionId,
      linkName: configList.SOA_LINK,
      callback: (url: any) => this.getSoADetailsUsingLink(url),
      errorCallback: (err: any) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
  }

  getSelectedTab(event?: any) {
    this.activityFootnotes = [];
    this.procedureFootnotes = [];

    if (event) {
      this.activeTab = event.id;
    } else {
      this.activeTab = this.tabs?.studyDesigns[0].studyDesignId;
    }

    this.tabset2?.toArray().forEach((eachStudyDesign: any) => {
      eachStudyDesign.tabs[0].active = true;
    });
    this.getSelectedNestedTab();
  }

  getSelectedNestedTab(event?: any) {
    this.activityFootnotes = [];
    this.procedureFootnotes = [];

    if (event && this.activeTab) {
      let spl = event.id.split(this.activeTab + '_').pop();
      this.activeNestedTab = spl;
    } else if (this.activeTab) {
      this.tabs?.studyDesigns?.forEach((eachStudyDesign: any) => {
        if (eachStudyDesign.studyDesignId === this.activeTab) {
          if (
            eachStudyDesign.studyScheduleTimelines &&
            eachStudyDesign.studyScheduleTimelines.length > 0
          ) {
            this.activeNestedTab =
              eachStudyDesign.studyScheduleTimelines[0].scheduleTimelineId;
          }
        }
      });
    } else {
      this.activeNestedTab =
        this.tabs?.studyDesigns[0].studyScheduleTimelines[0].scheduleTimelineId;
    }
    this.addFootnoteids();
  }

  getSoADetailsUsingLink(url: any): void {
    this.serviceCall.getSoAMatrix(this.usdmVersion, url).subscribe({
      next: (soa: any) => {
        this.spinner.hide();
        this.tabs = soa;
        this.getSelectedTab();
        // To-DO: Call binding logic here
      },
      error: (error) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
  }

  addFootnoteids() {
    this.tabs?.studyDesigns?.forEach((eachStudyDesign: any) => {
      if (eachStudyDesign.studyDesignId === this.activeTab) {
        eachStudyDesign?.studyScheduleTimelines?.forEach(
          (eachTimeline: any) => {
            if (eachTimeline.scheduleTimelineId === this.activeNestedTab) {
              let activityIndex = 1;
              let procedureIndex = 1;

              eachTimeline?.scheduleTimelineSoA?.orderOfActivities?.forEach(
                (eachActivity: any) => {
                  eachActivity.isExpanded = false;
                  if (eachActivity.activityIsConditional) {
                    eachActivity.footnoteId = 'A' + activityIndex;
                    activityIndex++;
                    let footNoteObj = {
                      footnoteId: '',
                      footnoteDescription: '',
                    };
                    footNoteObj.footnoteId = eachActivity.footnoteId;
                    footNoteObj.footnoteDescription =
                      eachActivity.footnoteDescription;
                    this.activityFootnotes.push(footNoteObj);
                  }

                  eachActivity?.definedProcedures?.forEach(
                    (eachProcedure: any) => {
                      if (eachProcedure.procedureIsConditional) {
                        eachProcedure.footnoteId = 'P' + procedureIndex;
                        procedureIndex++;
                        let footNoteObj = {
                          footnoteId: '',
                          footnoteDescription: '',
                        };
                        footNoteObj.footnoteId = eachProcedure.footnoteId;
                        footNoteObj.footnoteDescription =
                          eachProcedure.footnoteDescription;
                        this.procedureFootnotes.push(footNoteObj);
                      }
                    }
                  );
                }
              );
            }
          }
        );
      }
    });
  }

  // for the present data no duplicate data will be found so fn is nt executed but kept for ref.
  findDuplicate(
    index: number,
    eachActivity: string,
    activitiesArray: string[]
  ) {
    return activitiesArray.find((checkColor, checkIndex) => {
      let isDuplicate = checkIndex != index && eachActivity == checkColor;
      return isDuplicate;
    });
  }

  redirectToTimeline(timelineId: any) {
    this.tabset2.forEach((eachStudyDesign: any) => {
      eachStudyDesign.tabs.forEach((eachTimeline: any) => {
        if (eachTimeline.id === timelineId) {
          eachTimeline.active = true;
        }
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  createTooltip(tooltipname: string, item: any) {
    let tooltipString = '';
    if (tooltipname === 'encounter') {
      if (item.encounterName && item.encounterScheduledAtTimingValue) {
        tooltipString =
          item.encounterName + '(' + item.encounterScheduledAtTimingValue + ')';
      } else {
        tooltipString = item.encounterName;
      }
    } else if (tooltipname === 'procedure') {
      if (
        item.procedureName &&
        item.procedureDescription !== null &&
        item.procedureDescription !== ''
      ) {
        tooltipString = item.procedureName + ':' + item.procedureDescription;
      } else {
        tooltipString = item.procedureName;
      }
    }
    return tooltipString;
  }

  exportToExcel(item: any): void {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    // Get table 1 content
    const table1 = document.getElementById('schedule-table');
    const table1Data = this.getTableData(table1);
    const table1Headers = this.getTableHeaders(table1);
    XLSX.utils.sheet_add_aoa(
      worksheet,
      table1Headers.map((row) =>
        row.map((header: { label: any; colspan: any }) => [
          header.label,
          { colspan: header.colspan },
        ])
      ),
      { origin: 0 }
    );
    XLSX.utils.sheet_add_aoa(
      worksheet,
      table1Data.map((row) => row.map((cell: { label: any }) => cell.label)),
      { origin: -1 }
    );
    // Add a blank row after table 1
    const blankRow1 = [''];
    XLSX.utils.sheet_add_aoa(worksheet, [blankRow1], { origin: -1 });
    // Get table 2 content
    const table2 = document.getElementById('soa-table');
    const table2Data = this.getTableData(table2, item);
    const table2Headers = this.getTableHeaders(table2, item);
    XLSX.utils.sheet_add_aoa(
      worksheet,
      table2Headers.map((row) =>
        row.map((header: { label: any; colspan: any }) => [
          header.label,
          { colspan: header.colspan },
        ])
      ),
      { origin: -1 }
    );
    XLSX.utils.sheet_add_aoa(
      worksheet,
      table2Data.map((row) => row.map((cell: { label: any }) => cell.label)),
      { origin: -1 }
    );

    // Add a blank row after table 2
    const blankRow2 = [''];
    XLSX.utils.sheet_add_aoa(worksheet, [blankRow2], { origin: -1 });
    // Get table 3 content
    if (
      this.activityFootnotes.length > 0 ||
      this.procedureFootnotes.length > 0
    ) {
      const table3 = document.getElementById('footnote-table');
      const table3Data = this.getTableData(table3);
      XLSX.utils.sheet_add_aoa(
        worksheet,
        table3Data.map((row) => row.map((cell: { label: any }) => cell.label)),
        { origin: -1 }
      );
    }
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tables');
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'tables.xlsx');
  }

  getTableData(table: any, item?: any): any[] {
    const data: any[] = [];
    // Extract table rows
    const rows = table.getElementsByTagName('tr');
    if (table.id === 'soa-table') {
      item.scheduleTimelineSoA.orderOfActivities.forEach(
        (eachOrderActivity: {
          toggleBoolean: boolean;
          toggleConcepts: boolean;
          isExpanded: boolean;
          definedProcedures: any[] | null;
          biomedicalConcepts: any[] | null;
          activityTimelineName: any;
        }) => {
          if (
            (eachOrderActivity.definedProcedures !== null &&
              eachOrderActivity.definedProcedures.length > 0) ||
            (eachOrderActivity.biomedicalConcepts !== null &&
              eachOrderActivity.biomedicalConcepts.length > 0) ||
            (eachOrderActivity.activityTimelineName !== '' &&
              eachOrderActivity.activityTimelineName !== null)
          ) {
            eachOrderActivity.isExpanded = true;
            eachOrderActivity.toggleConcepts = true;
            eachOrderActivity.toggleBoolean = true;
          }
          this.changeDetect.detectChanges();
          const row: any[] = [];
          const cells = rows[data.length].getElementsByTagName('td');
          for (let j = 0; j < cells.length; j++) {
            row.push({
              label: cells[j].innerText,
              colspan: 1,
              isExpanded: eachOrderActivity.isExpanded, // Add the 'expanded' property to each cell
            });
          }
          data.push(row);
        }
      );
    } else {
      for (let i = 0; i < rows.length; i++) {
        const row: any[] = [];
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
          const cellData = {
            label: cells[j].innerText,
            colspan: 1,
          };
          row.push(cellData);
        }
        data.push(row);
      }
    }
    return data;
  }

  getTableHeaders(table: any, item?: any): any[] {
    const headers: any[] = [];
    const headerRows = table.getElementsByTagName('tr');
    // Handle scenario where headers are in a single row
    if (headerRows.length === 1) {
      const headerCells = headerRows[0].getElementsByTagName('th');
      for (let i = 0; i < headerCells.length; i++) {
        headers.push({
          label: headerCells[i].innerText,
          colspan: 1,
        });
      }
    } else if (table.id === 'soa-table') {
      for (let i = 0; i < headerRows.length; i++) {
        const headerCells = headerRows[i].getElementsByTagName('th');
        let timingsLengths: number[] = [];
        if (i == 0) {
          timingsLengths = this.getColspan('encounterName', item);
        }
        let eachRowArray = [];
        for (let j = 0; j < headerCells.length; j++) {
          const colspan = timingsLengths[j] || 1;
          const label = headerCells[j].innerText;
          const startColIndex: number = eachRowArray.length;
          const endColIndex = calculateEndColIndex(startColIndex, colspan);
          eachRowArray.push({
            label: label,
            colspan: colspan,
            s: { r: i, c: startColIndex },
            e: { r: i, c: endColIndex },
          });
          for (let k = startColIndex + 1; k <= endColIndex; k++) {
            eachRowArray.push('');
          }
        }
        headers.push(eachRowArray);
      }
    }
    // Handle scenario where headers are in multiple rows
    else {
      const numRows = headerRows.length;
      const headerCells = headerRows[numRows - 1].getElementsByTagName('th');
      for (let i = 0; i < headerCells.length; i++) {
        headers.push({
          label: headerCells[i].innerText,
          colspan: 1,
        });
      }
    }
    return headers;
  }

  getColspan(header: any, item: any): any {
    const timingsLengths: any[] = [];
    timingsLengths.push(1);
    if (header === 'encounterName') {
      item.scheduleTimelineSoA.SoA.forEach((content: any) => {
        timingsLengths.push(content.timings ? content.timings.length : 0);
      });
    } else {
      timingsLengths.push(1); // Push 1 for other headers
    }
    return timingsLengths;
  }

  toggleAccordion(eachOrderActivity: any): any {
    eachOrderActivity.isExpanded = !eachOrderActivity.isExpanded;
    // Toggle the classes on the accordion-row element
    if (this.accordionRow) {
      const element = this.accordionRow.nativeElement;
      if (eachOrderActivity.isExpanded) {
        element.classList.add('show');
        element.classList.remove('collapse');
      } else {
        element.classList.add('collapse');
        element.classList.remove('show');
      }
    }
  }
}
function calculateEndColIndex(startColIndex: any, colspan: number) {
  return startColIndex + colspan - 1;
}
