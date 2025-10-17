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
- [Merritt Development Resources](https://merritt.uc3dev.cdlib.org/)

## Code Repositories

### Core Microservices 

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  RDS[(Inventory DB)]
  UI("Merritt UI")
  click UI href "https://github.com/CDLUC3/mrt-dashboard" "source code"
  ING(Ingest)
  click ING href "https://github.com/CDLUC3/mrt-ingest" "source code"
  ST(Storage)
  click ST href "https://github.com/CDLUC3/mrt-store" "source code"
  STACC(Storage - Access)
  click STACC href "https://github.com/CDLUC3/mrt-store" "source code"
  INV(Inventory)
  click INV href "https://github.com/CDLUC3/mrt-inventory" "source code"
  CLOUD(("Cloud Storage"))
  click CLOUD href "https://github.com/CDLUC3/mrt-cloud" "source code"
  LDAP[/LDAP\]
  ZFS[/ZFS Working Storage/]
  ZOO>Zookeeper]
  click ZOO href "https://github.com/CDLUC3/mrt-zoo" "source code"
  EZID(EZID Service)
  click EZID href "https://ezid.cdlib.org/" "service link"
  BROWSER[[Browser]]

  subgraph flowchart
    BROWSER --> |ingest or retrieval| UI
    UI --> |authorization| LDAP
    RDS --> UI
    UI --> |"file or ingest manifest"| ING
    ING --> |queue job| ZOO
    ING --> |check obj lock| ZOO
    ZOO --> |start job| ING
    ING -.-> |local id request| INV
    ING --> EZID
    ING --> |download content| ZFS
    ING --> |"sync deposit"| ST
    ST --> CLOUD
    ZFS --> ST
    ZOO --> INV
    INV -.-> |retrieve storage manifest| ST
    INV --> RDS
    UI ---> |retrieval req| STACC
    STACC --> |retrieval req| CLOUD
    CLOUD -.-> |presigned URL| STACC
    STACC -.-> |presigned URL| UI
    CLOUD -.-> |presigned retrieval| BROWSER
  end

  style CLOUD fill:#77913C
  style RDS fill:#F68D2F
  style LDAP fill:cyan
  style ZOO fill:cyan
  style EZID fill:cyan
  
  classDef FOCUS stroke:red,stroke-width:5px,fill:yellow
```

#### Merritt UI Permalink Resolution
```mermaid
graph TD
  N2T[N2T Service]
  click N2T href "https://n2t.net/" "service link"
  UI[Merritt UI]
  Permalink[/Merrit UI Permalink/]

  UI --> |contains| Permalink
  Permalink --> N2T
  N2T -.-> |resolves to| EZID
  EZID -.-> |resolves to| UI
```

### Audit and Replication Services (Java)

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  CLOUD(("Cloud Storage"))
  click CLOUD href "https://github.com/CDLUC3/mrt-cloud" "source code"
  RDS[(Inventory DB)]
  AUD(Audit)
  click AUD href "https://github.com/CDLUC3/mrt-audit" "source code"
  REP(Replication)
  click REP href "https://github.com/CDLUC3/mrt-replic" "source code"

  subgraph flowchart
    RDS --> AUD
    RDS --> REP
    CLOUD --> AUD
    CLOUD --> REP
    REP --> CLOUD
  end

  style CLOUD fill:#77913C
  style RDS fill:#F68D2F
```

Code Repositories
- Ruby
  - [UI](https://github.com/CDLUC3/mrt-dashboard)
- Java
  - [Ingest](https://github.com/CDLUC3/mrt-ingest)
  - [Inventory](https://github.com/CDLUC3/mrt-inventory)
  - [Storage (Store and Access)](https://github.com/CDLUC3/mrt-store)
  - [Replication](https://github.com/CDLUC3/mrt-replic)
  - [Audit (Fixity Check)](https://github.com/CDLUC3/mrt-audit)

### Libraries
- Java
  - [Core](https://github.com/CDLUC3/mrt-core2)
  - [Cloud](https://github.com/CDLUC3/mrt-cloud)
- Java and Ruby 
  - [Merritt ZK](https://github.com/CDLUC3/mrt-zk) (created in 2024)
- Ruby
  - [SSM Gem](https://github.com/CDLUC3/uc3-ssm) - Shared with other UC3 services
  - [Merritt Atom](https://github.com/cdluc3/mrt-atom) - Nuxeo processing for ingest
    - Uses [Ruby Ingest](https://github.com/CDLUC3/mrt-ingest-ruby)

### Configuration
- [Tomcat](https://github.com/CDLUC3/mrt-tomcat)

### Supporting Services
- [Merritt Testing](testing.md)
- Java 
  - [Merritt Box Tools](https://github.com/CDLUC3/mrt-box) 
- Ruby
  - [Merritt Admin Tool - UC3 Account](https://github.com/CDLUC3/mrt-admin-sinatra) 
  - [Merritt End to End Tests](https://github.com/CDLUC3/mrt-integ-tests)
  - [Merritt Integration Test Images](https://github.com/CDLUC3/merritt-docker/tree/main/mrt-inttest-services)
  - [Ingest Workspace Manifest Builder](https://github.com/CDLUC3/s3-sinatra) 
- Docker
  - [Merritt Docker](https://github.com/CDLUC3/merritt-docker)
- Other
  - [Merritt Maintenance Scripts](https://github.com/CDLUC3/mrt-maint)
- Python
  - [Merritt Repository Tagger](https://github.com/CDLUC3/mrt-repo-tagger)
  - [Merritt Locust Testing](https://github.com/CDLUC3/mrt-locust)

## Merritt DevOps
- [Merritt Build System Design](https://github.com/CDLUC3/mrt-doc/tree/main/design/aws-build)
- [Merritt Tomcat Deploy](https://github.com/CDLUC3/mrt-tomcat-deploy)
- [Merritt Service Release Manifest](https://github.com/CDLUC3/mrt-service-release-manifest)
- [Merritt Sceptre Scripts](https://github.com/CDLUC3/mrt-sceptre)
- Deprecated?
  - [Merritt Ansible Deployment Tools](https://github.com/CDLUC3/mrt-ansible-service-restart)  

## Project Overview
- [Project Board](https://github.com/CDLUC3/mrt-doc/projects/1)
- [System Operations Board](https://github.com/CDLUC3/mrt-doc/projects/4)
- [System Enhancement Ideas Grouped by Theme](https://github.com/CDLUC3/mrt-doc/milestones)

## More info
- [Deprecated Functionality](deprecated_functionality.md)

---

## Internal Links
- [Merritt Troubleshooting](https://github.com/CDLUC3/mrt-doc-private/blob/main/docs/system-recovery/README.md)
