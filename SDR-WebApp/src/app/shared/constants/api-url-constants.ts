const ApiUrlList = {
  ELEMENT: 'api/ui/v1/studydefinitions/',
  SEARCHRESULT: 'api/ui/v1/search',
  SEARCHRESULTLIGHT: 'api/ui/v1/searchstudytitle',
  AUDITTRAIL: 'api/ui/v1/audittrail/',
  ALLGROUPS: 'api/ui/admin/v1/usergroups/getgroups',
  POSTGROUP: 'api/ui/admin/v1/usergroups/postgroup',
  CHECKGROUP: 'api/ui/admin/v1/usergroups/checkgroupname?groupName=',
  ALLUSERS: 'api/ui/admin/v1/usergroups/getusers',
  POSTUSERS: 'api/ui/admin/v1/usergroups/postuser',
  GETGROUPLIST: 'api/ui/admin/v1/usergroups/getgrouplist',
  GETUSERLIST: 'api/ui/admin/v1/usergroups/listusers',
  USAGEREPORT: 'api/ui/v1/reports/usage',
};

const CommonApiUrlList = {
  STUDYLINKS: 'api/ui/studydefinitions/{studyId}/links',
  SEARCHRESULT: 'api/ui/studydefinitions/search',
  SEARCHRESULTLIGHT: 'api/ui/studydefinitions/searchstudytitle',
  AUDITTRAIL: 'api/ui/studydefinitions/{studyId}/auditTrail',

  USAGEREPORT: 'api/ui/reports/usage',

  ALLGROUPS: 'api/ui/admin/usergroups/getgroups',
  POSTGROUP: 'api/ui/admin/usergroups/postgroup',
  CHECKGROUP: 'api/ui/admin/usergroups/checkgroupname?groupName=',
  GETGROUPLIST: 'api/ui/admin/usergroups/getgrouplist',
  GETUSERLIST: 'api/ui/admin/usergroups/listusers',

  ALLUSERS: 'api/ui/admin/usergroups/getusers',
  POSTUSERS: 'api/ui/admin/usergroups/postuser',
};

export { ApiUrlList, CommonApiUrlList };
