## Sprint Goals

#### Sprint 122: July 16, 2025 - August 5, 2025
- Ingest
  - Callback not working for failed jobs: #2103
  - Design: Profile access changes pertaining to repo and storage in S3
  - Move mrt-ingest-profiles and mrt-dashboard-config from CDLIB to CDLUC3: #1813
  - UCJEPS batch investigation: #157
  - ZK connection retry limit reached: #158
- Inventory
 - Replace Merritt Docker Initialization with Inventory api calls: #2252
 - Microservice start on initialization: #2228
 - Timeout communicating with Storage: #2308
- Nuxeo object updates
  - Backup bucket review for changeToken content: #2290
  - Billing database reset for FY24-25, post changeToken process: #153
- UC3 account migration
  - New Admin Tool - Consistency Reports Framework: #2302
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - Additional drives to process: #2206
- ETDs
  - Support ETDs v2 rollout
#### Releases:
- Stage: ...
- Production: ...

#### Sprint 121: June 25, 2025 - July 15, 2025
- Ingest
  - Callback not working for failed jobs: #2103
  - Design: Profile access changes pertaining to repo and storage in S3
  - Move mrt-ingest-profiles and mrt-dashboard-config from CDLIB to CDLUC3: #1813
- Inventory
 - Replace Merritt Docker Initialization with Inventory api calls: #2252
 - Microservice start on initialization: #2228
 - Timeout communicating with Storage: #2308
- Merritt Core
  - Recent build issue with Ingest: #2306
- Nuxeo object updates
  - Backup bucket review for changeToken content: #2290
  - Billing database reset for FY24-25, post changeToken process: #153
- Nuxeo direct deposits
  - On hold per PAD dev
- UC3 account migration
  - New Admin Tool - Consistency Reports Framework: #2302
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - Additional drives to process: #2206
- ETDs
  - ETDs v1: ProQuest changed their external ID string - update service regex to parse: #2262
#### Releases:
- Stage: Merritt UI 1.7.20, Gem Updates
- Production: Merritt UI 1.7.20, Gem Updates

#### Sprint 120: June 4, 2025 - June 24, 2025
- Ingest
  - Design: Profile access changes pertaining to repo and storage in S3: Ticket TBD
  - Move mrt-ingest-profiles and mrt-dashboard-config from CDLIB to CDLUC3: #1813
- Nuxeo Object Updates
  - changeToken collections fix: #2140
- Nuxeo direct deposits
  - New UCR tickets available: #s 2291-2297
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
  - ZK: run 3 node cluster in ECS: #2274
  - Replace Merritt Docker Initialization with inventory api calls: #2252
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - Additional drives to process: #2206
- ETDs
  - ETDs v1: ProQuest changed their external ID string - update service regex to parse: #2262
#### Releases:
- Stage: ...
- Production: Storage - no backout exception

#### Sprint 119: May 14, 2025 - June 3, 2025
- ZooKeeper
  - ZK peristent lock for storage: #2272
  - Truncate eschol metadata that goes to the Merritt UI: #2183 
- Nuxeo Object Updates
  - changeToken collections fix: #2140
- Nuxeo direct deposits
  - New UCR tickets available: #s 2256-2261
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - AWS java sdk v1 to v2 deploy: #2187
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
  - Replace Merritt Docker Initialization with inventory api calls: #2252
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - Additional drives to process: #2206
- ETDs
  - ETDs v1: ProQuest changed their external ID string - update service regex to parse: #2262
#### Releases:
- Stage: ZK peristent lock for storage, truncate eSchol data, Storage - no backout exception
- Production: ZK peristent lock for storage, truncate eSchol data; AWS java sdk v1 to v2

#### Sprint 118: April 23, 2025 - May 13, 2025
- ZooKeeper
  - Truncate eschol metadata that goes to the Merritt UI: #2183 
- Nuxeo Object Updates
  - changeToken collections fix: #2140
- Nuxeo direct deposits
  - New UCR tickets available: 
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - AWS java sdk v1 to v2 deploy: #2187
  - mrt-core2 dependency scan update for MySQL connector: #2213
    - No patch available yet
- LDAP
  - Eliminate LDAP cert check cron, script, consistency check: #2235
- UI
  - Investigate recent UI 500 errors (not mysql related): #2245
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
  - Replace Merritt Docker Initialization with inventory api calls: #2252
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - Additional drives to process: #2206
- ETDs
  - New createmarc script error starting April 18: #2253
#### Releases:
- Stage: UI Gem Update 1.7.12
- Production: UI Gem Update 1.7.12

#### Sprint 117: April 2, 2025 - April 22, 2025
- Ingest
  - Implement Estimate Handler to compute object size: #2043
  - Provisioning Handler to use Estimate Handler: #2203
  - Zookeeper lock not removed upon Batch deletion: #2216
  - Manifest validation bug: #2168
- Nuxeo Object Updates
  - changeToken collections fix: #2140
  - Storage FIX - update to late update handling needs correction: #2207
- Nuxeo direct deposits
  - New UCR tickets available: #2219-2224
  - New UCI deposit requested: #2225
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - AWS java sdk v1 to v2 deploy: #2187
  - mrt-core2 dependency scan update for MySQL connector: #2213
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
  - Modify mrt-cloud to avoid the use of InstanceProfileCredentialsProvider: #2210
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - Four remaining drives to process: #2206
- ETDs
  - MARC records for UCI: #2017
#### Releases:
- Stage: 
  - Ingest - Estimate/Provision/Batch deletion/Deduplication
  - Storage FIX previous
  - Tomcat upgrade to 9.0.104
  - UI Release - service jqueryui from web server to simplify ECS end to end testing
- Production:
  - Ingest - Estimate/Provision/Batch deletion/Deduplication
  - Storage FIX previous
  - Tomcat upgrade to 9.0.104
  - UI Release - service jqueryui from web server to simplify ECS end to end testing

#### Sprint 116:  March 12, 2025 - April 1, 2025
- Ingest
  - Implement Estimate Handler to compute object size: #2043
  - Manifest validation bug: #2168
- Storage
  - Continue investigating high swap usage: deleteOnExitHook fix: #127
- Nuxeo Object Updates
  - changeToken collections fix: #2140
- Inventory
  - Remove Inv entries for UC Berkeley Library Sheet Music collection: #117
- Nuxeo direct deposits
  - Additional tickets forthcoming
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - AWS java sdk v1 to v2 deploy: #2187
  - Gem updates: merritt-docker, mrt-integ-tests, mrt-admin-sinatra, mrt-cron, s3-sinatra: #2194
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Build DEV stack in UC3 account: #2163
- Depositor tools survey #96
- Remove checkm files from affected objects: #2186
- UCB Law Robbins Collection
  - New batch submissions: #2166
- ETDs
  - MARC records for UCI: #2017
  - ETD deposit issue: #2083
#### Releases:
- Stage: 
  - Ingest: 
- Production:
  - Ingest: Merritt UI and mrt-atom gem updates

#### Sprint 115:  February 19, 2025 - March 11, 2025
- Ingest
  - Implement Estimate Handler to compute object size: #2043
  - Ingest & Admin Tool: Requeue of Ingest Job which triggers redownload: #2158
  - Zookeeper Job status is null: #2121
  - Batch processing logic for HOLD condition not correct: #2142 
- Storage
  - Continue investigating high swap usage: deleteOnExitHook fix: #127
- Nuxeo Object Updates
  - changeToken collections fix: #2140
- Inventory
  - Remove Inv entries for UC Berkeley Library Sheet Music collection: #117
- Nuxeo direct deposits
  - UCR Nuxeo feed: Sherman Indian Museum: #2148
  - Additional tickets forthcoming
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - BOM update 2.1 -> 2.2 + Java 11 compile: #2068
  - Sinatra gem updates needed to 2 of 3 Sinatra repos
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Paginate all queries: #2165
  - Build DEV stack in UC3 account: #2163
- Depositor tools survey #96
- UCB Law Robbins Collection
  - New batch to prep
- ETDs
  - MARC records for UCI: #2017
  - ETD deposit issue: #2083
#### Releases:
- Stage: 
  - Ingest: ZooKeeper, Storage: deleteOnExitHook fix
- Production:
  - Ingest: ZooKeeper locking issue
  - Ingest: Zookeeper changes to eliminate Orphan znodes
  - Storage: deleteOnExitHook fix (SWAP usage)
  - BOM 2.1->2.2
  - UI Gem update 1.7.4

#### Sprint 114:  January 29, 2025 - February 18, 2025
- Ingest
  - Implement Estimate Handler to compute object size: #2043
  - Zookeeper Job status is null: #2121
  - Batch processing logic for HOLD condition not correct: #2142
- Nuxeo Object Updates – Object update strategy
  - changeToken collections fix: #2140
- Nuxeo direct deposits
  UCR Nuxeo feed: Sherman Indian Museum: #2148
  - Additional tickets in Sprint 114, 115
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - BOM update 2.1 -> 2.2 + Java 11 compile: #2068
- UC3 account migration
  - Begin UC3 admin functionality: #2123
- Depositor tools survey #96
- UCB Law Robbins Collection
  - New batch to prep
- ETDs
  - MARC records for UCI: #2017
  - ETD deposit issue: #2083
#### Releases
- Stage: 
  - BOM update 2.1 -> 2.2 + Java 11 compile
- Production:
  - BOM update 2.1 -> 2.2 + Java 11 compile

#### Sprint 113:  January 8, 2025 - January 28, 2025
- Ingest
  - [Ingest] Support Batch Update Reporting State: #2058
  - Implement Estimate Handler to compute object size: #2043
  - Zookeeper ingest status is incorrect: #2125
  - Zookeeper Job status is null: #2121
  - Batch processing logic for HOLD condition not correct: #2142
- Nuxeo Object Updates – Object update strategy
  - changeToken collections fix: #2140
- Nuxeo direct deposits
  - UCR Nuxeo feed: Gage Canal Collection: #2114
  - Additional tickets forthcoming
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - BOM update 2.1 -> 2.2 + Java 11 compile: #2068
  - Zookeeper - Upgrade server software to version 3.9.3: #2139
  - GH Actions: #2124, #2131
- UC3 account migration
  - Begin UC3 admin functionality: #2123
  - Try Jepson-style bucket policies for internal use - Terry will configure with Martin's support: #120
  - Request from Ashley: create UC3-wide Admin Tool for EC2 inventory: #2130
- Depositor tools survey #96
- UCB Law Robbins Collection
  - Multi-drive batch ingest #2038
- ETDs
  - MARC records for UCI: #2017
  - ETD deposit issue: #2083
  - ETDs v1: Add retry logic to createmarc for its use of eSchol xtf search: #2143
#### Releases
- Stage: 
  - ZooKeeper 3.9.3 server and client, batch update reporting
- Production:
  - ZooKeeper 3.9.3 server and client, batch update reporting

#### Sprint 112:  December 4, 2024 - December 20, 2024
- Ingest
  - [Ingest] Support Batch Update Reporting State: #2058
  - Implement Estimate Handler to compute object size: #2043
  - Zookeeper ingest status is incorrect: #2125
  - Zookeeper Job status is null: #2121
- Nuxeo Object Updates – Object update strategy
  - Storage "fix" - Inventory "replace" methods #1815
  - Provide UCI with file lists of changeToken-impacted objects #1938
- Nuxeo direct deposits
  - UCR Nuxeo feed: Gage Canal Collection: #2114
  - Additional tickets forthcoming
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
- Admin
  - Begin UC3 admin functionality: #2123
- Collection Analysis
  - With UCSC: Second round presentation on depositor tools at December BD-CKG
- Depositor tools survey #96
- UCB Law Robbins Collection
  - Multi-drive batch ingest #2038
- ETDs
  - UCSB Legacy ETDs: #1926
  - MARC records for UCI: #2017
  - ETD deposit issue: #2083
#### Releases
- Stage: 
  - Storage object update: FIX changeToken: #2120
- Production:
  - Storage object update: FIX changeToken: #2120

#### Sprint 111:  November 6, 2024 - November 26, 2024
- Ingest
  - [Ingest] Investigate Ingest not communicating with Zookeeper after patching: #2100
  - [Ingest] Support Batch Update Reporting State: #2058
  - Implement Estimate Handler to compute object size: #2043
- Zookeeper
  - ZK: job under 2 batch states after requeue (associated Admin tool report): #2075
- Nuxeo Object Updates – Object update strategy
  - Storage "fix" - Inventory "replace" methods #1815
  - Provide UCI with file lists of changeToken-impacted objects #1938
- Nuxeo direct deposits
  - UCI Nuxeo feed: School of Social Ecology Living Archive of Poetic Justice collection: #2090
  - Restart and monitor existing deposits
- Systems and dependencies
  - Ingest Workspace: Advanced Sceptre Config: #2102
  - [Storage] JVM killed by operating system: #2101
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - Merritt UI: rails update to v7.2: #2066
- Admin
  - UC3 acct admin tool SSO auth: #2097
  - Admin: New Object report based on Producer Files for a Mnemonic: #2095
- Collection Health Prototype
  - With UCSC: Second round presentation on depositor tools at December BD-CKG
- Depositor tools survey #96
- UCB Law Robbins Collection
  - Batches 7 and 8 ingest #2038
- ETDs
  - UCSB Legacy ETDs: #1926
  - MARC records for UCI: #2017
  - ETD deposit issue: #2083
- UCSD
  - UCSD test collection on Stage: #2099
#### Releases:
- Stage:
  - Ingest - Callback state fix and ZK sessionTimeout increase: #2104
  - Ingest Zookeeper session expiration: #2109
  - Merritt UI Rails 7.2 change: #2116
  - UI - fix prod logging: #2122
- Production:
  - Ingest - Callback state fix and ZK sessionTimeout increase: #2104
  - Ingest Zookeeper session expiration: #2109
  - Merritt UI Rails 7.2 change: #2116
  - UI - fix prod logging: #2122

#### Sprint 110:  October 15, 2024 - November 5, 2024
- Ingest 
  - [Ingest] Support Batch Update Reporting State: #2058
  - Ensure batch/job cleanup is performing appropriately: #2069
  - [Ingest] Notification title does not reflect a failed batch submission: #2071
- Inventory
  - [Inventory] Zookeeper Ephemeral lock management: #2060
- Storage
  - SDSC data migration from Minio to native S3 #1701
- Nuxeo Object Updates – Object update strategy
  - Storage "fix" - Inventory "replace" methods #1815
  - Provide UCI with file lists of changeToken-impacted objects #1938
- UI
  - UI: Fuzzy filename search: #2052
- Systems and dependencies
  - End-of-support for Java v1.x AWS SDK - December 31, 2025: #1972
  - Merritt UI: rails update to v7.2: #2066
  - add inv_tasks to docker tables and to mrt-dashboard test image: #2015
- Admin
  - Add "LDAP Collection Map" report to consistency reports
  - Check/validate deploy tags from git repo for deploys
  - Remove Admin code that reads old ZK queue data
  - Migration to AWS SSO for Admin
- Collection Health Prototype
  - Gather feedback from BD-CKG and UCB LIT
  - Upcoming presentation on depositor tools at BD-CKG
  - Depositor tools survey #96
- UCB Law Robbins Collection
  - Batch 7 ingest #2038
- ETDs
  - Investigate ETD createmarc failure: #2074
  - UCSB Legacy ETDs: #1926

#### Releases:
- Stage:
  - Ingest: Local ID lock, new status, bug fixes
  - Ingest: Remove conflicting logging provider + decrease threads
  - Inventory: Fix ephemeral ZK lock
  - UI: Fuzzy search
- Production: 
  - merritt-aws nt2 entry updates complete
  - Ingest: Local ID lock, new status, bug fixes
  - Ingest: Remove conflicting logging provider + decrease threads
  - Inventory: Fix ephemeral ZK lock
  - UI: Fuzzy search
  - ETDs v1: CSV report sql queries

#### Sprint 109: September 25, 2024 - October 15, 2024
- Ingest
  - Queue redesign (Part 3) - Support additional zookeeper states: #1441
  - All on Stage #s 1975, 1883, 1981, 1982, 2023
- Storage - Object update strategy
  - SDSC data migration from Minio to native S3 #1701
- Nuxeo Object Updates
  - Storage "fix" - Inventory "replace" methods #1815
  - Provide UCI with file lists of changeToken-impacted objects #1938
- Admin
  - Migrate non core "Admin" tasks in Ingest to the Merritt Admin Tool (m2 migration) #1908
  - Terry/Mark - notes from Admin Tool testing #2035
  - Colladmin - show secondary node count on "manage collection nodes" page ALSO ensure that missing secondary nodes appear in the secondary node report #2036
- Collection Health Prototype
  - Gather feedback from BD-CKG and UCB LIT
- Depositor tools survey #96
- UCB Law Robbins Collection
  - Batch 6 validation #2018
  - Batch 7 ingest #2038
- ETDs
  - UCSB Legacy ETDs #1926

#### Releases:
Stage: Queue redesign; UI gem updates
Production: Queue redesign; UI gem updates


#### Sprint 108: September 3, 2024 - September 24, 2024
- Ingest
  - Queue redesign (Part 3) - Support additional zookeeper states: #1441
  - While running Ingest IT tests, the node /locks/collections/merritt_test_content keeps getting set #1975
  - Use new mrt-zk methods for queue hold, collection hold, ark locking #1883
  - Create queue test plan #1934
- Storage, Update object strategy
  - SDSC data migration from Minio to native S3 #1701
- UC3 AWS Account + Content Ingest
  - Content Ingest Workspace Design #1767
- Nuxeo Object Updates
  - Storage "fix" - Inventory "replace" methods #1815
  - Provide UCI with file lists of changeToken-impacted objects #1938
- Collection Health Prototype
  - Gather feedback from BD-CKG and UCB LIT
- Depositor tools survey #96
- UCB Law Robbins Collection
  - Batch 6 validation
- ETDs
  - UCSB Legacy ETDs #1926

#### Releases:
Stage: Queue redesign
Production:

#### Sprint 107: August 14, 2024 - September 3, 2024
- Ingest
  - Queue redesign (Part 3) - Support additional zookeeper states: #1441
  - While running Ingest IT tests, the node /locks/collections/merritt_test_content 
keeps getting set #1975
  - Use new mrt-zk methods for queue hold, collection hold, ark locking #1883
  - Create queue test plan #1934
- Storage, Update object strategy
  - SDSC S3 Storage #1927
- Dev-ops
  - Gem updates for xml gem - update everywhere #2003
- UC3 AWS Account
  - Provision EBS as an ingest workspace #1929
- Content Ingest
  - Content Ingest Workspace Design #1767
  - Interim EFS staging volume - define the request #1901
- Nuxeo Object Updates
  - Provide UCI with file lists of changeToken-impacted objects #1938
- Collection Health Prototype
  - Gather feedback from BD-CKG and UCB LIT
- UCB Law Robbins Collection
  - Batch 5 validation
  - Batch 6 ingest
- ETDs
  - UCSB Legacy ETDs #1926

#### Releases:
Stage: Audit updates
Production: Audit updates

#### Sprint 106: July 17, 2024 - August 6, 2024
- Ingest
  - Queue redesign (Part 3) - Support additional zookeeper states: #1441
  - Integrate mrt-zk library into inventory service #1868
  - Use new mrt-zk methods for queue hold, collection hold, ark locking #1883
  - Create queue test plan #1934
- Storage, Update object strategy
  - SDSC S3 Storage #1927
- UC3 AWS account
  - UC3 AWS: Explore AWS CodeArtifact to simplify CodeBuild jobs #1931
  - UC3 AWS: Create Cloud Front Distribution for Merritt DEV resources #1850
- Dev-ops
  - Dependabot: gem updates, June-July 2024 #1935
- Admin
  - Limit popups when deleting multiple queue jobs #1946
- Nuxeo Object Updates
  - Providing UCI with file lists of changeToken-impacted objects #1938
- Collection Health Prototype
  - Presentation of Analysis documentation at BD-CKG
- UCB Law Robbins Collection
  - Batch 5 validation
  - Batch 6 ingest
- ETDs
  - UCI records processing: #1942
  - UCSB Legacy ETDs #1926
  - Update ETD sender address: #1970

#### Releases:
Stage:
Production:

#### Sprint 105: June 19, 2024 - July 9, 2024
- Ingest
  - Queue redesign (Part 3) - Support additional zookeeper states: #1441
  - Integrate mrt-zk library into inventory service #1868
  - Use new mrt-zk methods for queue hold, collection hold, ark locking #1883
  - Create queue test plan #1934
- Storage, Update object strategy
  - SDSC S3 Storage #1927
  - Establish SDSC backup bucket for Nuxeo object correction #1897
- UC3 AWS account
  - UC3 AWS: Explore AWS CodeArtifact to simplify CodeBuild jobs #1931
  - UC3 AWS: Create Cloud Front Distribution for Merritt DEV resources #1850
- Dev-ops
  - [Merritt-Tomcat] Add "ingestqueue" symlink back into Tomcat server.xml for ingest workers #95
  - Capture/document all VSCode dependencies #1944
  - Dependabot: gem updates, June-July 2024 #1935
- Admin
  - Limit popups when deleting multiple queue jobs #1946
- Nuxeo Object Updates
  - Providing UCI with file lists of changeToken-impacted objects #1938
- Collection Health Prototype
  - Analysis documentation: #1895
- UCB Law Robbins Collection
  - Batch 3-4 validation: #1939
- ETDs
  - UCI records processing: #1942
  - UCSB Legacy ETDs #1926

#### Releases:
Stage:
- Inventory mrt-zk implementation, Ingest mrt-zk implementation (to Production in August)
Production:
- Store mrt-zk implementation

#### Sprint 104:  May 29, 2024 - June 18, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - Store/Access implementation with mrt-zk library: #1869
  - Use new mrt-zk methods for queue hold, collection hold, ark locking #1883
- Collection maintenance
  - Download obsolete items report and note the owners and collections that should be deleted: #1891
- Storage, Update object strategy
  - SDSC S3 Storage #1927
  - Establish SDSC backup bucket for Nuxeo object correction #1897
  - Storage "Fix" Framework: #1876
  - Storage "fix" - Inventory "replace" methods: #1815
  - File names generated via Nuxeo harvest include unneeded characters: #1655
- UC3 AWS account
  - UC3 AWS: Create Cloud Front Distribution for Merritt DEV resources #1850
  - UC3 AWS: migrate from default uc3 s3 buckets used by admin tool #1922
- Collection Health Prototype
  - Analysis documentation: #1895
  - Consider sample output in PDF form to accompany documentation
- UCB Law Robbins Collection
  - Batch 4 ingest: BSLW-RBN-02
- ETDs
  - UCSB Legacy ETDs #1926

#### Releases:
Stage:
- Ingest mrt-zk implementation, Store/Access mrt-zk implementation
Production:
- Access mrt-zk implementation

#### Sprint 103:  May 8, 2024 - May 28, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - Store/Access implementation with mrt-zk library: #1869
  - Migrate queue admin to Admin Tool: #1819
  - Migrate non core "Admin" tasks in Ingest to the Merritt Admin Tool: #1796
  - mrt-zk: support legacy queue structure for admin tool integration (ruby): #1866
- Collection maintenance
  - Download obsolete items report and note the owners and collections that should be deleted: #1891
- Storage, Update object strategy
  - Storage "Fix" Framework: #1876
  - Storage "fix" - Inventory "replace" methods: #1815
  - Store object “reset”: #1774
  - File names generated via Nuxeo harvest include unneeded characters: #1655
- Admin
  - Admin Tool Object Management Option Changes: #1886
  - Update build instructions for mrt-zk and for admin tool: #1892
- Devops
  - Ansible documentation: #1778, #1779
  - OpenSearch documentation: #74
  - Merritt UI: Object endpoints documentation: #1839
- Collection Health Prototype
  - Analysis documentation: #1895
  - Consider sample output in PDF form to accompany documentation
- UCB Law Robbins Collection
  - Batch 4 ingest: BSLW-RBN-02
- ETDs
  - Process UCI April USMARC records: #1890

#### Releases:
Stage:
- UI - Privacy Statement and Gem Updates
- ETDs - Update 856 field indicator for UCI
- Ingest - Queue redesign
Production:
- UI - Privacy Statement and Gem Updates
- ETDs - Update 856 field indicator for UCI

#### Sprint 102:  April, 17 2024 - May 7, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - Ingest implementation with mrt-zk library
  - Migrate queue admin to Admin Tool: #1819
  - Migrate non core "Admin" tasks in Ingest to the Merritt Admin Tool: #1796
  - mrt-zk: support legacy queue structure for admin tool integration (ruby): #1866
  - mrt-zk: support storage locks and access queue functions (java and ruby): #1867
- Dryad object deletes
  - Review and update documentation: #72
  - Remove Dryad user and collection LDAP entries from Stage and Prod: #88
  - Remove Dryad collection content on Stage: # (forthcoming)
- Storage, Update object strategy
  - Storage "fix" - Inventory "replace" methods: #1815
  - Feature to update object/file information in Merritt: #1720
  - Store object “reset”: #1774
  - String together object modification features: #1775
  - File names generated via Nuxeo harvest include unneeded characters: #1655
- Coll Admin
  - jquery error occurs during profile creation process: #1862
  - Unable to reach the collection admin object submission page in Coll Admin: #1863
- Devops
  - Ansible documentation: #1778, #1779
  - OpenSearch documentation: #74
- Dependency updates
  - BOM 1.8: #1855
- End-to-end tests
  - Integration test - Add UTF-8 local ID: #1835
- Collection Health Prototype
  - Analysis documentation
  - Consider sample output in PDF form to accompany documentation
- UCB Law Robbins Collection
  - Batch 4 ingest: BSLW-RBN-02
  - File lists to confirm re: removing earlier batch content from ZFS

#### Releases:
Stage:
- BOM 1.8
Production:
- BOM 1.8
  
#### Sprint 101:  March 27, 2023 - April 16, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - Define and implement new Merritt ZK library: #1828
  - https://github.com/CDLUC3/mrt-doc/blob/main/design/queue-2023/states.md
  - Migrate queue admin to Admin Tool: #1819
  - Migrate non core "Admin" tasks in Ingest to the Merritt Admin Tool: #1796
- Dryad object deletes
  - Dryad removal plan: #71
  - Review and update documentation: #72
  - Delete scripts being integrated with new Storage servers
- Storage, Update object strategy
  - Feature to update object/file information in Merritt: #1720
  - Store object “reset”: #1774
  - String together object modification features: #1775
  - File names generated via Nuxeo harvest include unneeded characters: #1655
  - Explore Magika for file identification #1795
- Merritt UI
  - Dependabot: mrt-dashboard gem updates: #1825
  - Expose object api endpoint for end user
- Devops
  - UI: update to Ruby 3.2, deploy new servers
  - Cron for mrt-ansible-service-restart playbook: #1761
  - Ansible documentation: #1778, #1779
  - OpenSearch documentation: #74
  - Tomcat 8.5 is EOL in March: #54
  - Bulk correct n2t entries that resolve to merritt-aws.cdlib.org #1782
- Dependency updates
  - BOM 1.7: #1823
- End-to-end tests
  - Modify V1/V2 End to End Test Cases to Validate Add vs Update behavior: #1834
  - Integration test - Add UTF-8 local ID: #1835
- Collection Health Prototype
  - LOC presentation
  - Analysis documentation
- UCB Law Robbins Collection
  - Batch 3 ingest: RBN-04: #1776
  - Batch 4 ingest: BSLW-RBN-02

#### Releases:
Stage:
- BOM 1.7
- UI gem updates
Production:
- BOM 1.7
- UI gem updates

#### Sprint 100:  March 6, 2024 - March 26, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - https://github.com/CDLUC3/mrt-doc/blob/main/design/queue-2023/states.md
  - Queue redesign documentation
  - Migrate queue admin to Admin Tool: #1819
- Dryad object deletes
  - Dryad removal plan: #71
- Storage
  - Reconcile Storage Bytes Added with OpenSearch Log Byte Counts from Storage Logs: #1790
- EZID link checker report
  - Update eSchol ARKs to status Unavailable: #629
- Nuxeo Harvester and Object update strategy
  - Feature to update object/file information in Merritt: #1720
  - Store object “reset”: #1774
  - String together object modification features: #1775
  - File names generated via Nuxeo harvest include unneeded characters: #1655
- Devops
  - Cron for mrt-ansible-service-restart playbook: #1761
  - OpenDJ LDAP maintenance: #1652
  - Ansible documentation: #1778, #1779
  - OpenSearch documentation: #74
  - Check on SDSC migration status: #1701 (for after Dryad deletes)
- Dependency updates
  - BOM 1.7
- Collection Health Prototype
  - Presenting at Born Digital CKG, 3/7 for feedback
- OpenSearch
  - Lambda logs into OpenSearch: #1511
- UCB Law Robbins Collection
  - Batch 3 ingest: RBN-04
- UCSF
  - CTP archive screenshots to GitHub: #1523

#### Releases:
Stage:
- Storage: OpenSearch fix for bytes
- Ingest: JSON serialization
Production:
- Storage: OpenSearch fix for bytes
- Ingest: JSON serialization

#### Sprint 99:  February 7, 2024 - March 5, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - https://github.com/CDLUC3/mrt-doc/blob/main/design/queue-2023/states.md
  - Queue redesign documentation
  - Explore/evaluate ZK access from Ruby code: #1780
- Audit, Replic
  - Removal SSM email properties from audit and replic: #1715
- Nuxeo Harvester and Object update strategy
  - File names generated via Nuxeo harvest include unneeded characters: #1655
  - Feature to update object/file information in Merritt: #1720
  - Alternate s3 key Merritt: #1734
  - Store object “reset”: #1774
  - String together object modification features: #1775
- Ingest
  - Consumer daemon control: #1773
- Devops
  - Nagios: Switch checks from state to jsonstatus: #1768
  - Ruby 3.x (Amazon Linux 2023): #1770
  - Ansible documentation: #1778, #1779
- Storage
  - Node table flip: #1742
- Collection Health Prototype
  - Awaiting feedback from campus meetings
- OpenSearch
  - Lambda logs into OpenSearch: #1511
- UCB Law Robbins Collection
  - Batch 3 ingest: RBN-04
- UCSF
  - CTP archive screenshots to GitHub: #1523

#### Releases:
Stage:
- Ingest: Consumer Daemon control
- Switch checks from state to jsonstatus
- UI: Fix Stage n2t resolver URL
Production:
- Ingest: Consumer Daemon control
- Switch checks from state to jsonstatus

#### Sprint 98:  January 17, 2024 - February 6, 2024
- Ingest
  - Investigate approaches to supporting additional ZK states: #1441
  - https://github.com/CDLUC3/mrt-doc/blob/main/design/queue-2023/states.md
- Audit, Replic
  - Removal SSM email properties from audit and replic: #1715
- UI
  - January UI fixes: #1604, #1683, #1698, #1718, #1719, #1730, #1733
  - Local ID format issue: #24
- Nuxeo Harvester and Object update strategy
  - File names generated via Nuxeo harvest include unneeded characters: #1655
  - Feature to update object/file information in Merritt: #1720
  - Alternate s3 key Merritt: #1734
- Storage
  - Node table flip: #1742
  - Update to Tika 2: #1727
- Collection Health Prototype
  - Experiment with object data: #1544
  - FITS output reviews
- OpenSearch
  - Lambda logs into OpenSearch: #1511
- UCR
  - Nuxeo feeds: #1736-#1741
- UCB Law Robbins Collection
  - Batch 2 ingest: HD202 and RBN-04
- UCSF
  - CTP archive screenshots to GitHub: #1523

#### Releases:
Stage:
- ...
Production:
- January UI Fixes
- BOM 1.6
- Ingest upgrade to new ZK library

#### Sprint 97:  December 20, 2023 - January 16, 2024
- Ingest
  - User data escapes "producer" directory: #1687
  - Investigate approaches to supporting additional ZK states: #1441
  - https://github.com/CDLUC3/mrt-doc/tree/main/design/queue-2023
  - Ability to move Ingest queue entries to new worker #997
- Store/Access
  - New 500 status errors (Access): #1716
- Audit, Replic
  - Removal SSM email properties from audit and replic: #1715
- UI
  - January UI fixes: #1604, #1697, #1683, #1698, #1718, #1719
  - Local ID format issue: #24
- State and status checks
  - Timeout logic needed for state and jsonstatus endpoints: #1685, #1686
- Admin
  - jsonstatus follow up tasks: #1665
- Collection Health Prototype
  - Experiment with object data: #1544
- OpenSearch
  - Lambda logs into OpenSearch: #1511
  - Logstash categorization missed the owner/search requests: #1721
- UCR
  - Nuxeo feeds: #1691, #1692
- UCI
  - Nuxeo feed: #1702
- UCB Law Robbins Collection
  - Batch 2 ingest
- UCSF
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510

#### Releases:
Stage:
- UI updates
Production:
- Store, Access, Replic, Audit: Timeout for jsonstatus

#### Sprint 96:  November 29 - December 19, 2023
- Ingest
  - [Ingest/IAS] Eliminate unauthentic email sender: #1633
  - Enable Ingest to make use of JSON (vs. XML) for logging in OpenSearch: 
- State and status checks
  - Timeout logic needed for state and jsonstatus endpoints: #1685, #1686
- Collection Health Prototype:
  - Experiment with object data: #1544
- OpenSearch:
  - Lambda logs into OpenSearch: #1511
- UCR
  - Nuxeo feeds: #1688-#1693
- UCB Law Robbins Collection
  - Batch 2 ingest
- UCSF
  - New NHPRC collections: #1694
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510
- UCSC
  - Two new AV collections: #1670

#### Releases:
Stage:
- Store, Access, Replic, Audit: Timeout for jsonstatus
- Ingest: XML removal and SSM email contact, Support usage of SES email authentication
Production:
- Ingest: XML removal and SSM email contact, Support usage of SES email authentication

#### Sprint 95: November 1 - November 21, 2023
- Replic
  - Create node-specific state check for Replic #1548
- Ingest
  - [Ingest/IAS] Eliminate unauthentic email sender #1633
  - Enable Ingest to make use of JSON (vs. XML) for logging in OpenSearch:
- Inventory
  - Update log4j2.xml: #1663
- mrt-cloud, SDSC
  - TransferManager fix: #1661
- Dependency updates:
  - BOM 1.5 #1662
- Collection Health Prototype: #1544
  - Experiment with object data
- OpenSearch:
  - Lambda logs into OpenSearch (check in with Ashley): #1511
- DevOps
  - WAF rule change for eSchol submissions: #1660
  - Upgrade ZK server: #60
  - Storage: hitting the kms:Decrypt API thousands of times an hour: #1650
- UCR
  - Nuxeo feeds: tickets forthcoming
- UCB Law
  - Batch 2 ingest
- UCSF
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510

#### Releases:
- Stage:
- Production:
  - Replic jsonstate, pathtrace json logs, stacktrace
  - Audit jsonstate, pathtrace json logs
  - BOM 1.4

#### Sprint 94: October 11 - October 31, 2023
- Credential Rotation
- Replic
  - Create node-specific state check for Replic #1548
- Ingest
  - OpenSearch json, log4j2: #1609
  - [Ingest/IAS] Eliminate unauthentic email sender #1633
- Storage
  - Presign object retrieval 500 errors - is retry logic needed? #1611
  - Storage state check - add timeout to node state check and report error #1470
- Collection Health Prototype: #1544
  - Experiment with object data
- OpenSearch:
  - Lambda logs into OpenSearch (check in with Ashley): #1511
  - Prototype - Updating a doc in opensearch #1618
- Dependency updates:
  - BOM 1.4 #1605
- ETDs
  - UNX files for UCI – regenerate records with new degree data: #1310
- UCR
  - Nuxeo feeds: #1634-1639
- UCB Law
  - Return batch 1 HDDs
- UCSF
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510

#### Releases:
- Stage: Audit and Replic jsonstate, Ingest opensearch support, Store/Access mrt-cloud fix and BOM 1.4
- Production:  Credential encryption and rotation, Ingest opensearch support, Store/Access mrt-cloud fix and BOM 1.4

#### Sprint 93: September 20 - October 10, 2023
- Inventory
  - Inventory - add State json log4j2: #1582
- Audit
  - Audit - add State json log4j2: #1598
- Ingest
  - eSchol minting investigation: #1610
  - OpenSearch json, log4j2: #1609
- UI:
  - Explore 500 errors in Merritt UI from ELB logs: #43
- Collection Health Prototype: #1544
  - Experiment with object data
- Credential rotation pre-work
  - Storage state check: #1470
  - Audit and Replic state check: #1548
  - Inventory state check: #1582
- OpenSearch:
  - Lambda logs into OpenSearch (check in with Ashley): #1511
  - ARK normalization: #1591
- ETDs
  - UNX files for UCI – regenerate records with new degree data: #1310
- UCR
  - Nuxeo feeds: #1601, 1602, 1603, 1607
- UCB Law
  - Begin ingest of content from HDDs: #1608
- UCSF
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510

#### Releases:
- Stage: Inventory, Audit, Replic; UI release for 500 errors
- Production: Audit

#### Sprint 92: August 20 - September 19, 2023
- Storage
  - Upgrade logging to log4j2: #1526
- Ingest
  - Validate manifest for errors ahead of content download: #1558
  - Queue redesign (Part 3) - Support additional zookeeper states: #1441
- UI:
  - Dependabot gem update and GH actions changes: #148
- Collection Health Prototype: #1544
  - Experiment with object data
- Credential rotation pre-work
  - Storage state check: #1470
  - Audit and Replic state check: #1548
  - Inventory state check: ticket forthcoming
  - Wasabi, SDSC, EZID, LDAP docs: #1549, 1550 
- OpenSearch:
  - Lambda logs into OpenSearch (check in with Ashley)
  - Refine Storage Stats dashboard using the latest fields that David has published: #1581
  - Access: Find a way to visualize how many TBs of data we assemble daily
- Dryad:
  - Consider tooling needed for content transition
- ETDs
  - UNX files for UCI – regenerate records with new degree data: #1310
- UCR
  - Nuxeo feeds: #1575, 1576, 1577
- UCB Law
  - Establish Robbins Collection: #1542
  - Begin ingest of content from HDDs
- UCSF
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510

#### Releases:
- Stage and Production
  - Storage log4j2 and OS logging
  - Ingest manifest validation
  - UI gem update and GH actions fix

#### Sprint 91: August 9 - August 29, 2023
- Storage
  - Upgrade logging to log4j2: #1526
- Ingest
  - Trap 502 Bad Gateway response from EZID: #1551
  - ZK: Enable delete of held queue items from the admin tool: #1085
- Dev-ops
  - Build script testing
- UI:
  - End-to-end test failure: permalink: #1555
- Collection Health Prototype: #1544
  - Experiment with object data
  - Update the billing and file data feeds daily
- OpenSearch:
  - Lambda logs into OpenSearch (in progress per Ashley)
  - Refine initial dashboard for Storage logging
  - Access: Find a way to visualize how many TBs of data we assemble daily
- Dryad:
  - Consider tooling needed for content transition (set up a meeting)
- ETDs
  - UNX files for UCI – apply updated list of degree names and classifications: #1310, 1414
- UCB Law
  - Establish Robbins Collection: #1542 
- PAD
  - Establish preprints collections: #1543
- UCSF
  - CTP archive screenshots to GitHub: #1523
  - Glantz hard drive content ingest: #1510

#### Releases:
- Stage: Ingest 502 client changes, Storage log4j2 and OS logging
- Production: Ingest 502 client changes, ETDs degree data update

#### Sprint 90:  July 19 - August 8, 2023
- Access
  - Redeploy to make use of the new consolidated queue implementation
- ALB investigation w/EZID regarding minting errors
  - EZID #161
  - Inventory - ALB bad gateway errors: #1537
- Ingest
  - Extend logging for OpenSearch
  - Redesign Part 3: Support additional zookeeper states: #1441 (stretch goal)
- Dev-ops
  - Nightly build automation: #1488
- Storage
  - Upgrade logging to log4j2: #1526
- UI
  - Extend logging for OpenSearch (observe output for a while first)
- OpenSearch
  - Lambda logs into OpenSearch, see how we can make these easier to navigate
  - Load billing JSON data
  - Dashboard for Storage logging
  - Access: Find a way to visualize how many TBs of data we assemble daily
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI – Now have updated list of degree names and classifications from UCI: #1414
- New Nuxeo deposits and Collections
  - UCI Community Photographs harvest: #1496
  - UCR Eaton Fanzine Collection harvest: #1497
  - Establish UCR Eaton Fanzine Collection: #1498
- UCSF
  - CTP archive screenshots to GitHub:#1523
  - Oral Histories Nuxeo feed: #1464
- Palestinian Museum project support
  - Delete content from Stage S3 bucket
- UCJEPS
  - Monitor and support forthcoming production collection ingests

##### Releases:
- Stage: Storage log4j2 and OS logging
- Production: TBD

#### Sprint 89: May 31 - June, 27 2023
- Ingest
  - Ingest queue redesign, Part 2: #1440
  - Ingest OpenSearch initial logging
- Access
  - Redeploy to take advantage of queue library changes made as part of the redesign
- UI
  - Initial OpenSearch logging
  - Re-evaluate "total size, all versions" metric: #1503
  - JQuery version update
- Cross-microservice logging
  - Pull Tomcat access logs: #1494
  - Storage: log4j2 + extend logging for OpenSearch 
- Admin tool
  - Consolidated Ingest queue support: #1487
  - Update behavior of re-audit unverified button: #1471
  - Alarm for storage node threshold: #1006
  - Brainstorm: Collection health report: #1425
  - Improve efficiency of calls to SSM: #1504
  - Create purge policy for saved consistency reports: #866
- Documentation
  - End user guidance for submissions: #1280 (move to Sprint 89)
- ETDs
  - Service credentials in SSM update: #1493
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI – Now have updated list of degree names and classifications from UCI: #1414
- New Nuxeo deposits and Collections
  - UCI Community Photographs harvest: #1496
  - UCR Eaton Fanzine Collection harvest: #1497
  - Establish UCR Eaton Fanzine Collection: #1498
- UCSF
  - CTP archive screenshots ingest: #1438
  - Oral Histories Nuxeo feed: #1464
- Palestinian Museum project support
  - Finish ingests: #1326
  - Fix outstanding with Arabic characters: Manifests created, need to confirm encoding: #1434
  - Fix forward slash in title of 122 objects (#1432, later sprint)
- UCJEPS
  - Monitor and support forthcoming production collection ingests

##### Releases:
- Stage: UI release, Ingest release consolidated queue
- Production: Ingest release consolidated queue, ETDs service credentials in SSM

#### Sprint 88: May 31 - June, 27 2023
- Ingest
  - Ingest queue redesign, Part 2: #1440
  - Ingest stack trace when updating a new object: #1458
- UI
  - Stage release: #1479
- Cross-microservice logging
  - Proof of concept in Docker
  - Tutorial examples
  - New tickets forthcoming for microservices
- Admin tool
  - Updates to annual Billing report to support more granular reporting based on ownership: #1314
  - Update lambda to newly available Ruby 3: #1466
  - Added tickets: #1006, #1166, #1471, #1472
  - New page for helper SQL
- BOX download tool
  - Wiki documentation: #1452
- Documentation
  - End user guidance for submissions: #1280 (move to Sprint 89)
  - e.g. 5MB manifest size limit (currently not enforced? investigating)
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI – Now have updated list of degree names and classifications from UCI: #1414
- UC Merced
  - Facilitate DPX file ingest: #1460
- UCSF
  - CTP archive screenshots ingest: #1438
  - Oral Histories Nuxeo feed: #1464
- Palestinian Museum project support
  - Continue ingests: #1326
  - Fix outstanding with Arabic characters: Manifests created, need to confirm encoding: #1434
  - Fix forward slash in title of 122 objects (#1432, later sprint)
- UCJEPS
  - Assist with Snowcone process for Snowcone 2
  - Migrate Snowcone 1 content from UC3 bucket to RTL bucket
  - Monitor forthcoming production collection ingests

##### Releases:
- Stage: UI release for permalink URL
- Production: UI release for permalink URL

#### Sprint 87: May 10 - May, 30 2023
- Build refactoring
  - Attempt Migration to log4j-2.17.1 or 2.20.0 after eliminating Jena: #1433
  - To release as part of the BOM 1.2 update
- Ingest
  - Ingest queue redesign, Part 2: #1440
  - Ingest stack trace when updating a new object: #1458
  - ARK shoulder change for objects in Stage collections: #1465
- Cross-microservice logging
  - Proof of concept in Docker (Terry)
- BOX download tool
  - Build job: #1453
  - Documentation: 1451, 1452, 1454-56
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI – Now have updated list of degree names and classifications from UCI: #1414
- UC Merced
  - Facilitate DPX file ingest: #1460
- UCSF
  - CTP archive screenshots ingest: #1438
  - Oral Histories Nuxeo feed: #1464
- Palestinian Museum project support
  - Continue ingests: #1326
  - Fix outstanding with Arabic characters: Manifests created, need to confirm encoding: #1434
  - Fix forward slash in title of 122 objects (#1432, later sprint)
- UCJEPS
  - Assist as needed; monitor possible production collection ingests
  - Image orientation issues under investigation by RTL

##### Releases:
- Stage: 
  - UI release for harvester 401
- Production:
  - BOM 1.2. releases store, inventory, audit, access and replic: #1450

#### Sprint 86: April 19 - May, 9 2023
- Build refactoring
  - mrt-core2 Dependabot updates: #1428
  - Eliminate mrt-jena from mrt-core2 as a part of the pom normalization work: #1368
  - Attempt Migration to log4j-2.17.1 or 2.20.0 after eliminating Jena: #1433
- Ingest
  - Ingest queue redesign: Mark and Terry to discuss and document according to broad tasks:
  - https://github.com/orgs/CDLUC3/projects/5/views/18
- Cross-microservice logging
  - Proof of concept in Docker (Terry)
  - Mapping log4j into the tlogger (David)
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI – Now have updated list of degree names and classifications from UCI: #1414
- Palestinian Museum project support
  - Continue ingests: #1326
  - Fix outstanding with Arabic characters: Manifests created, need to confirm encoding: #1434
  - Fix forward slash in title of 122 objects (#1432, later sprint)
- UCJEPS
  - Assist as needed; monitor possible production collection ingests
  - Image orientation issues under investigation by RTL

##### Releases:
- Stage: 
  - ...
- Production:
  - mrt-core2 Dependabot updates, BOM 1.1.0
  - Ingest: Jena HP Library removal

#### Sprint 85: March 29 - April, 18 2023
- Build refactoring
  - mrt-core2 Dependabot updates: #1413
  - Eliminate mrt-jena from mrt-core2 as a part of the pom normalization work: #s 1346, 1368\
  - (Two step process: address jena removal, then work on RDF file changes to no longer generate them)
- Ingest
  - Jersey update: #1370 (on Stage)
- BOX
  - Investigate approach for generating Merritt manifests with BOX file URLs: #1409
- UI
  - UCB search by file name request: #1349 (on Stage)
  - Routine Gem Updates: #1383 (on Stage)
  - Limit large uploads: #1400 (on Stage)
  - Prevent slow queries accessible to Guest user: #22
  - Associated documentation: #1396
- LDAP
  - Annual LDAP cert request: #1311
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI – Now have updated list of degree names and classifications from UCI: #1414
- Palestinian Museum project support
  - Continue ingests: #1326
  - Fix outstanding submission manifests with Arabic characters
- UCJEPS
  - Assist as needed; monitor possible production collection ingests
  - 102 objects as of 3/28

##### Releases:
- Stage: 
  - mrt-core2 Dependabot updates
- Production:
  - UI release: Dependabot updates, search by file name (inv_files table), global search
  - Jersey update for Ingest

#### Sprint 84: March 8 - March, 28 2023
- Build refactoring
  - mrt-core2 Dependabot updates (document current high-severity updates): #1266
  - Establish a regular 1/2 hour to discuss recommended updates every 3 weeks (EL)
  - Java dependency issue summary spreadsheet: #10
  - Eliminate mrt-jena from mrt-core2 as a part of the pom normalization work: #s 1346, 1368\
  - (Two step process: address mrt-jena removal, then work on RDF file changes to no longer generate them)
- Ingest
  - Clean up Callback response logic: #1377
  - Potential memory leak: #1390
- BOX
  - Investigate approach for generating Merritt manifests with BOX file URLs
  - Discuss and refine requirements
- UI
  - UCB search by file name request: #1349 (on Stage)
  - Routine Gem Updates: #1383 (on Stage)
  - Limit large uploads: #1400 (on Stage)
  - Associated documentation: #1396
- LDAP
  - Annual LDAP cert request: #1311
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI, #1250 – waiting on UCI
- Palestinian Museum project support
  - Continue ingests: #1326
- UCJEPS
  - Refine snowcone app for Jepson use: #1382
  - New Production collection: #1379

##### Releases:
- Stage: 
  - Ingest: Callback response logic update
  - mrt-core2 Dependabot updates
- Production:
  - Ingest: Callback response logic update
  - UI release: Dependabot updates, search by file name (inv_files table)

#### Sprint 83: February 15 - March, 7 2023
- Build refactoring
  - Cross-microservice jar version consistency: #1286
  - Java dependency issue summary spreadsheet: #10
  - Eliminate jena from mrt-core as a part of the pom normalization work: #1368
- Ingest
  - Clean up Callback response logic: #1377
- UI
  - UCB search by file name request: #1349
  - Routine Gem Updates: #1383
- Application logging
  - Cross microservice logging: #971
- ETDs
  - Populate missing Merritt ingest data in ETDs database, #1308
  - UNX files for UCI, #1250 – waiting on UCI
- Palestinian Museum project support
  - Continue ingests: #1326
- UCJEPS
  - Refine snowcone app for Jepson use: #1382
  - New Production collection: #1379
- Dryad
  - Assist with transition to normal depositor workflow

##### Releases:
- Stage: 
  - Stage: Potentially deploy all BOM updates to Stage across all microservices
- Production:
  - UI release: Dependabot updates, search by file name (inv_files table)


#### Sprint 82: January 25 - February, 14 2023
- Build refactoring
  - Cross-microservice jar version consistency: #1286
  - Java dependency issue summary spreadsheet: #10
  - Storage: Groundwork for BOM
- Admin tool
  - Invoke queue cleanup via new API: #1350, 1351
  - Ingest stack trace resolution: #1342
  - Load balancer public/private: #9 and #13
  - Coordination needed with Dryad, for a SWORD restart
  - Possibly make some SSM changes
- Ingest
  - New API for ZK queue cleanup: #1339
  - Ingest stack trace resolution: #1342
  - Collection profile variable for toggling queue notification, plus associated state change: #1352
- Audit
  - Resolve failures associated with 13030//m59g71tt: #1345
- ETDs
  - UNX files for UCI, #1250 – pending response from UCI
  - manually update db entries and process UNX files
  - manually update a subset of records with correct degree information
  - Populate missing Merritt ingest data in ETDs database, #1308
- Palestinian Museum project support
  - Continue ingests: #1326
- UCJEPS
  - New stage and production collections: #1309
  - Snowcone job submission and on-site work
- Dryad
  - Discuss high-priority consumer daemon during on-site (week of 1/30/23)
  - Potential for 1TB dataset
- UCB meeting
  - Discuss all of the queueing work we've completed
  - File name search questions
  - New JSON-based manifest type
  - Pending deposits for 2023
##### Releases:
- Stage: 
  - Storage BOM implementation
  - Ingest API
  - Ingest queue notifications (TBD)
- Production: 
  - ...
#### Sprint 81: January 4 - January 24, 2023
- Libraries refactor
  - BOM implementation for core2 and cloud, #1286
  - Merged to main
  - core2 Dependabot fixes: #1266
  - Merged to main
  - Still additional Dependabot changes to occur later
  - Associated Inventory and Replic updates: #1316
- Storage
  - Locking mechanism on Stage, to be deployed to production on 1/11/23
  - #'s 1229, 1233
- Admin tool
  - Pause Access queue (after deployment of locking mechanism)
- Ingest
  - Consumer daemon for high-priority jobs (Dryad): #1289
  - State command update: #1304
  - Storage hostname error 502: #1315
- UI
  - UI State command: Add service start time to the state command output: #1306
- ETDs
  - UNX files for UCI, #1250
  - manually update db entries and process UNX files
  - manually update a subset of records with correct degree information
  - refine associated documentation
  - Populate missing Merritt ingest data in ETDs database, #1308
- Palestinian Museum project support
  - Continue ingests of content: #1326
- Dryad
  - Deprecate OAI: #9
##### Releases:
- Stage: 
  - Inventory and Replic changes
- Production: 
  - Storage queue locking
  - Inventory retries (trimmed jars, state command)
  - Replic (trimmed jars, state command)
  - Consumer daemon
  - UI: state command and reading load balancer paths from SSM

#### Sprint 80: November 9 - November 29, 2022
- Core (trimmed) libraries refactor:
  - Continue work on BOM implementation for core2 and cloud, #1286 
  - core2 dependabot fixes: #1266
- Storage:
  - New locking mechanism on Stage, to be deployed to production on 1/11/23
- Ingest:
  - New consumer daemon for high-priority jobs (Dryad)
  - Planning to release to Production in early January
- Documentation:
  - Troubleshooting guide and mrt-doc-private documentation updates
- Docker Jenkins builds:
  - Exploring Trivy
  - Refactor Docker file locations: move Docker file to individual microservice repo
  - Leveraging this relocation to enable use of microservice-specific changes
- ETDs:
  - UNX files for UCI, #1250
  - manually update db entries and process UNX files
  - manually update a subset of records with correct degree information
  - refine associated documentation
  - Populate missing Merritt ingest data in ETDs database, #1308 
- Palestinian Museum project support:
  - Possible publishing program update to incorporate revised metadata
  - Complete collection setup
  - Begin ingests of content
- Dryad:
  - Determine OAI deprecation date

##### Releases:
- Stage: 
  - Inv and billing annual credential rotation (12/8)
- Production:
  - Inv and billing annual credential rotation (12/14)


#### Sprint 79: November 9 - November 29, 2022
- Core (trimmed) libraries refactor:
  - Redploys: Ingest should be next 
  - Document plan for Dependabot alerts (introduce trivy into the conversation)
  - core2 dependabot fixes: #1266
- Storage:
  - Heading to stage: New locking mechanism for large access queue: #1229
- Ingest:
  - Timeout requesting storage hostname; implement retries, release 11/9
  - New consumer daemon for high-priority jobs (Dryad)
- MySQL 8.x:
  - Planning to migrate Inv to 8.x in production on 11/15/22
  - Incident 11/23-25: Documentation updates and new troubleshooting guide in-progress
- Rails 6/Ruby 3.1 for UI:
  - Work with Ashley to move Ruby updates into production if time allows (after MySQL)
- Docker Jenkins builds:
  - Exploring Trivy
  - Refactor Docker file locations: move Docker file to individual microservice repo
  - Leveraging this relocation to enable use of microservice-specific changes
- ETDs:
  - UNX files for UCI: per root cause determined, manually update db entries and process UNX files
- Palestinian Museum project support:
  - Publishing program updates
  - Complete setup of PM collections on stage and production
  - Review UCLA MODS creation scripts when access granted
- Dryad:
  - Scott will be working on callback implementation this sprint (ends 11/29) and may reach out for guidance
  - Configure stage Dryad collection with endpoint

##### Releases:
- Stage: 
  - New locking mechanism for large access queue, #1229 
  - Rails 6 and Ruby 3.1 for UI
- Production:
  - Timeout requesting hostname, #1267
  - Ruby 3 for batch service
  - MySQL 8 for Inv and Billing databases
  - Rails 6 and Ruby 3.1 for UI

#### Sprint 78: October 12 - November 1, 2022
- Core (trimmed) libraries refactor:
  - Redploys: Ingest should be next 
  - Document plan for Dependabot alerts (introduce trivy into the conversation)
- Storage:
  - On dev: New locking mechanism for large access queue: #1229
  - Evaluate introduction of a property
- Queueing:
  - Nuxeo queueing: Separate Nuxeo rake tasks from UI, #1052
  - Move to Stage 
- MySQL 8.x:
  - UI and end-to-end tests looking good
  - Discuss a potential plan for production; schedule a separate meeting, 10/24
- Rails 6/Ruby 3.1 for UI
  - Work with Ashley to move Ruby updates onto dev, then stage and eventually production
- New Ingest Application LB
  - SWORD: Update response code for when Ingest ALB times out
- Docker Jenkins builds:
  - Exploring Trivy
  - Refactor Docker file locations: move Docker file to individual microservice repo
  - Leveraging this relocation to enable use of microservice-specific changes
- ETDs:
  - Continue investigation of .unx files for UCSC
- Berkeley Public Library object download
- Palestinian Museum project support
  - Review UCLA scripts when access granted

##### Releases:
- Stage: 
  - Store access (large) locking mechanism
  - Rails 6 and Ruby 3.1
- Production:
  - Storage/Access for zip and temp file updates
  - Separation of Nuxeo rake tasks from UI
  - SWORD status code changes

#### Sprint 77: September 21 - October 11 2022
- Core libraries refactor:
  - Redploys: Audit, on stage; Ingest should be next 
  - Document plan for dependabot alerts, #994
  - snakeyaml: introduced in mrt-core2 for reading yaml files
  - Delete mrt-conf.prv (scheduled)
- Storage:
  - New locking mechanism for large access queue: #1229
- Queueing:
  - Nuxeo queueing: Separate Nuxeo rake tasks from UI, #1052
- New Ingest Application LB:
  - SWORD: Update response code for when Ingest ALB times out
- Integration tests:
  - Options for keeping Docker images up-to-date
  - Use of AWS Codebuild (Done: builds Docker images in UC3 account)
  - Jenkins: using Docker Compose (Ashley to install on Jenkins box)
- ETDs:
  - Process .unx files for UCSC
- CoreTrustSeal
  - Application resubmission
- Palestinian Museum project support
  - Database snapshot setup

##### Releases:
- Stage: 
  - Separation of Nuxeo rake tasks from UI
  - SWORD status code changes
- Production:
  - Storage/Access for zip and temp file updates
  - SWORD status code changes
  - Audit (trimmed libraries)

#### Sprint 76: August 31 - September 20 2022
- Core libraries refactor:
  - Redploys of: Inventory, Audit, Replic, Ingest 
  - Dependabot alert strategy, #994
  - Case-by-case basis
  - Document decisions if decide not to update a dependency 
  - Delete mrt-conf.prv (waiting until end of Sept.)
- Queueing:
  - Nuxeo queueing: Separate Nuxeo rake tasks from UI, #1052
- Audit:
  - Deploy new Audit server
  - David will work with Ashley; monitor inv db credits
- Phase out Ingest Apache LB, #977
  - IAS has set up the Ingest ALB
  - Plan for cutover and DNS changes
  - SWORD
- Storage RLB elimination, #1202
  - Ingest client calling hostname method
  - Retirement of Merritt web host
- Integration tests:
  - Ingest integration tests
  - Addition of tests related to admin methods
  - Options for keeping Docker images up-to-date (possibly involving AWS Codebuild)
- Look into next steps on logging
  - (may depend on priority of Rails or MySQL)
- ETDs:
  - Finish fixing UCLA MARC records
  - Process .unx files
- CoreTrustSeal
  - Complete GDO document and ready resubmission
- Palestinian Museum project support
  - TBD

##### Releases:
- Stage: 
  - Ingest use of new Storage method (RLB elim.)
- Production:
  - Ingest ALB deprecation/cutover
  - Ingest use of Storage method (RLB elim.)

#### Sprint 75: August 10 - August 30 2022
- Core libraries refactor:
  - Remove unused jars from mrt-core-2 and mrt-cloud, #1102
  - Core libraries: eliminate dependencies and jar updates #914
  - Delete mrt-conf.prv
- Deprecate CDL Maven repo
- Testing ZFS file system (Ashley, David, Mark)
- Queueing:
  - Nuxeo queueing: Separate Nuxeo rake tasks from UI, #1052
- Audit:
  - Wrap up instance type experiments
  - Likely outcome may be to add a server (prioritize if solution becomes available)
- Phase out Ingest Apache LB, #977
  - Continue testing on Stage; run end-to-end tests
  - Will review Admin code
  - Plan deployment to production
- Storage RLB elimination, #
  - Stage only this sprint
  - Storage methods
  - New endpoints for storage and Ingest client calling above methods
- Integration tests:
  - Return to Ingest integration tests
- Nuxeo feeds:
  - UCI and UCM feeds (three pending)
  - Frontera Collection: batch ingests (waiting on UCLA)
- ETDs:
  - Fix UCLA records
  - Process .unx files
- Palestinian Museum project support
  - Make additional sample images available

##### Releases:
- Stage: 
  - Shared ZFS volume 
- Production:
  - Shared ZFS volume 
  - Trimmed Storage/Access service w/hostname method (Store05, 06)

#### Sprint 74: July 20 - August 9 2022
- Java builds:
  - OAI build refactor w/dspace-xoai jar
  - Sword build refactor (release to Prod)
  - Core libraries refactor if time allows
- Replication:
  - Dryad Glacier bucket setup, #918
   - Complete final replicating final batches to Glacier bucket
   - Delete redundant replicas from Wasabi
- Queueing:
  - Nuxeo queueing
   - Deprecate hosting ERC data in favor of adding it to the submission manifest instead, #1053
   - Separate Nuxeo rake tasks from UI, #1052 (re-evaluate after 1053) 
- Audit:
  - Instance type experiments
- Phase out Apache LB
  - Continue testing on Stage
  - Work to bring new ALB online
- Integration Tests
  - Continue work on creating baseline content for integ tests, #1109
  - Work on Inventory integ tests, #1044
- Production cloud scans: 
  - Scan issue cleanup for Dryad, #946
- New collections, feeds:
  - New UCI and UCM Collections
  - New UCI and UCM Nuxeo feeds
  - Frontera Collection: batch ingests (continue to wait on UCLA)
- ETDs:
  - Backfill missing MARC records
  - Process .unx files
- Palestinian Museum project support:
  - Make additional sample images available
  - Testing FSx file system

##### Releases:
- Stage:
  - OAI initial Stage release
- Production:
  - Sword refactor release
  - OAI refactor release
  - UI release (Nuxeo, Dependabot)
  - Replic hotfix

#### Sprint 73: June 29 - July 19 2022
- Java builds:
  - Sword build refactor (on Stage)
  - OAI build refactor 
- Replication:
  - Dryad Glacier bucket setup, #918
   - Trigger replication to production Glacier bucket
   - Stop replication to Wasabi
- Queueing:
  - Nuxeo queueing
   - Deprecate hosting ERC data in favor of adding it to the submission manifest instead, #1053
   - Separate Nuxeo rake tasks from UI, #1052 (re-evaluate after 1053) 
- Network I/O and EFS performance investigation, #1064
  - Next steps: waiting for another large submission from UCB to test with instance types
- Integration Tests
  - Continue work on mrt-store integration tests, #1041
  - If Storage tested completed, start work on infrastructure for Replic integ tests, #1044
- Production cloud scans: 
  - Scan issue cleanup for Dryad, #946
- New collections, feeds:
  - New UCI and UCM Nuxeo feeds
  - Two new UC Berkeley collections, one each for UCSF and UCI
  - Frontera Collection: batch ingests (continue to wait on UCLA)
- Palestinian Museum project support:
  - Initial Merritt orientation, supplying copies of MODS and sample images
  - EC2 dev instance and laptop

##### Releases:
- Stage:
  - Sword update on Stage
  - OAI initial Stage release

#### Sprint 72: June 1 - June 28 2022 (extended one week)
- Java builds:
  - Deploy Store/Store Access refactor to production, #1040, #1068
- Replication:
  - Dryad Glacier bucket setup, #918
   - Database entries (done)
   - SSM parameters
   - Modify yaml file to configure for replication (all microservices will need to be redeployed)
  - Updates for handling aliased node during scans, #987
- Queueing:
  - Nuxeo queueing
   - Deprecate hosting ERC data in favor of adding it to the submission manifest instead, #1053
   - Separate Nuxeo rake tasks from UI, #1052 (re-evaluate after 1053) 
- Network I/O and EFS performance investigation, #1064
- Unit and Integration Tests
  - Create unit and integration tests for Storage, #1019
   - Start work on mrt-store integration tests, #1041
  - Mechanism in place to run tests from Jenkins (upcoming meeting with Ashley)
- Stage cleanup and cloud scans:
  - Resolve issue with specific objects not being present in  inv_nodes_inv_objects (stage), #1050
   - Review meetings; stage inv database cleanup
  - Stage consistency reports, #1066
- Production cloud scans: 
  - Scan issue cleanup for Dryad, #946
- New collections, feeds:
  - New UCI Nuxeo feeds: Decide on an initial batch to work on (19 total)
  - Frontera Collection: batch ingests (waiting on UCLA)
- ETDs:
  - Complete workflow change for UC Berkeley, #947
  - Process .unx files

##### Releases:
- Prod:
  - UC Berkeley ETD workflow change
  - Replic Scan alias feature
  - Audit deploy for Dryad Glacier node support
  - Ingest thread pool size change
  - Store/Store Access refactor

#### Sprint 71: 11 May 2022 - May 31 2022
- Java builds:
  - Migrating Store to new build pipeline, #1040
- Queueing:
  - Nuxeo admin design and discussion
   - Initial step is to separate it from the UI; make the process independent
   - Think about queuing up feeds and using collection pause/unpause to trigger harvests 
- Unit and Integration Tests
  - Create unit and integration tests for Storage, #1041, #1019
  - POM files will become more complex
   - Ashley's ideas about streamlining via inheritance should help with this
- Storage Admin:
  - Review recent SDSC scan
  - Version cleanup for any outstanding objects from Dryad node scan results
- Replication:
  - Dryad Glacier bucket setup, #918
   - Bucket name (David); Consult with Ryan on location and bucket setup
   - IAS: bucket access rights setup
  - Modify yaml file to configure for replication
- ETDs:
  - Complete workflow change for UC Berkeley, #947
  - Process .unx files
- New collections, feeds:
  - Frontera Collection: batch ingests (waiting on UCLA)
  - New UCSF Nuxeo feed for video content

##### Releases:
- Stage:
  - Store/Store Access refactor

#### Sprint 70: 20 April - May 10 2022
- Java builds:
  - New views in Jenkins for legacy builds
  - Finish migrating Inventory to new build pipeline w/mrt-zoo, #1017
  - Migrate Replic to new build pipeline w/mrt-zoo and mrt-cloud, #1009
- Collection management:
  - Collection locking, on Stage
  - Collection locking controls in Coll Admin
- Queueing:
  - In ZK enable the movement of queue entry to new a ingest worker, #997
  - Look into pros/cons of moving all entries in a batch vs. moving individual job entries
  - Discuss Nuxeo admin and decide which to prioritize 
- Storage Admin:
  - Version cleanup for any outstanding objects from Dryad node scan results
- Replication:
  - Dryad Glacier bucket setup, #918
  - IAS: bucket setup – could get started on this
  - Modify yaml file to configure for replication
- Integration tests:
  - Discuss with David re: which microservice is next for implementing int test
  - Allow Merritt Docker images to reside in ECR (ECR is IAS pref), #1020
- ETDs:
  - Establish workflow for UC Berkeley, #947 (waiting on PQ)
  - Process .unx files
- New collections, feeds:
  - Frontera Collection: batch ingests (waiting on UCLA)
  - New UCSF Nuxeo feed for video content

##### Releases:
- Stage:
  - Inventory refactor to Stage
  - Replic refactor to Stage
- Prod:
  - Inventory refactor
  - Replic refactor
  - Ingest collection locking
  - UI gem updates and state page

#### Sprint 69: 30 March – 19 April 2022
- Java builds:
  - Finish migration of Audit to new build pipeline (Done)
  - Migrate mrt-cloud to new build pipeline, #967
  - New views in Jenkins for legacy builds
- Collection management:
  - Collection prioritization, #973 (Done)
  - Collection locking, #972
- Storage Admin:
  - Version cleanup for any outstanding objects from Dryad node scan results
- Admin tool:
  - Copy/paste link for state and build.content.txt endpoints in the admin tool, #992 (Done)
- Replication:
  - Replication for 1.8TB object (ark:/13030/m5q029nw), #990, 991
- Unit tests:
  - Investigate approach for and begin implementation of microservice unit tests, #985
- ETDs:
  - Establish workflow for UC Berkeley
  - Process .unx files
- New collections, feeds:
  - Frontera Collection: batch ingests

##### Releases:
- Stage:
  - mrt-cloud build migration (as used with Audit or Replic)
- Prod:
  - Audit build migration (deployed 2022-03-30)
  - Collection prioritization (week of April 11)

#### Sprint 68: 9 March – 29 March 2022
- Preventing concurrent updates:
  - Inventory locking: Follow on Collection Admin UI work
- Java builds:
  - Finish migration of Audit to new build pipeline
  - Finish migration of Ingest to new build pipeline 
  - Migrate Replic to new build pipeline
  - Migrate Inventory to new build pipeline
  - Migrate Storage  to new build pipeline
- Storage Admin:
  - Version cleanup for any outstanding objects from Dryad node scan results
  - Discuss approach to orphaned content on secondary nodes 
- Manifest creation tool:
  - Manifest validation with mrt-core2
- ETDs:
  - File Analyzer routine for MARC records
  - Investigate boilerplate content of UCM, UCSC, UCI record templates
  - Establish workflow for UC Berkeley
- New collections, feeds:
  - Frontera Collection: batch ingests
  - Establish six new UCI Nuxeo feeds
- Respond to CoreTrustSeal feedback
  - Resubmit application

##### Releases:
- Stage:
  - Audit build migration 
  - Collection prioritization
- Prod:
  - Ingest build migration
  - Manifest creation tool

#### Sprint 67: 16 February - 8 March 2022
- Preventing concurrent updates:
  - Inventory locking mechanism
  - Follow on Collection Admin UI work
- Java builds:
  - Migrate Audit to new build pipeline
  - Migrate Ingest to new build pipeline
- Storage Admin:
  - Continue scan results review
  - Version cleanup for any outstanding objects
- Manifest creation tool:
  - Manifest validation with mrt-core2
  - CSV to checkm converter
- New collections, feeds:
  - Frontera Collection: batch ingests
  - Establish two new UCI collections
- Respond to CoreTrustSeal feedback
  - Resubmit application

##### Releases:
- Stage:
  - Inventory lock
- Prod:
  - Replic changes

#### Sprint 66: 26 January - 15 February 2022
- Preventing concurrent updates – locking mechanism:
  - API implementation for surfacing and removing locks
  - Follow on Collection Admin UI work
- Java builds:
  - Migrate Audit to new build pipeline
  - Migrate Ingest to new build pipeline
- Replic:
  - Deploy inv_nodes_inv_objects enhancements to production
  - Follow on Storage Admin work
- Admin, Coll Admin:
  - Admin tool reports doc edits in yaml
- Storage Admin:
  - Continue scan results review
  - Version cleanup for six objects
- New collections, feeds:
  - Frontera Collection: batch ingests
  - UCM UCCE ANR Collection: batch ingests 
  - New UCI feed request 
- Respond to CoreTrustSeal feedback
  - Parity between new policy guide and policies on cdlib.org

##### Releases:
- Prod:
  - Replic changes
  - Ingest lock and API
  - Admin changes for removing content from a node

#### Sprint 65: 6 January - 25 January 2022
- Preventing concurrent updates – locking mechanism:
  - Handler implementation for use with new ZK functionality
  - Follow on Collection Admin work
- UC Berkeley Library IT request:
  - Introduce Local ID into ATOM feeds
- Java Builds
  - Complete service build development in Docker (OAI, SWORD) 
  - Test built services in Docker
  - Determine if we should move/recreate the process in Jenkins
- Inventory and Replic
  - Enhance inv_nodes_inv_objects to track replication timings and bytes
  - Follow on Storage Admin work
- Admin, Coll Admin
  - Document all Admin tool reports in yaml, along with all Coll Admin actions
- Storage Admin
  - Continue scan results review
- New collections, feeds:
  - Frontera Collection: batch ingests 
  - UCM UCCE ANR Collection: batch ingests
  - UCB Maps collection: batch ingests 
  - UCI Nuxeo feed requests
- UC Davis ETDs:
  - Regenerate remaining MARC records
- Respond to CoreTrustSeal feedback

##### Releases:
- Stage: 
  - inv_nodes_inv_objects table changes
  - Concurrent update locking mechanism
  - UI release for local ID field in ATOM feeds
  - log4j 2.17.1 for Replic
- Production:
  - UI release for local ID field in ATOM feeds
  - log4j 2.17.1 for Replic

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
