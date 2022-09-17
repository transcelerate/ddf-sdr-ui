- [Introduction](#introduction)
  - [Overview](#overview)
  - [Scope of Document](#scope-of-document)
  - [Intended Audience](#intended-audience)
  - [Prerequisites](#prerequisites)
  - [Definitions and Acronyms](#definitions-and-acronyms)
- [SDR General UI features](#sdr-general-ui-features)
  - [Login](#login)
  - [Recent Activity Widget](#recent-activity-widget)
  - [Search Study Definitions](#search-study-definitions)
  - [Study Details](#study-details)
  - [Audit Trail](#audit-trail)
  - [Version Comparison](#version-comparison)
  - [Study Comparison](#study-comparison)
  - [Logout](#logout)
- [SDR Administrative UI features](#sdr-administrative-ui-features)
  - [System Usage Report](#system-usage-report)
  - [Group and User Management](#group-and-user-management)
  - [Group Management](#group-management)
  - [User Management](#user-management)
  
  # Introduction
  ## Overview
  The UI application of the SDR Reference Implementation allows the user to view and search Study Definitions. The UI features include -
  - List Study Definitions and Details
  - Search Study Definitions
  - View Audit Trail for a Study
  - Compare Study Versions
 ## Scope of Document
 This document details the list of UI features available in Study Definition Repository and provides steps for navigation. The technical design and implementation of these features is out of scope.
 ## Intended Audience
 The document is a guide for users/vendors who want to view and search the study definitions using SDR UI.
 ## Prerequisites
 - User should be part of Azure Active Directory of SDR Azure subscription.
 - Certificate Installation for accessing SDR User Interface 
Below are the steps for certificate installation on the local PC for accessing the SDR User Interface.
### NAVIGATION STEPS:
i.	Double click the .pfx certificate file.

ii.	Select “Current user” option and click next.

<p align="center"> <img width="382" alt="certificate-import-wizard"  src="images for ui user guide/certificate-import-wizard.png">

  iii.	File to Import : Leave default values and click next

<p align="center"> <img width="382" alt="file-to-import"  src="images for ui user guide/file-to-import.png"> 

  iv.	Provide the certificate password and click next

<p align="center"> <img width="382" alt="certificate-password"  src="images for ui user guide/certificate-password.png"> 

  v.	Choose “Automatically select the certificate store” option and click next.

<p align="center"> <img width="382" alt="certifcate-store-selection"  src="images for ui user guide/certifcate-store-selection.png">

  vi.	Click on finish.

<p align="center"> <img width="382" alt="certifcate-finish-wizard"  src="images for ui user guide/certifcate-finish-wizard.png"> 

  vii.	The browser will prompt for a certificate when accessing the SDR application after successful login. Select the installed certificate to access the application.

<p align="center"> <img width="382" alt="certificate-prompt"  src="images for ui user guide/certificate-prompt.png">

  viii.	Click on “Allow” if the below prompt appears in the taskbar/browser.

<p align="center"> <img width="382" alt="credintial-required-prompt"  src="images for ui user guide/credintial-required-prompt.png">

  ### STEPS TO IMPORT CERTIFICATE ON MACOS
  i.	Open Keychain Access Manager.<br>
  ii.	Navigate to File → Import Items. Browse to the .pfx<br>
  iii.	Select System in the Keychain drop-down and click Add.<br> 
  iv.	Enter the admin password to authorize the changes.<br> 
  v.	Enter the password that was given when the client certificate (.Pfx) file was generated and click Modify Keychain.
  
## Definitions and Acronyms
  |Term / Abbreviation	|Definition|
  |-----|-----|
|API|	Application Programming Interface|
|DDF|	Digital Data Flow|
|SDR|	Study Definition Repository|
|URL|	Uniform Resource Locator|
  
# SDR General UI features
SDR UI Implementation has following features.
## Login
This feature allows the user to login to the application.
### NAVIGATION STEPS:
i.	Launch the SDR website.
  
  <p align="center"> <img width="382" alt="login-page"  src="images for ui user guide/login-page.png">

ii.	On click of login link, user is redirected to provide credentials as shown below.
    
  <p align="center"> <img width="382" alt="sign-in-page"  src="images for ui user guide/sign-in-page.png">

iii.	On successful authentication, user is redirected to the Home Page. When prompted user must select the environment specific client certificate.
      
<p align="center"> <img width="382" alt="selection-of-certificate"  src="images for ui user guide/selection-of-certificate.png">

## Recent Activity Widget
On the Home Page, the Recent Activity Widget screen shows the list of Study Definitions modified over the last 30 days, with most recently modified definitions on the top. The top 20 documents are listed first and the remaining come into view as the user scrolls.
        
 <p align="center"> <img width="382" alt="recent-activity-widget"  src="images for ui user guide/recent-activity-widget.png">

## Search Study Definitions
### NAVIGATION STEPS:
i.	On click of Search Study Definitions in the left menu, user can navigate to search page, where it allows user to search specific study with certain search parameters.
          
 <p align="center"> <img width="382" alt="search-study-page"  src="images for ui user guide/search-study-page.png">

ii.	On entering the search parameters, click on Search to get the matching study definitions. At least one search parameter is mandatory.  Below is the list of search parameters:
   
|Field Name|	Field Type|
   |-----|-----|
|Study Title	|Plain Text. Allows alphanumeric characters only.|
|Sponsor Id|	Plain Text. Allows alphanumeric characters and “.” Character only.|
|Intervention Model|	Plain Text with Suggestions|
|Phase	|Plain Text with Suggestions|
|Modified From|	Date Picker|
|Modified To|	Date Picker|
|Indication|	Plain Text. Allows alphanumeric characters only.|
   iii.	Columns in the search results are sortable (ascending/descending).
iv.	The top 20 documents are listed first, and the remaining results come into view as the user scrolls.
v.	For multi values field like Sponsor Id and Interventional Model, the first value from the list will be displayed as a link. On clicking the link all the values are displayed in the modal. If there is only one value, it will be displayed as text.
   
   <p align="center"> <img width="382" alt="multiple-value-popup"  src="images for ui user guide/multiple-value-popup.png">

2.4.	Study Details
On click of any study title link from either Recent Activity widget or from Search results, study details page will be displayed, grouped by sections. User can expand each section to view detailed information as shown below.
     
  <p align="center"> <img width="382" alt="study-details-page-from-home"  src="images for ui user guide/study-details-page-from-home.png">

<p align="center"> <img width="382" alt="study-details-page-from-search-grid"  src="images for ui user guide/study-details-page-from-search-grid.png">

  2.5.	Audit Trail
NAVIGATION STEPS:

i.	On click of View History / Audit Trail on the Study details page, audit trail page for the study will be loaded. This screen allows the user to view the audit history for the study definition selected.
ii.	Columns in the results are sortable (ascending/descending).
iii.	User can compare any two versions by selecting the corresponding radio buttons in columns “Compare A” and “Compare B”.
  
  <p align="center"> <img width="382" alt="audit-trail-page"  src="images for ui user guide/audit-trail-page.png">

2.6.	Version Comparison
NAVIGATION STEPS:

i.	On click of Version Comparison in the audit trail screen (as shown in Figure 16), version comparison page will be loaded. This screen allows the user to compare two versions of the same study.
ii.	User can navigate between the pages using the breadcrumb navigation.

<p align="center"> <img width="382" alt="version-comparison-page"  src="images for ui user guide/version-comparison-page.png">

2.7.	Study Comparison
NAVIGATION STEPS:
i.	On click of Compare option in the Study Definitions menu as shown in below screenshot, study comparison page will be loaded. This screen allows the user to do a side-by-side comparison of two different study definitions.

  <p align="center"> <img width="382" alt="study-comparison-page"  src="images for ui user guide/study-comparison-page.png">

ii.	User can search any two studies to compare by using the search feature on the left and right sides of the compare. At any point, only two studies can be compared.
iii.	Once the user clicks on search, user is shown a screen to select a study by providing a criteria and finding the relevant study for comparison. The user can search the study by Study title, Sponsor ID and modified date range. 

 <p align="center"> <img width="382" alt="search-study-compare-page"  src="images for ui user guide/search-study-compare-page.png">
    
iv.	Once  the relevant study is found on search, user can click Select to add to compare. 

 <p align="center"> <img width="382" alt="search-study-compare-page-2"  src="images for ui user guide/search-study-compare-page-2.png">
   
   <p align="center"> <img width="382" alt="study-comparison-page"  src="images for ui user guide/study-comparison-page.png">

v.	Once two studies have been searched and selected on the left and right comparison boxes, user can click Compare.
vi.	The application loads a side-by-side content comparison of the study definition JSONs. The comparison highlights the differences and user can scroll through comparison or directly jump to a difference by clicking the comparison highlights on the scrollbar.
SS4
vii.	User can go back to the study comparison screen by clicking on the breadcrumb navigation. 

2.8.	Logout 
On click of Logout, user will be logged out from the application, and gets redirected to the Login Page.
   
   <p align="center"> <img width="382" alt="logout-screen"  src="images for ui user guide/logout-screen.png">

3.	SDR Administrative UI features
This section explains the features available to a SDR Administative user only. The menu options for these features are not visible to a non-admin user in the main menu.
3.1.	System Usage Report
The System Usage Report lists all the API calls made to the SDR application for a given duration. Information is limited to the endpoint called,  the HTTP Operation, Sender ID, the calling IP address, HTTP response code and request date.
NAVIGATION STEPS:
i.	On click of System Usage option in the Reports menu as shown in below screenshot, system usage report screen will be loaded. By default the report is loaded for the last 7 days.
     
  <p align="center"> <img width="382" alt="system-usage-page"  src="images for ui user guide/system-usage-page.png">   

    
ii.	 


iii.	User can change the duration of the report generated to see system usage for last 30 days or last 60 days as well. 
iv.	The results can be further filtered by Response code to see only success or failures or a specific HTTP response status code.
v.	The report columns in the grid are sorted in descending order of Request date. All except Sender ID columns in the result grid are sortable. 


3.2.	Group and User Management
The group and user management features provide the ability to group users and associate them with specific study or group of studies in order to limit access for users only to those study definitions. The creation of groups and setting their criteria as well as associating users to these groups can be done only by an Admin user in the SDR application.
3.2.1.	Group Management 
NAVIGATION STEPS:
i.	An admin user can navigate to the Group Management screen from the Manage main menu. 
ii.	On the Group Management screen, user can Add new groups as well as edit existing groups.
iii.	By default the list of existing groups are displayed on the home screen of Group Management.
    
  <p align="center"> <img width="382" alt="group-management-page"  src="images for ui user guide/group-management-page.png">

iv.	For adding a new group user can click on Add New Group button. User is then redirected to create a new Group.
    
 <p align="center"> <img width="382" alt="add-group-page"  src="images for ui user guide/add-group-page.png">   

v.	Groups should have a distinct name throughout the system. Only AlphaNumeric characters are allowed in the name with a maximum length of 20 characters.
vi.	The Group Permissions allow the admin user to set the access privilege for users belonging to this group i.e. users can either READ or READ & WRITE the studies associated with this group.
 
<p align="center"> <img width="382" alt="add-group-page-2"  src="images for ui user guide/add-group-page-2.png"> 
  
vii.	The Group Filter Field allows  the admin user to configure the rule that combines one or more studies to be associated with a group. When Study Type filter is selected, one or more study types can be selected and added to the rule.
 
<p align="center"> <img width="382" alt="add-group-page-3"  src="images for ui user guide/add-group-page-3.png"> 
  
viii.	In addition to Study Type even specific studies can be searched by selecting the Group Filter Field as Study, which will then allow user to search studies and select them to add to the Group rule.
 
<p align="center"> <img width="382" alt="add-group-page-4"  src="images for ui user guide/add-group-page-4.png"> 
  
ix.	Group Rules can have filters with just one filter field or a combination of available filter fields.
x.	At any point in time, the current rule configuration on the Group can be seen by clicking on the Rules link at the bottom.
 
<p align="center"> <img width="382" alt="add-group-page-5"  src="images for ui user guide/add-group-page-5.png"> 
  
xi.	Once the rule has been configured, user can click Save Group to create the Group.
xii.	All studies that satisfy the rule on a group will be accessible to users belonging to that group. The permission selected on the group will govern the access level (READ or READ & WRITE)
xiii.	Existing Groups can be edited from the home screen of the Group Management feature.
xiv.	Groups can be deleted using the delete action on the list of groups table. Each Group filter field  in a group can be individually deleted and when the last group filter is deleted, the Group is also deleted.
xv.	Note that, when a user creates a new study the group mapping is required to be done by an Admin user if the study does not qualify for any rules on any existing groups in the system. 
xvi.	Also note that, any user having association with at least one group where they have READ & WRITE persmissions can create a new study in SDR. If user belongs to groups which are configured to have only READ permissions, user cannot add/edit study definitions.
3.2.2.	User Management
This screen allows admin users to map existing users in the system to Groups. Note that this screen is not to onboard or provision access to new users to SDR system.
NAVIGATION STEPS:
i.	An admin user can navigate to the User Management screen from the Manage main menu by selecting User option.

<p align="center"> <img width="382" alt="group-management-page-2"  src="images for ui user guide/group-management-page-2.png">   
  
 s feature allows  the admin user to associate users to one or more groups. By default the existing list of user mappings are loaded on the home screen of this feature.
ii.	To create a new user mapping, admin can click on Add New User Mapping.

<p align="center"> <img width="382" alt="add-user-page"  src="images for ui user guide/add-user-page.png">  
 
iii.	On Add User screen, admin can search and select a user to whom a group association needs to be added. 
iv.	Once the user is selected, in the Group dropdown one or more groups can be selected and on clicking Add the mapping can be saved.
 
<p align="center"> <img width="382" alt="add-user-page-2"  src="images for ui user guide/add-user-page-2.png"> 
  
v.	To edit the group association for a specific user, admin can click edit on that user in the mappings table and add/remove group associations.
vi.	Group associations can be deleted from the mappings table which will remove all group associations & revoke access for user to all data in the system
