- [Introduction](#introduction)
- [Pre-Requisites](#pre-requisites)
- [Base solution structure](#base-solution-structure)

# Introduction

Digital Data Flow Application is TransCelerate’s vision to catalyze industry-level transformation, enabling digital exchange of study definition information by collaborating with technology providers and standards bodies to create a sustainable open-source Study Definition Repository.

In this Angular project, user can view different versions of study element and their details

# Pre-requisites

1. Install [Node.js](https://nodejs.org) with default options.

2. Install the Angular CLI globally in cmd prompt:

```
npm install -g @angular/cli
```
3. Validate if node and npm is installed using below commands in cmd prompt
```
node -v
```
```
npm -v
```

### How to setup code

3. Clone the repo

```shell
git clone "repo_url"
cd SDR%20UI/SDR-WebApp
```
Open a terminal window and go to the project root folder as mentioned above.

4. Run `npm install` to install the required libraries.

### How To Run

5. Run `ng serve` for a dev server.

Navigate to `http://localhost:4200/`.

The browser will automatically reload if you change any of the source files.

# Base solution structure

The solution has the following structure:

```
  .
  ├── src
      ├── app
      │   ├── core
      │   ├── features
      │   └── shared
      ├── environments
      │   ├── environment(local)
      │   ├── environment.dev2
      │   ├── environment.qa
      │   ├── environment.prod
      ├── styles

```

### Making requests to the backend API

API URL is configured in `src/environments/environment.ts` file for localhost, defaulted to one of the dev environments.

Relevant environment variables should be changed if we need to point localhost to a different environment. 

### Certificate Installation for APIM
1. Contact system admin and get the environment specific client certificates and install.

2. While accessing homepage, certificate selection prompt will be shown, need to select environment specific certificate to proceed further and access the web application.

**General functionality:**

- Login page, uses MSAL
- After successfull login, user will be navigated to home screen with recent activity widget having list of study documents updated in last 30 days.
- Search page: User can search specific study documents based on certain study parameters.
- On click of any Study document, user will be navigated to Study details page.
- From Study details page, user  can click  "View History / Audit Trail" to view the complete audit trail data for the study document
- In audit trail page, user  can select any two versions and click on "Version Comparison" to compare the changes.
- user will be logged out from application on click of logout url in the header.


**The general page breakdown looks like this:**

- Default page (URL: /# )
  - Has login link
  - Uses MSAL oauth authentication (store the token in localStorage)
- Home page (URL: /home )
  - Dashboard page with recent activity widget and Menu bar to navigate to search
- Search page (URL: /search )
- Study Details page(URL: /#/details;studyId="")
- Audit page(URL: /#/details/audit;studyId="")
- Version Comparison page(URL: /#/details/audit/compare;studyId="";versionA="";versionB="")