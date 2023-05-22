# Merritt 

[Merritt](https://merritt.cdlib.org) is the digital preservation repository for the University of California, available to libraries, academic departments, laboratories and other organizational units within UC.

## Original System Specifications
- [Merritt Object Model](https://github.com/CDLUC3/mrt-doc/blob/main/doc/Merritt-object-modeling-latest.pdf)
- [Technical Specifications](https://github.com/CDLUC3/mrt-doc/wiki/Technical-Documentation)
- [Digital Object Guidelines](https://github.com/CDLUC3/mrt-doc/blob/main/doc/cdl_gdo_v2021.pdf)

## User Documentation
- For the latest Merritt documentation, see the [wiki](https://github.com/cdluc3/mrt-doc/wiki).
- [Manifest Validation Tool](https://cdluc3.github.io/mrt-doc/manifest/index.html)
- [Manifest Validation Tool with Unit Tests](https://cdluc3.github.io/mrt-doc/manifest/index.html?unittest=1)

## Flowchart Index
- [Flowchart Index](https://cdluc3.github.io/mrt-doc/diagrams/)
## Code Repositories

### Core Microservices 

_Click the following diagram for a walk-through of the service._
[![](diagrams/overview-core.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/core_index)

Code Repositories
- Ruby
  - [UI](https://github.com/CDLUC3/mrt-dashboard)
- Java
  - [Ingest](https://github.com/CDLUC3/mrt-ingest)
  - [Inventory](https://github.com/CDLUC3/mrt-inventory)
  - [Storage (Store and Access)](https://github.com/CDLUC3/mrt-store)

### Audit and Replication Services (Java)

_Click the following diagram for a walk-through of the service._
[![](diagrams/overview-replic.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/auditreplic)

Code Repositories
- [Replication](https://github.com/CDLUC3/mrt-replic)
- [Audit (Fixity Check)](https://github.com/CDLUC3/mrt-audit)

Code Repositories

### Other Production Services (Python/XSLT)
- [ETD - Electronic Theses and Dissertations](https://github.com/CDLUC3/uc3-etds)

### Libraries
- Java
  - [Core](https://github.com/CDLUC3/mrt-core2)
  - [Cloud](https://github.com/CDLUC3/mrt-cloud)
  - [Zoo](https://github.com/CDLUC3/mrt-zoo)
  - [ZK Queue](https://github.com/CDLUC3/cdl-zk-queue)
- Ruby
  - [Ruby Ingest](https://github.com/CDLUC3/mrt-ingest-ruby)
  - [SSM Gem](https://github.com/CDLUC3/uc3-ssm)
  - [Merritt Atom](https://github.com/cdluc3/mrt-atom) - Nuxeo processing for ingest

### Configuration
- [Tomcat](https://github.com/CDLUC3/mrt-tomcat)

### Supporting Services
- Java 
  - [Merritt Box Tools](https://github.com/CDLUC3/mrt-box) 
- Ruby
  - [Admin Tool](https://github.com/CDLUC3/mrt-admin-lambda)
  - [Integration Tests](https://github.com/CDLUC3/mrt-integ-tests)
  - [Merritt Manifest Tools](https://github.com/CDLUC3/merritt-manifest)
- Docker
  - [Merritt Docker](https://github.com/CDLUC3/merritt-docker)
- Cron Driver
  - [Merritt Crons](https://github.com/CDLUC3/mrt-cron)
- Build Support
  - [Jenkins Functions](https://github.com/CDLUC3/mrt-jenkins)

### Documentation Tools (Python)
-  [Merritt Repository Tagger](https://github.com/CDLUC3/mrt-repo-tagger)

## Project Overview
- [Project Board](https://github.com/CDLUC3/mrt-doc/projects/1)
- [System Operations Board](https://github.com/CDLUC3/mrt-doc/projects/4)
- [System Enhancement Ideas Grouped by Theme](https://github.com/CDLUC3/mrt-doc/milestones)

## More info
- [Deprecated Functionality](deprecated_functionality.md)

