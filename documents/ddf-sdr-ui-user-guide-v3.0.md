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
