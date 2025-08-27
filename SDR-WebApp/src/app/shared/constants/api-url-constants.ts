const CommonApiUrlList = {
  STUDYLINKS: 'studydefinitions/{studyId}/links',
  SEARCHRESULT: 'studydefinitions/search',
  SEARCHRESULTLIGHT: 'studydefinitions/searchstudytitle',
  REVISIONHISTORY: 'studydefinitions/{studyId}/revisionhistory',

  USAGEREPORT: 'reports/usage',

  ALLGROUPS: 'admin/usergroups/getgroups',
  POSTGROUP: 'admin/usergroups/postgroup',
  CHECKGROUP: 'admin/usergroups/checkgroupname?groupName=',
  GETGROUPLIST: 'admin/usergroups/getgrouplist',
  GETUSERLIST: 'admin/usergroups/listusers',

  ALLUSERS: 'admin/usergroups/getusers',
  POSTUSERS: 'admin/usergroups/postuser',

  VERSIONSURL: 'versions',
};
export { CommonApiUrlList };
