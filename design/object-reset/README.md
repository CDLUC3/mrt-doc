# Object Version Reset

## Use Cases

### Use Case: Nuxeo Path Name Cleanup

#### Issue
- file pathnames contain url parameters and may not be meaningful to future users
- when the file pathname changes, a new file is created
- duplicate file content exists under different pathnames
- storage cost saving opportunity

#### Scope: 100,000+ objects

```sql
show query here
```

### Use Case: Depositor acceidentally uploads unwanted file

#### Examples
- Accidental PII ingest
- Very large Dryad files rejected by curators in subsequent version
- Storage cost saving opportunity

#### Scope: Case by Case

### Use Case: Excessive Object Versioning

#### Example
- escholarship metadata changes
- very granular metadata changes may not be meaningful to future users accessing preservation content

### Use Case: Incomplete Processing of Version addition

#### Scope: Rare, driven by system outage

### Use Case: Pathname Normalization

#### Issue
During the scope of a large ingest effort, a desire arises to normalize pathnames for a large batch of files that have already been ingested

### Use Case: Bulk delete files unsuitable for preservation

#### Issue
- thumbs.db files added for images
- .DS_store files
- __MACOSX files
- .git or .svn repository ingested with content

### Use Case: Storage Savings

#### Issue: Purge unwanted files from old object versions

## Implmentation Options

### Option: Mark Current Version as the Reset Version

#### Process
- User must fix the current version of the object using existing tools (ingest updates & mrt-delete)
- New transaction is run to mark the state of the current object as definitive
  - Is this sent through ingest?
  - Is this an administrative action sent to inventory?
- Any files not found in the current version object will be removed from the storage manifest
- Inventory will remove these files
- These files will be eligible for deletion from cloud storage
  - Using the storage scan process?
  - Using new file delete operations

#### Pros
- No files are cloned/copied
- Version number stays intact
- Minimizes processing

#### Cons
- Relies heavily on the existing mrt-delete process to reconcile the current version
- No mechanism exists to normalize or correct pathnames
- No evidence is left to indicate that this process took place

### Option: Pull forward desired files using an ingest manifest exported from storage

#### Process
- Ingest manifest is generated from Merritt Storage
- Desired files are selected and renamed as needed
- Manifest is sent to Ingest as a new request type of `replace`
- A new version is generated containing a copy of all desired content
- Storage manifest should reflect that the replacement took place at a specific version
- Files from prior versions should be treated as if they no longer exist
- Older version files will be purge-able by inventory
- Older version files will be purge-able from cloud storage
- A purge process should exist to purge the older version content

#### Pros
- Use can review the new state of the object before electing to purge the old versions
- The storage manifest and the version numbering will convey that this maintenance activity took place

#### Cons
- Temporary duplication of object content
- Duplication could persist if the user does not enable / approve the running of the purge process
- Replication logic will need to change to not assume that versioning starts at 1

### Option: Modify Merritt file paths to use content hash

#### Pros
- Storage optimized solution - duplicate files are only stored once per object

#### Cons
- Loss of semantically meaningful key names
