# Completed Storage Admin Features 

This page contains the source diagrams used in the creation of some of the features of Storage Admin functionality.

- [Storage Admin TODO Items](README.md)

### Add Storage Node
```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  RDS[(Inventory DB)]
  REPLIC(Replication)


  subgraph "Use Case: Add Replication Node for Collection"
    SAUI-->SA
    SA-->|"add node for coll"|RDS
    SA-->|"mark obj unreplicated"|RDS
    RDS-.->|"find unreplicated"|REPLIC
  end

  style RDS fill:#F68D2F
```

### Delete Secondary Copy of an Object

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  REPLIC(Replication)
  RDS[(Inventory DB)]

  subgraph "Use Case: Remove Object from Storage and Inventory"
    SAUI-->SA
    SA-->|"1. del sec copy"|REPLIC
    SA-->|"2. record delete in inv_storage_maints"|RDS
  end  

  style EZID fill:cyan
  style RDS fill:#F68D2F
```

### Storage Scan

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  REPLIC("Replication")
  RDS[(Inventory DB)]
  CLOUD(("Cloud Storage"))

  subgraph "Use Case: Crawl Storage Node for Untracked Files"
    SAUI-->SA
    SA-->|"Start Scan"|REPLIC
    CLOUD-->|"node/key list"|REPLIC
    REPLIC-->|"lookup node/key(batch)"|RDS
    REPLIC--->|"generate node/key review list"|RDS
  end

  style RDS fill:#F68D2F
  style CLOUD fill:#77913C
  
```

### Delete Keys

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  RDS[(Inventory DB)]
  REPLIC("Replication")
  CLOUD(("Cloud Storage"))

  subgraph "Use Case: Delete Keys from Cloud Storage"
    SAUI-->SA
    RDS-->|"1. Read Review List"|SA
    SA-->|"2. Approve Deletes"|RDS
    SA-->|"3. Document exceptions from review list"|RDS
    SA-->|"4. Initiate deletes"|REPLIC
    RDS-->|"5. Read Delete List"|REPLIC
    REPLIC-->|"6. Delete Cloud Objects(keys)"|CLOUD
    REPLIC-->|"7. Record Deletes"|RDS
  end

  style RDS fill:#F68D2F
  style CLOUD fill:#77913C
  
```

### Force Audit

```mermaid
%%{init: {'theme': 'neutral', 'securityLevel': 'loose', 'themeVariables': {'fontFamily': 'arial'}}}%%
graph TD
  SAUI("Storage Admin UI")
  SA("Storage Admin Lambda")
  RDS[(Inventory DB)]

  subgraph "Use Case: Force Audit for Obj or Collection"
    SAUI-->SA
    SA-->|"clear audit status"|RDS
  end

  style RDS fill:#F68D2F
```

