## Incomplete Storage Admin Efforts

### Delete Object

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  REPLIC(Replication)
  ST(Storage)
  INV(Inventory)
  EZID
  RDS[(Inventory DB)]


  subgraph "Use Case: Remove Object from Storage and Inventory"
    SAUI-->SA
    SA-->|"1. del sec copy"|REPLIC
    SA-->|"2. del prim copy"|ST
    SA-->|"3. del from inventory"|INV
    SA-->|"4. del localid"|INV
    SA-->|"5. update EZID?"|EZID
    SA-->|"6. record delete in inv_storage_maints"|RDS
  end  

  style EZID fill:cyan
  style RDS fill:#F68D2F
```

Steps to perform
- For each secondary
  - call Replic::objectDelete(node, ark)
- For primary
  - call Storage::objectDelete(node, ark)
  - Inventory::objectDelete(ark)
  - Inventory::localIdDelete(owner, localid)
- Create Tombstone entry for object
- Reflect deletion in daily billing stats

#### Tombstone Objects

```sql
create table inv_object_maints(
  id int,
  inv_object_id int,
  ark varchar(255),
  object_type enum('MRT-curatorial','MRT-system'),
  role enum('MRT-class','MRT-content'),
  aggregate_role enum('MRT-collection','MRT-owner','MRT-service-level-agreement','MRT-submission-agreement','MRT-none')
  version_number smallint,
  erc_who mediumtext,
  erc_what mediumtext,
  erc_when mediumtext,
  erc_where mediumtext,
  created timestamp,
  action enum('removed', 'recreated', 'modified-by-merritt', 'maintenance-note')
  modified timestamp,
  removed timestamp,
  note mediumtext
)
```

### Change Primary Storage Node

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  RDS[(Inventory DB)]
  INV(Inventory)
  ING(Ingest)
  AQL("Admin Queue Lambda")

  subgraph "Use Case: Change Primary Node for Collection"
    SAUI-->SA
    RDS-->|"get obj list"|SA
    SA-->|"update primary"|AQL
    AQL-->|"update primary"|INV
    ING-->|"Get Primary Node"|SA
  end

  style RDS fill:#F68D2F
  style AQL fill:yellow

```

### Update Manifest Option

This is a speculative feature.  This would allow the Merritt System to provide a mechanism to generate a new manifest file for an object that works around system limitations.

This could also be used to clean up issues with obsolete system files.

Allow the upload of a repaired manifest for an object.

Correspondingly, a "get-augmented-manifest" option would exist to generate a repaired manifest with Merritt software.

---

[Completed Storage Admin Features](completed.md)