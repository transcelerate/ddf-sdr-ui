- [Introduction](#introduction)
  - [Requirements to Contribute and Propose Changes](#requirements-to-contribute-and-propose-changes)
- [Intended Audience](#intended-audience)
- [Overview](#overview)
  - [Development Setup and Code Access](#development-setup-and-code-access)
  - [Running the UI Using Docker Image](#running-the-ui-using-docker-image)
- [Other Information](#other-information)
  - [Base solution structure](#base-solution-structure)
- [Changes for Release V5.0 (September 2025)](#changes-for-release-v50-september-2025)
- [Support](#support)

# Introduction

Digital Data Flow is TransCelerate’s vision to catalyze industry-level transformation, enabling digital exchange of study definition information by collaborating with technology providers and standards bodies to create a sustainable open-source Study Definition Repository.

A Study Definition Repository (SDR)  is one potential solution that may support end-to-end data flow.  

Using this Angular project, users can connect with SDR data, to view the study documents, search certain documents by giving search criteria, to view the revision history details of the selected study, to compare differences between two versions of the document and to compare two different study documents.

Please refer to the [DDF SDR UI User Guide](documents/sdr-release-v5.0/ddf-sdr-ri-ui-user-guide-v7.0.pdf) to get started.

**NOTES:** 
- These materials and information are provided by TransCelerate Biopharma Inc. AS IS. Any party using or relying on this information and these materials do so entirely at their own risk. Neither TransCelerate nor its members will bear any responsibility or liability for any harm, including indirect or consequential harm, that a user may incur from use or misuse of this information or materials.
- Nothing in this document should be construed as a recommendation that companies use an SDR or this SDR RI.  Companies are solely responsible for determining how to manage their own end-to-end data flow systems and processes.
- The SDR is not a commercial product, rather it is TransCelerate’s attempt to illustrate what might be possible in implementing the USDM developed by CDISC. TransCelerate does not endorse any particular software, system, or service.  And the use of specific brands of products or services by TransCelerate and its collaboration partners in developing the SDR Code should not be viewed as any endorsement of such products or services.  Users can use the USDM for any purpose they choose and can build their own implementations of the SDR using the resources on the initiative’s [GitHub page](https://github.com/transcelerate).
- As of September 2025, the DDF initiative is still the process of setting up operations, and any pull requests submitted will not be triaged at this point in time.

## Requirements to Contribute and Propose Changes
Before participating, you must acknowledge the Contribution License Agreement (CLA).

To acknowledge the CLA, follow these instructions:

- Click [here](https://github.com/transcelerate/ddf-home/blob/main/documents/DDF_CLA_2022MAR28_FINAL.pdf) to download and carefully read the CLA.
- Print the document.
- Complete and sign the document.
- Scan and email a PDF version of the completed and signed document to [DDF@transceleratebiopharmainc.com](mailto:DDF@transceleratebiopharmainc.com?subject=Signed%20CLA).

NOTE: Keep a copy for your records.

# Intended Audience
The contents in this repository enable users to set up SDR Reference Implementation UI application with a Docker container through their own GitHub repositories and workflows. The deployment scripts (YAML Scripts) can be configured and executed from GitHub Actions, leveraging GitHub Secrets to configure target environment specific values.

It assumes a good understanding of Docker concepts and containerization for running the UI application in a container. The audience for this document should:

- have clear understanding of Angular web application framework
- be familiar with Docker and container management
- have basic understanding of GitHub Actions, Secrets & Yaml Scripts

# Overview
- The UI application of the SDR Reference Implementation (RI) allows the user to view and search Study Definitions. The RI UI features include -

  - List Study Definitions and View Details including SoA Matrix
  - Search Study Definitions
  - View Revision History for a Study
  - Compare Study Versions and Different Studies

## Development Setup and Code Access

Refer to the [DDF SDR RI System Maintenance Guide Document](documents/sdr-release-v5.0/ddf-sdr-ri-system-maintenance-guide-v2.0.pdf) for setting up a development instance of SDR. 

## Running the UI Using Docker Image

Our published Docker image is the recommended way to run an instance of the SDR UI: 

```bash
docker run \ 
    -p 4200:80 \    
    -e APP_API_BASE_URL='<API_URL>' \ 
    ghcr.io/transcelerate/ddf-sdr-ui:latest 
```

Where the `API_URL` parameter points to a deployed instance of the SDR API


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

**features** - contains application feature modules - dashboard, search-study, study-compare,soa.

**shared** - contains application shared modules - audit-trail, breadcrumb, error-component, footer, header, menu, modal-component, study-element-description, version-comparison, simple-search.

**environment.ts** - contains files to configure service URLs and other environment specific secrets.

**styles** - contains common CSS stylesheets.

**Application Features:**
- User is initially navigated to home screen
- Home screen will have *Recent activity widget*, showing list of study documents updated in last 30 days.
- On click of *Study Definitions -> Search*, user will be navigated to *Search page* to search specific study documents based on certain study parameters.
- On click of any Study document, user will be navigated to *Study details page*.
- From Study details page, user  can click  "View Revision History" to view the complete audit trail data for the study document.
- In Study details page, "View SOA Matrix" will be visible for the studies whose usdmVersion is V2.0 or above.
- From Study details page, user  can click  "View SOA Matrix" to view the Schedule of Activities for each Timeline under study designs for a study document.
  - In SoA Matrix, user can export the table to excel which includes the information of particular timeline including schedule timeline table, SoA table having activities data with accordion component inside each activity that has procedures, biomedical concepts and timeline profile data, and additional information using footnotes table also included.
- In *Audit trail page*, user  can select any two versions and click on "Version Comparison" to compare the changes.
- On click of *Study Definitions -> Compare*, user will be navigated to *Compare page* to select two study documents based on certain study parameters and to compare the changes.

**URL List**

- Default/Home page (URL: /home)
  - Dashboard page with recent activity widget and Menu bar to navigate to search
- Search page (URL: /search)
- Study Details page(URL: /#/details;studyId="";versionId="";usdmVersion="")
- Revision History page (URL: /#/details/audit;studyId="")
- SoA Matrix page (URL: /#/details/soa;studyId="";versionId="";usdmVersion="")
- Version Comparison page(URL: /#/details/audit/compare;studyId="";verA="";verB="";usdmVerA="";usdmVerB="")
- Study Compare page(URL: /comparison)

# Changes for Release V5.0 (September 2025)

SDR Release V5.0 marks a fundamental shift from previous versions by eliminating Azure dependencies from its architecture, more easily enabling platform-agnostic deployment capabilities across various environments.
  
# Support

- For any technical queries on SDR UI repository, please create an issue [DDF SDR Support](https://github.com/transcelerate/ddf-sdr-support/issues/new?assignees=sdr-support&labels=techSupport&template=TechSupport.yml&title=%5BTechSupport%5D%3A).
