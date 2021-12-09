## Sprint Goals

#### Sprint 64: 8 December 2021 - 5 January 2022
- UC Berkeley LIT:
  - Ingest: Functionality and endpoint for detecting object failure in a batch
   - Use Zookeeper queue entries to enable resubmissions
   - Enable all handlers to bubble up ingest queue-related errors 
   - Scan original BID payload for failures (optional)
- Repair objects that were subjected to concurrent updates
  - 118 objects: 
   - 3 objects missing files, each with different repair aspects
   - 115 may be addressable by regenerating inventory records  
  - Many thousands more to review as a group to continue categorizing scan results
- Storage Admin
  - Continue scan results review
  - Implement get-manifest functionality
  - Add a rebuild inventory feature
  - Enhancement to Replication:
   - Expansion on error detection, as well as timing and size
- Documentation of SSM variables for four microservices
- Admin tools
  - Add descriptive information to each report 
  - Refactor using bootstrap tables
- New collections, feeds:
  - Frontera Collection: batch ingests 
  - UCI Nuxeo feed requests
- UC Davis ETDs: Merritt ingest workflow issue
  - MARC record-related code changes
  - ETD database updates
- Respond to CoreTrustSeal feedback

##### Releases:
- Stage: 
  - Change to Ingest to support requeueing
  - Replication enhancements


#### Sprint 63: 17 November - 7 December 2021

##### Primary tasks:
- UC Berkeley LIT:
  - Ingest: Functionality and endpoint for detecting object failure in a batch
   - Scan original BID payload for failures
    - Input will be a batch ID, and output will be a manifest
   - Generate new manifest with failed objects for submission
  - See also: Discussion summary
- UI Investigation
  - Load testing with Siege
  - Deploying cluster mode changes to production when ready
  - ALB logs (working with Ashley)
- Storage Admin
  - Scans in production
   - Deploy mrt-delete file fix to production
  - Production state file deletions
  - Batch handling in Storage Admin UI
  - Enhancement to Replication:
   - Expansion on error detection, as well as timing and size
  - Increasing the number of scan deletes in a single request
- New collections, feeds:
  - Frontera Collection: batch ingests 
  - UCB College of Env Design collections
  - UCI feed request
- UC Davis ETDs: Merritt ingest workflow issue
  - ETD database updates
- Respond to CoreTrustSeal feedback

##### Releases:
- Stage: Replic enhancements
- Prod: 
  - Scan fix for mrt-delete files
  - Ingest: manifest restart
  - UI clustered mode 


#### Sprint 62: 27 October - 16 November 2021

##### Primary tasks:
- Re-queueing for ingest and inventory:
  - Complete enabling use of new endpoints in Coll Admin
- UC Berkeley LIT:
  - Implement retries in Ingest for EZID 502s
  - Introduce 500 entry pagination for atom feeds
  - Investigate load testing for atom feeds  
  - Error-specific message attachments for batch notifications
  - Batch object failure feedback in Coll Admin
  - Callback handler: prototype posting object status to endpoint
  - LocalID lookup endpoint
- Storage Admin
  - Replic: Object Scan
  - Prep for Replic deployment and Inv db update in production
  - Store Admin UI components
  - Replication enhancements: #820
  - Billing database calculations: #839
- New collections, feeds
  - UCLA and UCB College of Env Design collections
  - UCI feed request (1)
- UC Davis ETDs: Merritt ingest workflow issue
- Still expecting CoreTrustSeal feedback

##### Secondary tasks:
- None for this sprint, considering focus on UCB work

##### Releases:
- Stage: Ingest release; separate releases for UCB features
- Prod: Re-queueing endpoint release; UI release with atom feed; possibly separate UI release for Local ID lookup
- Prod: Replication release for Scan
- Production: ETD Service additional MARC record changes for UCSD; correction for UCD issue


#### Sprint 61: 6 October - 26 October 2021

##### Primary tasks:
- Queueing:
  - Storage server.xml config parity across stage/prod
  - Single instance of consumer daemon
  - Ingest API endoints for re-queueing failed inventory and ingest entries
- Storage Admin
  - Replic: Object Scan to Stage
  - UI components
- Collection Admin
  - Cognito, SAML integration in Production
- Admin object clean-up irregularities
  - Re-confirm collection admin profiles do/don't need to be rebuilt
- New Collections and Nuxeo feeds
- UC Davis ETDs process
- Expecting CoreTrustSeal feedback week of 10/11

##### Secondary tasks:
- Admin queue lambda for Storage Admin
- Ingest collection-level pause
  - use of file system (instead of SSM)
- SSM parameter documentation 
- Collection Admin
  - Resubmission capability
- SQL injection prevention for the Admin tool
- API planning and prototyping
  - Understand what our authentication options are
- System Introspection page (pause/unpause keep for next sprint)
- Palestinian Museum collection
  - Waiting for update from UCLA

##### Releases:
- Stage: Object Scan (first iteration done, more to do during the sprint)
- Ingest: for re-queueing API endpoints
- Production: ETD Service MARC record changes for UCSD


#### Sprint 60: 15 September - 5 October 2021

##### Primary tasks:
- Storage Access
  - Access queuing 
- Storage Admin
  - Replic: Object scan
  - UI components
  - Admin queue lambda
- Collection Admin
  - Cognito, SAML integration
- Admin objects: clean-up of irregularities
- Ingest collection-level pause
  - Use of file system (instead of SSM) 
- New Collections and Nuxeo feeds
- UC Davis ETDs process

##### Secondary tasks:
- Collection Admin
  - Explore querying the Inventory queue for display of queue status
- SQL injection prevention for the Admin tool
- API planning and prototyping
  - Understand what our authentication options are
- System Introspection page
- Palestinian Museum collection: Waiting for update from UCLA

##### Releases:
- Stage: Access queueing

#### Sprint 59: 25 August - 14 September 2021

##### Primary tasks:
- Storage Access
  - Analyze the number and type of requests coming in since 8/20, #774
  - Investigate side effects we're seeing on UI servers
  - Start work on Access queuing 
- Storage Admin
  - Replic: Object scan
  - UI components
- Collection Admin
  - Admin object submission
  - Ability to disable the above feature when appropriate
- New Collections and Nuxeo feeds
- UC Davis ETDs process

##### Secondary tasks:
- Ingest collection-level pause (using and SSM parameter)
- SQL injection prevention for the Admin tool
- Build system analysis for Java builds 
- API planning and prototyping
  - Understand what our authentication options are
- System Introspection page
- Admin tool: Cognito SAML integration
- Collection Admin
  - Explore querying the Inventory queue for display of queue status
- Palestinian Museum collection: Waiting for update from UCLA

##### Releases:
- Admin tool releases


#### Sprint 58: 04 August - 24 August 2021

##### Primary tasks:
- Storage Admin
  - Replic: Scan objects for deletion
- Collection Admin
  - Admin object handling
  - Ingest should mint an ARK for profile creation
  - Collection properties updates in Inv database
- API Planning and prototyping
  - Understand what our authentication options are
- Collections and Nuxeo feeds
  - Complete harvest for UCSF WAN Records in production
  - When approved, complete harvest for UCM Library UCCE Santa Barbara
and San Luis Obispo Counties in production
  - Set up Stage collections for testing OAI and SWORD
- CoreTrustSeal application submission
  - Respond to application change requests (none yet)

##### Secondary tasks:
- Storage Admin:
  - UI components (see mockups)
- System Introspection page
- Storage Access Queuing
- Admin Tool: Cognito
  - SAML Ingegration
- Collection Admin
  - Explore querying the Inventory queue for display of queue status
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis

##### Releases:
- Replic: Scan to Stage
- Admin tool releases


#### Sprint 57: 14 July - 03 August 2021

##### Primary tasks:
- Replic optimizations
  - Address Replic cloud timeout
  - Environment variable log direction
  - Fixity check optimization, akin to Audit and Storage
- Collection Admin
  - Wiring up profile API to Coll Admin UI
- Admin tool updates
  - Decouple from CloudFront
  - SAML integration
  - Pagination of report output
- API Planning and prototyping
  - Understand what our authentication options are, in the context of the Merritt API 
- Collections and Nuxeo feeds
  - Establish Nuxeo feeds for new UCM and UCSF collections (Stage & Prod)
  - Finish LDAP entries for UCM and UCSF collections, including new acct setup
- CoreTrustSeal application submission
  - Work on requested revisions to application as they arise

##### Secondary tasks:
- Storage Admin
  - Collaborate on initial lambda setup and UI
- Backslash ('\') or '\u' handling for Ingest
- Collection Admin
  - Explore querying the Inventory queue for display of queue status
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis

##### Releases:
- Replic optimizations to Stage
- Storage which incorporates VersionLink: release to Stage
- Admin tool releases
- Cron host release


#### Sprint 56: 23 June - 13 July 2021

##### Primary tasks:
- Replic optimizations
  - Address Replic cloud timeout
  - Environment variable log direction
  - Fixity check optimization, akin to Audit and Storage
  - Review content copy operation, to determine if an optimized mechanism exists
- Collection Admin
  - Wiring up profile API to Coll Admin UI
- Cognito Exploration
  - SAML integration
- API Gateway Exploration
  - Understand what our authentication options are, in the context of the Merritt API
- Admin tool updates
  - Pagination of report output
- Storage Admin
  - Collaborate on initial lambda setup and UI
- Collections and Nuxeo feeds
  - Establish Nuxeo feed into existing Merritt collection for UCI
  - New UCSF and UCM collections and feeds
- CoreTrustSeal application submission
  - Finalize submission and supporting documentation

##### Secondary tasks:
- Swagger exploration to document microservice endpoints
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis

##### Releases:
- Replic optimizations to Stage
- Inventory '\u' fix deployment
- Storage which incorporates VersionLink: release to Stage
- Ruby security patch deployment for UI


#### Sprint 55: 02 June - 22 June 2021

##### Primary tasks:
- Complete Dryad object updates to correct history
  - Manifest changes complete
  - Monitoring replication
- Collection Admin
  - Wiring up profile API to Coll Admin UI
- Begin work on Storage optimizations
  - Shared EFS
  - Logging w/environment variables
  - Confirmation re-read optimizations (akin to Audit)
- System Consistency reports
  - Automation and identification of data clean-up needs
  - (Effectively done, needs cron automation)
  - Review outcomes of reports and address any anomalies
  - Define requirements for a centralized cron server (temporarily run on ops server)
- New billing database tables for history report
- ETDs: Identify remaining PQ link issue
- New UCSF Collections and Nuxeo feeds
- CoreTrustSeal work

##### Secondary tasks:
- Cognito ALB integration for Coll Admin
- New Ingest endpoint for error notification – sending notifications not only to email but the ZK
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis

##### Releases:
- ALB deployment to production: 6/9 (for cutover)
  - Pair UI and SWORD deployment ahead of cutover 


#### Sprint 54: 12 May - 01 June 2021

##### Primary tasks:
- Collection Admin
  - Wiring up profile API to Coll Admin UI
- Investigate problematic history of some Dash objects migrated to Dryad #649
  - Missing DataONE Dash content from Individual collection to Dryad migration #637 (on hold; EL to check in with DL)
- ETDs: Convert createmarc.py to Python 3
  - Establish development environment with minimized dependencies
  - ezid.py : Python 3 version available?
- New UCSF Collections and Nuxeo feeds
  - Consider moving contents of old private repository into a new repo, or combine into UI repo
- Continued VTD testing for eScholarship
  - Test XSL updates for typical UMI external ID field

##### Secondary tasks:
- Cognito ALB integration for Coll Admin
- System consistency reports: determine which objects/issues need to be addressed and which are expected
- Shared EFS research on David's part for Storage
- New Ingest endpoint for error notification – sending notifications not only to email but the ZK
- Create internal documentation assets to be integrated with READMEs and System inventory (work with Ashley on this)
- Audit instance type evaluation with IAS (prod) – consider sitting down to review stats at end of sprint (number of bytes vs. files)
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis

##### Releases:
- Ingest changes for serialization of pending content
- Dash > Dryad migration: delete.txt related object revisions 


#### Sprint 53: 21 April - 11 May 2021

##### Primary tasks:
- Collection Admin
  - Collection profile creation API in ingest
  - Cognito ALB integration (would keep our application from needing to handle OATH tasks)
- Investigate problematic history of some Dash objects migrated to Dryad #649
  - Inventory failures #650 (three objects will need to be cleaned-up post migration)
- Missing DataONE Dash content from Individual collection to Dryad migration #637
  - On hold per #649
- Continued VTD testing for eScholarship
  - Includes XSL updates (conditional logic) for external ID field
- ETDs: Proquest .unx file processing #585
- Frontera collection gap analysis, continued
  - Requires new spreadsheet from Arhoolie Foundation

##### Secondary tasks:
- New Ingest endpoint for error notification – sending notifications not only to email but the ZK
- Create internal documentation assets to be integrated with READMEs and System inventory (work with Ashley on this)
- Audit instance type evaluation with IAS (prod)
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis
- Investigate ISO-8859-1 character set for unpacking UCSC submission #614

##### Releases:
- Deployment of Audit optimizations to Production (remaining hosts, 4/22)
- Deploy XSL changes to ETD service


#### Sprint 52: 31 March - 20 April 2021

##### Primary tasks:
- AWS Cognito investigation
- Collection Admin
  - Endpoints related to pausing/unpausing submissions #592
  - New endpoint for error notification – sending notifications not only to email but the ZK
  - Work with Martin to on a production Lambda 
  - LDAP client exploration #590
- Audit: Proposed table and server changes #597
  - Monitor performance and burst credit usage during testing
- Delete old Dash collection content #635
  - Schedule running this with the approval of the Dryad team
  - Remove profiles for old Dash collections #639
- cloudConfig.yml change for SDSC, stage only to enable eSchol harvester tests #638
- ETDs: Proquest .unx file processing #585

##### Secondary tasks:
- File size evaluation for Audit – handling files over 5GB #640
- Missing DataONE content from Individual collection to Dryad migration #637
- Audit instance type evaluation with IAS
- Palestinian Museum collection
  - Begin analyzing content on S3 and prototyping ingest automation, #558
  - Metadata gap analysis
- Investigate ISO-8859-1 character set for unpacking UCSC submission #614

##### Releases:
- Goal to move Admin changes from Stage to Production
- Possible deployment of Audit optimizations to Production
- UC Davis ICE SWAP submission to Dryad #437


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
