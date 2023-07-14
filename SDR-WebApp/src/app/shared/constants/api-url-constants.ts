import { environment } from 'src/environments/environment';
const routePrefix = environment.bypassAuth ? '' : 'api/ui/';

const CommonApiUrlList = {
  STUDYLINKS: routePrefix + 'studydefinitions/{studyId}/links',
  SEARCHRESULT: routePrefix + 'studydefinitions/search',
  SEARCHRESULTLIGHT: routePrefix + 'studydefinitions/searchstudytitle',
  REVISIONHISTORY: routePrefix + 'studydefinitions/{studyId}/revisionhistory',

  USAGEREPORT: routePrefix + 'reports/usage',

  ALLGROUPS: routePrefix + 'admin/usergroups/getgroups',
  POSTGROUP: routePrefix + 'admin/usergroups/postgroup',
  CHECKGROUP: routePrefix + 'admin/usergroups/checkgroupname?groupName=',
  GETGROUPLIST: routePrefix + 'admin/usergroups/getgrouplist',
  GETUSERLIST: routePrefix + 'admin/usergroups/listusers',

  ALLUSERS: routePrefix + 'admin/usergroups/getusers',
  POSTUSERS: routePrefix + 'admin/usergroups/postuser',

  VERSIONSURL: routePrefix + 'versions',
};
export { CommonApiUrlList };
