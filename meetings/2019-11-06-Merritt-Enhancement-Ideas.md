## Merritt Enhancement Brainstorming

This document captures notes from my first couple weeks working on Merritt. 
Marisa and Eric recommended capturing the notes here.
Where appropriate, migrate items from this list to the project board.

## Log object in the database at the start of ingest
To enable the creation of a dashboard of items in progress.

## Dynamically scale ingest processes based on ingest load
Would it be possible to dynamically grow and shrink the number of ingest nodes based on the size of the ingest queue?
- Could this lessen the demands on the temp/scratch storage?

## Dynamically scale storage processes based on the number of download requests
Would it be possible to dynamically grow and shrink the number of storage nodes based on the number of active downloads?
- If the services were to scale horizontally, could that approach also scale the temp/scratch storage?

## Use a common Merritt admin account rather than personal LDAP accounts
Since we do not use SSO for Merritt, would it make sense to have a single admin account for Merritt operations.
Individual team members could user personal accounts for submitting items to specific collections.

## Simulate Catastrophic node recovery for a collection
Demonstrate the ability to dynamically re-create nodes for a collection.

## Create an automated clone of GitHub repositories
As a backup in case there is a significant GitHub outage or service corruption.
Is there a suitable backup repository to utilize?

## Explore options for malicious traffic control
- See https://docs.aws.amazon.com/waf/latest/developerguide/tutorials-ddos-cross-service-WAF.html

## Standardize service log entries
- Output standard log headers: service, date, time, log level, ark (where applicable), message
- Implement consistent operational controls to turn on/off debug levels
  - Storage log levels (compiled props)
  - Storage hard coded (DEBUG=false)
  - Want same mechanism for Java and Ruby
  - Ingest - have not explored mechanism
- Explore AWS options for log consolidation and query

## Reverse Manifest/Download Manifest
This idea came up in our retrospective conversation on 11/6/2019.
- Provide an alternative packaging option for objects -- embed download URL's for individual files and components.
- For objects that are computationally difficult to package due to size, prefer this approach for generating export objects.

## Explore Docker/Kubernetes Orchestration for Microservices

## Explore AWS SSM Parameter Store for Microservice properties
- https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
- Create standard mechanism for property deployment
  - not dependent on maven build
  - allow for easy insertion at runtime (docker volume/env override)
  
## Locate source code for sf.net jar files
- Look at docker build to see how these are included from maven repo

# Additional Notes - Dec 20, 2019

## Admin Tool Brainstorming
Tool for CDL staff to have an overview of system state and configuration

### Ark query
### Generate paginated contents list or rev manifest
- eventual ui func
### Query/verify collection admin
- validate against profiles
- Eventual - Build/submit admin changes
### Query/verify node admin
- validate against node table yaml
- Eventual- Consolidate and simplify configs
- Eventual- custom nodes for specific testing
### Trace ingest in progress across services
- read queues and db
- Report recoverable storage
### Trace download in progress against services
- read apache logs and ret statuses
- Read cloud container store
- Read working download store
- Report on estimated delete time
- Report “recoverable” storage
### Generate usage stats repo from logs
- merge w inventory db data
- Create report tools
- explore aws query options 
### Usage Stats
- Upload: loc, user, coll, size, file count, ingest time, replic time
- Download: loc, user, coll, ark, file?, size, fmt, download time
- Lg obj download - prep time, retrieve count
- Repeated download (over time window)

## Large object traffic lanes
- priority lanes (uc)
- Signed URL’s (Qumulo support)
- Access questions

# Completed Items
## Create Docker Stack for Dryad + Merritt
- See https://github.com/CDLUC3/mrt-doc/issues/190

## Make smtp server configurable
-  Modify storage and ingest to allow smtp service to run in a separate container
- See https://github.com/CDLUC3/mrt-doc/issues/195
