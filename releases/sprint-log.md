## Sprint Goals

#### Sprint 51: 10 March - 30 March 2021

##### Primary tasks:
- AWS Cognito investigation
- Dash > Dryad migration: validation, review, remove existing content, re-run content loading
- Audit: Proposed table and server changes #597
  - Monitor performance and burst credit usage for 4 servers currently running
- Collection Admin
  - Ingest endpoints for submission file data and submission handling (pause/unpause/resubmit) #592
  - Moving some current dev work onto stage; initial read-only functions
- ETDs: Proquest .unx file processing #585
- Investigate ISO-8859-1 character set for unpacking UCSC submission #614
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis

##### Secondary tasks:
- ETDs: MARC records for UCSC
- Nuxeo feed code and its use of SSM
- SDSC and Wasabi credential changes: #521

##### Releases:
- Dash > Dryad migration: Add validation, review, second migration
- UC Davis ICE SWAP submission to Dryad 


#### Sprint 50: 17 February - 9 March 2021

##### Primary tasks:
- API design: Starting with Lambda access and infrastructure:
  - AWS Cognito investigation (checking with AWS, Kevin M.)
- Dash > Dryad migration: validation, review, remove existing content, re-run content loading
- Audit2 SSM
- Dryad 1116: "+" sign character in file names introducing trouble with Zenodo replication
  - May also examine 4-byte unicode characters: #552
- Collection Admin
  - Ingest endpoint tasks as noted in the Coll Admin ReadME
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation
  - Metadata gap analysis

##### Secondary tasks:
- SDSC and Wasabi credential changes: #521
- ETDs: MARC records for UCSC
- Nuxeo feed code and its use of SSM

##### Releases:
- Dash > Dryad migration: Add validation, review, second migration


#### Sprint 49: 27 January - 16 February 2021

##### Primary tasks:
- API design work: Starting with Lambda access and infrastructure:
  - Using the admin tool as a trial for Lambda packaging strategy
  - AWS Cognito
- Audit2 SSM
- Collection Admin
  - Continue Lambda implementation 
- Palestinian Museum collection
  - Transfer to AWS Snowcones 
  - Metadata gap analysis
  
##### Secondary tasks:
- Docker tutorial documentation
- SDSC and Wasabi credential changes: #521
- ETDs: MARC records for UCSC
- Redirects for Merritt objects?
- 4-byte unicode characters: #552

##### Releases:
- Rails 5 release, 2/9?
- Replic2: SSM
- Dash > Dryad migration: Near completion


#### Sprint 48: 6 January - 26 January 2021

##### Primary tasks:
- API design work: Starting with Lambda access and infrastructure:
  - Using the admin tool as a trial for Lambda packaging strategy
  - AWS Cognito: Kevin (AWS rep) is inclined to think this will work 
  - Try adding access restrictions to Admin tool first, then see how this will work with Collection Admin
  - Test suite account credentials: 545
- Replic2: SSM
  - Create a Docker definition for Replic and Audit (may wait on Audit until Audit 2 work begins)
- Collection Admin
  - Need to decide on implementation language: likely Ruby? 
  - Note: Update to Python 3 by IAS is underway
- Palestinian Museum collection
  - Metadata gap analysis

##### Secondary tasks:
- SDSC and Wasabi credential changes: #521
- Docker tutorial documentation
- ETDs: MARC records for UCSC
- Redirects for Merritt objects (discussed during planning)
- 4-byte unicode characters: #552

##### Releases:
- Rails 5 release, 1/7
- Dash > Dryad migration: Ongoing in two more phases
- Ingest2: SSM, 1/19


#### Sprint 47: 9  December - 22 December 2020

##### Primary tasks:

- Ingest2: SSM: Testing on Stage
- API design work: Starting with Lambda access
- Dash > Dryad collection migration: Testing on Stage
- Collection admin
- ETDs: MARC records for UCSC
- Palestinian Museum collection
- Replic2: SSM

##### Secondary tasks:
- Service Inventory reporting
- SDSC and Wasabi credential changes

##### Releases:
- Rails 5 release, 12/15


#### Sprint 46: 17 November – 8 December 2020

##### Primary tasks:

- Wrap up Rails 5 upgrade
- Ingest2: SSM
- Dash > Dryad collection migration implementation
- SDSC and Wasabi credential changes
- Dev server configuration
- API design work
- Collection creation, initial form functionality enabled via Lambda
- ETDs: MARC records for UCLA and UCSC
- Tableau dashboard work

##### Secondary tasks:
- Replic2: SSM

##### Releases:
- Out-of-band: Storage release to address Minio multi-part download bug
- Rails 5 release to Production (postponed until 12/15)


#### Sprint 45: 28 October - 17 November 2020

##### Primary tasks:

- Continue Rails 5 upgrade for UI/mrt-dashboard
- Ingest2: SSM
- Inventory2: SSM
- Dev server configuration
- Collection creation, initial form functionality enabled via Lambda
- ETDs: MARC records for UCLA and UCSC
- Tableau dashboard work

##### Secondary tasks:
- Dash > Dryad collection migration implementation

##### Releases:
- Rails5 release to Stage and Production?
- Ingest and/or Inventory SSM release to Stage? 


#### Sprint 44: 7 October - 27 October 2020

##### Primary tasks:

- Continue Rails 5 upgrade for UI/mrt-dashboard
- Dockerize LDAP and introduce into EC2 dev environment
- Work with Dave V. to see how we could get an instance of EZID running in a Docker container
- Collection creation, initial form functionality enabled via Lambda
- Dash > Dryad collection migration implementation
- Inventory2
- ETDs: MARC records for UCLA and UCSC
- Tableau dashboard work
  - Merritt Admin tool: moving the process of totaling up numbers to javascript
- Open Context: Generate file list .csv's

##### Releases:
- Store2 release to production, 10/13
  - Release ticket forthcoming; EL note deployment in #uc3-maint on 10/8, 10/12  


#### Sprint 43: 16 September - 6 October 2020

##### Primary tasks:

- Begin Rails 5 upgrade for UI/mrt-dashboard
- Local IDs
  - Complete review of local ID service requests post 9/3 patching
- Storage use of SSM parameter store
  - Support for dynamically resetting configuration values
  - Integrate storage config with Docker
- Collection creation automation
- Campus dashboard design in Tableau w/JSON source data
- Wasabi large object replication
- ETDs database clean-up related to manual ingests
  - Also associated with generating missed MARC records

##### Secondary items:

- Identify local IDs and objects associated with more than one ARK (discussion item for now)
- Make SWORD more strict with regard to REST request types (only a discussion item for now)
- Document process surrounding Dash collection migration 
- Research: Shared EFS between ingest and storage
  - IOPS credits, I3 usage
  - Prototype on Stage
  

#### Sprint 42: 26 August - 15 September 2020

##### Primary tasks:

- Research: Lambda layers and SAM for Lambda deployments
- Storage use of SSM parameter store
  - Support for dynamically resetting configuration values
  - Integrate storage config with Docker
- Document process surrounding Dash collection migration 
- Pull UI Configuration Credentials from SSM
- Collection creation automation
- Campus dashboard design; finishing 1st round of interviews
- Research: Shared EFS between ingest and storage
  - IOPS credits, I3 usage
  - Prototype on Stage
- Wasabi large object replication
- ETDs database clean-up related to manual ingests

##### Releases:
- UI Changes: SSM, module upgrades, Atom feed, error handling
- UI Additional Accessibility Releases

##### Secondary items:
- Research: Pre-signed Ingest


#### Sprint 41: 5 August - 25 August 2020
- Audit and burst credits decision
- Collection creation automation
- Storage use of SSM parameter store
  - Java and Ruby app implementation parity
  - Storage refactoring
  - uc3-aws-cli crons
- Integrate SSM gem into Merritt UI
- Research: Shared EFS between ingest and storage
- IOPS credits, I3 usage
  - Prototype on Stage
- Research: Pre-signed Ingest
  - What makes sense in terms of bucket setup
- Install Perl dependencies for Storage
- Wasabi large object replication
- ETDs database clean-up related to manual ingests
- DataONE
