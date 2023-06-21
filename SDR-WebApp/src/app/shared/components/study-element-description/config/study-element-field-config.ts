const configList = {
  NAME: 'Item',
  KEYTOHIDE: ['id', 'studyDesignId', 'studyId', 'uuid', 'workflowId'],
  EXCEPTIONFIELD: [''],
  SPONSORKEYS: ['Clinical Study Sponsor', 'Sponsor_ID'],
  HEADING: 'Study Details',
  SPONSORID_KEY: 'orgCode',
  BLOCK_SIZE: 20,
  SPONSOR_TEXT: 'multiple',
  INTERVENTION_TEXT: 'multiple',
  STUDY_TITLE: 'Study Title',
  SPONSOR_ID: 'A unique identifier assigned to the protocol by the sponsor',
  SDR_UPLOAD_VERSION:
    'SDR specific label created and saved within the SDR when USDM conformant information received from Study Builder',
  LAST_MODIFIED_DATE: 'Last Modified Date',
  TAG: 'Optional field to defined by a Study Manager to enable identification across versions eg "draft 1", "final"',
  STATUS: 'Status',
  INDICATION: 'Indication',
  INTERVENTION: 'Intervention Model',
  PHASE: 'Phase',
  USDM_VERSION: 'USDM Version',
  LAST_MODIFIED_SYSTEM: 'Last Modified by System',
  RESPONSE_CODE: [
    { value: '200', description: '200 - OK' },
    { value: '201', description: '201 - Created' },
    { value: '400', description: '400 - BadRequest' },
    { value: '401', description: '401 - Unauthorized' },
    { value: '403', description: '403 - Forbidden' },
    { value: '404', description: '404 - NotFound' },
    { value: '500', description: '500 - InternalServerError' },
    { value: '415', description: '415 - UnsupportedMediaType' },
    { value: '503', description: '503 - ServiceUnavailable' },
  ],
  OPERATION: [
    { value: 'POST', description: 'POST' },
    { value: 'GET', description: 'GET' },
    { value: 'PUT', description: 'PUT' },
  ],
  TIMELINE: [
    { value: '7', description: 'Last 7 days' },
    { value: '30', description: 'Last 30 days' },
    { value: '60', description: 'Last 60 days' },
  ],
  SOA_LINK: 'SoA',
  STUDY_DEFINITION_LINK: 'studyDefinitions',
  EXPORT_REPORT_LIMIT: 1500,
  EXPORT_TOOLTIP: 'CSV Export',
  EXPORT_MESSAGE: 'Criteria modified, search again to enable export.',
  EXPORT_POPUP_INFO:
    'Note that a maximum of 1500 records can be exported at a time for the given search criteria. Please narrow search criteria to include all results in export as necessary.',
  EXCEED_DATE_INFO:
    'A maximum of 30 days range of report can be queried. Please modify the input dates to search.',
  FROM_DATE_MORE_THAN_TO_DATE:
    'To Date Time must be greater than From Date Time',
  VALID_FROM_DATE: 'From Date Time must be less than Current Date Time',
  VALID_TO_DATE: 'To Date Time must be less than Current Date Time',
  AUTH_IN_PROGRESS_ERROR:
    'Login is currently in progress in another window. Please complete or cancel that flow before requesting token again.',
  USER_CANCELLED_ERROR_CODE: 'user_cancelled',
  INTERACTION_ERROR_CODE: 'interaction_in_progress',
  ENABLE_SEARCH_MESSAGE:
    'Enter at least one search parameter along with USDM Version to initiate search',
};
export { configList };
