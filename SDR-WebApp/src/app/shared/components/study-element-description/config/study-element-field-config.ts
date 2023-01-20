const configList = {
  NAME: 'Item',
  KEYTOHIDE: ['id', 'studyId', 'uuid'],
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
  ],
  TIMELINE: [
    { value: '7', description: 'Last 7 days' },
    { value: '30', description: 'Last 30 days' },
    { value: '60', description: 'Last 60 days' },
  ],
};
export { configList };
