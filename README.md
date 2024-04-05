- [Introduction](#introduction)
  - [Requirements to Contribute and Propose Changes](#requirements-to-contribute-and-propose-changes)
- [Intended-Audience](#intended-audience)
- [Overview](#overview)
- [Setup and Code Access](#setup-and-code-access)
  - [Pre-Requisites](#pre-requisites)
  - [How to Setup Code](#how-to-setup-code)
  - [Build and Run Application](#build-and-run-application)
- [Other Information](#other-information)
  - [Base solution structure](#base-solution-structure) 
- [Support](#support)

# Introduction

Study Definition Repository (SDR) Reference Implementation is TransCelerate’s vision to catalyze industry-level transformation, enabling digital exchange of study definition information by collaborating with technology providers and standards bodies to create a sustainable open-source Study Definition Repository.

Using this Angular project, user can connect with SDR data, to view the study documents, search certain documents by giving search criteria, to view the revision history details of selected study,to compare differences between two versions of the document and also to compare  two different study documents.

Admin users can access System Usage Report which lists all the API calls made to the SDR application for a given duration with csv export capability and also access group and user management features which provides the ability to group users and associate them with specific study or group of studies in order to limit access for users only to those study definitions.

This [Process Flow Document](https://github.com/transcelerate/ddf-sdr-platform/blob/main/documents/sdr-release-v2.0.2/ddf-sdr-ri-process-flows-v4.0.pdf) provides information regarding user interface functions and system interactions with the SDR at a high level. Please also refer to the [DDF SDR UI User Guide](documents/sdr-release-v2.0.2/ddf-sdr-ri-ui-user-guide-v5.0.pdf) to get started, and the [DDF SDR RI UI Demo video](https://www.youtube.com/playlist?list=PLMXS-Xt7Ou1KNUF-HQKQRRzqfPQEXWb1u).  

**NOTES:** 
- These materials and information are provided by TransCelerate Biopharma Inc. AS IS.  Any party using or relying on this information and these materials do so entirely at their own risk.  Neither TransCelerate nor its members will bear any responsibility or liability for any harm, including indirect or consequential harm, that a user may incur from use or misuse of this information or materials.
- Please be advised that if you implement the code as written, the functionality is designed to collect and store certain personal data (user credentials, email address, IP address) for authentication and audit log purposes. None of this information will be shared with TransCelerate or Accenture for any purpose. Neither TransCelerate nor Accenture bears any responsibility for any collection, use or misuse of personal data that occurs from any implementation of this source code. If you or your organization employ any of the features that collect personal data, you are responsible for compliance with any relevant privacy laws or regulations in any applicable jurisdiction.
- Please be aware that any information you put into the provided tools (including the UI or API) will be visible to all users, so we recommend not using commercially sensitive or confidential information.  You and/or your employer bear all responsibility for anything you share with this project.  TransCelerate, its member companies and any vendors affiliated with the DDF project are not responsible for any harm or loss you occur as a result of uploading any information or code: commercially sensitive, confidential or otherwise.
- To the extent that the SDR Reference Implementation incorporates or relies on any specific branded products or services, such as Azure, this resulted out of the practical necessities associated with making a reference implementation available to demonstrate the SDR’s capabilities.  Users are free to download the source code for the SDR from GitHub and design their own implementations.  Those implementations can be in an environment of the user’s choice, and do not have to be on Azure.
- As of May 2024, the DDF initiative is still the process of setting up operations, and any pull requests submitted will not be triaged at this point in time.

## Requirements to Contribute and Propose Changes
Before participating, you must acknowledge the Contribution License Agreement (CLA).

To acknowledge the CLA, follow these instructions:

- Click [here](https://github.com/transcelerate/ddf-home/blob/main/documents/DDF_CLA_2022MAR28_FINAL.pdf) to download and carefully read the CLA.
- Print the document.
- Complete and sign the document.
- Scan and email a PDF version of the completed and signed document to [DDF@transceleratebiopharmainc.com](mailto:DDF@transceleratebiopharmainc.com?subject=Signed%20CLA).

NOTE: Keep a copy for your records.

# Intended Audience
The contents in this repository allows users to develop SDR Reference Implementation UI application onto their Azure Cloud Subscription via their own GitHub Repos and Workflows. The deployment scripts (YAML Scripts) can be configured and executed from GitHub Actions, leveraging GitHub Secrets to configure target environment specific values.

It assumes a good understanding of Azure concepts and services for hosting the UI application. The audience for this document should:
- have clear understanding of Angular web application framework
- be aware of how to use Azure portal and basic understanding of Azure Cloud Platform
- have basic understanding of GitHub Actions, Secrets & Yaml Scripts

# Overview
- The UI application of the SDR Reference Implementation  allows the user to view and search Study Definitions. The RI UI features include - 
  - Authentication (implemented using MSAL)
  - List Study Definitions and View Details including SoA Matrix
  - Search Study Definitions
  - View Revision History for a Study
  - Compare Study Versions and Different Studies
  - Administrative Features
    - Manage study access with users and groups management functionality.
    - System Usage Report

# Setup and Code Access
## Pre-requisites

1. Install latest version of [Node.js](https://nodejs.org).

2. After installing Node.js, install the Angular CLI globally in cmd prompt using the command below:

3. Active User Account in Azure Active Directory 
```
npm install -g @angular/cli
```
4. Validate if node and npm is installed using below commands in cmd prompt. If it has installed properly, it will show the version installed.
```
node -v
```
```
npm -v
```
5. Try repeating the installation, if there is any issue.
## How to setup code

1. Clone the repo into a local directory using below git command.

```shell
git clone "repo_url"
```
Once repo is cloned, open a terminal window and go to the project root folder using the command as mentioned below.

```shell
cd SDR%20UI/SDR-WebApp
```

2. After navigation to the root folder path as mentioned above, run `npm install` to install the required libraries.
3. Create `environment.development.ts` file under environments folder, and replace the values of the keys with values of the target environment.
And this file is not committed, as it is ignored in `.gitignore` file.
SDR API URL and other secrets are configured in `src/environments/environment.ts` file as shown below. While hosting SDR UI on Azure Platform the values of the keys will be replaced with the environment specific values from DevOps during deployment.

```
export const environment = {
  production: true,
  bypassAuth: false,
  tenantId: '{#AzureAd-TenantId#}', // Azure AD Tenant ID
  authority: '{#AzureAd-Authority#}', // Azure AD login URL (e.g https://login.microsoftonline.com/<tenantId>/)
  clientId: '{#AzureAd-ClientId#}', // Azure App Registration Client ID for UI Application
  Audience: '{#AzureAd-Audience#}', // Audience Scope for UI Application

  redirectUrl: '{#AzureAd-RedirectUrl#}', // HomePage URL of UI application (e.g. : https://localhost:4200/home)
  loginUrl: '{#AzureAd-LoginUrl#}', // Login Page/Root URL of UI application  (e.g. : https://localhost:4200)

  BASE_URL:'{#Apim-BaseUrl#}', // Backend API Root URL (e.g. : https://sdr-apim.azure-api.net/)
  envName: '{#Env-Name#}', // Environment Name (e.g. : Dev/QA/Prod)
};
```

## Build and Run Application

1. Once code setup is done, run the project locally using the below command.

```shell
ng serve
```

2. After code is compiled successfully, open `https://localhost:4200/` in browser to run the application.

For any changes in source code, angular terminal recompiles the code and the browser will reload the application.

3. Use the below commands to commit and push the changes to repo. 

```shell
git commit -m 'message for commit'
git push
```
# Other Information
## Base solution structure

The solution has the following structure:

```
  .
  ├── src
      ├── app
      │   ├── core
      │   ├── features
      │   └── shared
      ├── environments
      │   ├── environment.ts
      ├── styles

```
**core** - contains files related to core angular structure - app.component.ts, app.module.ts, app-routing.module.ts.

**features** - contains application feature modules - dashboard,login,search-study,admin,reports,study-compare,soa.

**shared** - contains application shared modules - audit-trail, breadcrumb, error-component, footer, header, menu, modal-component, study-element-description, version-comparison, simple-search.

**environment.ts** - contains files to configure service URLs and other environment specific secrets.

**styles** - contains common CSS stylesheets.

**Application Authentication :**
- The application uses  Microsoft Authentication Library (MSAL) for user authentication.
- Users with valid credentials (registered in cloud active directory) can login to the application.
- For MSAL integration, the secrets should be configured in environment file as mentioned in the above section.
- A flag 'bypassAuth' is added in environment.ts which allows the user to disable authentication while running in local environment.

**Application Features:**
- After successful login, user will be navigated to home screen 
- Home screen will have *Recent activity widget*, showing list of study documents updated in last 30 days.
- On click of *Study Definitions -> Search*, user will be navigated to *Search page* to search specific study documents based on certain study parameters.
- On click of any Study document, user will be navigated to *Study details page*.
- From Study details page, user  can click  "View Revision History" to view the complete audit trail data for the study document.
- In Study details page, "View SOA Matrix" will be visible for the studies whose usdmVersion is V1.9 or above.
- From Study details page, user  can click  "View SOA Matrix" to view the Schedule of Activities for each Timeline under study designs for a study document.
  - In SoA Matrix, user can export the table to excel which includes the information of particular timeline including schedule timeline table, SoA table having activities data with accordian component inside each activity that has procedures, biomedical concepts and timeline profile data, and additional information using footnotes table also included.
- In *Audit trail page*, user  can select any two versions and click on "Version Comparison" to compare the changes.
- On click of *Study Definitions -> Compare*, user will be navigated to *Compare page* to select two study documents based on certain study parameters and to compare the changes.
- User will be logged out from application on click of logout link in the header.

**Admin Role Application Features:**
- On click of *Reports -> System Usage*, user will be navigated to *Usage Report* to view lists of all the API calls made to the SDR application for a given duration.
  - In System usage report, user can export the report to csv format with a maximum downloaded records limit of 1500 records. This value is configurable.
- On click of *Manage -> Group*, user will be navigated to *Group Management* to view lists of all groups created.
- On click of Add Group button from group management screen, user will be navigated to *Add Group* to create or edit new groups.
- On click of *Manage -> User*, user will be navigated to *User Management* to view lists of all User association with groups created.
- On click of Add User button from user management screen, user will be navigated to *Add User* to create or edit User association with groups.


**URL List**

- Default page (URL: /# )
  - Has login link
  - Uses MSAL oauth authentication
  - Has auth token generation link for accessing SDR APIs
- Home page (URL: /home )
  - Dashboard page with recent activity widget and Menu bar to navigate to search
- Search page (URL: /search )
- Study Details page(URL: /#/details;studyId="";versionId="";usdmVersion="")
- Revision History page (URL: /#/details/audit;studyId="")
- SoA Matrix page (URL: /#/details/soa;studyId="";versionId="";usdmVersion="")
- Version Comparison page(URL: /#/details/audit/compare;studyId="";verA="";verB="";usdmVerA="";usdmVerB="")
- Study Compare page(URL: /comparison)
- System Usage Report(URL: /reports)
- User Management page(URL: /admin/userMap)
- Group Management page(URL: /admin)
  
# Support

- For any technical queries on SDR UI repository, please create an issue [DDF SDR Support](https://github.com/transcelerate/ddf-sdr-support/issues/new?assignees=sdr-support&labels=techSupport&template=TechSupport.yml&title=%5BTechSupport%5D%3A).
- [Raise Incident](https://github.com/transcelerate/ddf-sdr-support/issues/new?assignees=sdr-support&labels=incident&template=Incident.yml&title=%5BIncident%5D%3A+) for any issues with the SDR RI Demo Environment.
- For any other support on DDF SDR RI, reach out to [SDR.Support@accenture.com](mailto:sdr.support@accenture.com).
