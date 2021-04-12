## Test

![Overview 1](overview.svg)
<details>
  <summary>diagram source</summary>
  This details block is collapsed by default when viewed in GitHub. This hides the mermaid graph definition, while the rendered image
  linked above is shown. The details tag has to follow the image tag. (newlines allowed)
```mermaid
graph TD
    UI[Merritt UI] -->|File or Manifest, Async| ING(Go shopping)
    UI --> RDS
    ING[Ingest] --> STORE
    STORE --> S3[S3]
    STORE --> SDSC[SDSC Minio]
    STORE --> GLACIER[S3 Glacier]
    STORE --> WASABI[Wasabi]
    STORE --> INV[Inventory]
    INV -->|foo| RDS[Inventory DB]
    DRYAD[Dryad UI] --> UI
    DRYAD --> SWORD[Sword]
    SWORD --> |Manfest, Synchronous| ING
    S3 --> AUD[Audit]
    SDSC --> AUD
    WASABI --> AUD
    AUD --> RDS
```
</details>

## Replication

![Overview 1a](overview1a.svg)
<details>
  <summary>diagram source</summary>
  This details block is collapsed by default when viewed in GitHub. This hides the mermaid graph definition, while the rendered image
  linked above is shown. The details tag has to follow the image tag. (newlines allowed)
```mermaid
graph TD
    RDS1[Inventory DB] --> |Work Queue| REP
    REP[Replication] --> S3[S3]
    REP --> SDSC[SDSC Minio]
    REP --> GLACIER[S3 Glacier]
    REP --> WASABI[Wasabi]
    REP --> |Record Location| RDS2[Inventory DB]
    S3 --> REP
    SDSC --> REP
    WASABI --> REP
```
</details>
