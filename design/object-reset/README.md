# Object Version Reset

## Solution Categories

### Alter Object Composition 
- Re-write versions in place; Purge files while rewriting; No provenance for changes
  - This is David's changeToken proposal
  - PRO: minimal changes
  - CON: no provenance for change
- Re-ingest content as new object (new ark) - no local id; Delete old object
  - PRO: uses existing functionality
  - CON: requires a new ark, doesn't work if localid is present 
- Re-ingest content as new object (new ark) - remap local id; Delete old object
  - PRO: minimal changes
  - CON: requires a new ark 
- Rebuild object from storage manifest (new object_id, same ark); Purge orphaned files
  - PRO: could save the storage manifest before and after as a provenance change; opportunity to review changes beforee applying
  - CON: does not facilitate renames 
- Collapse History and Reset object to V1 (same ark); Purge orphaned files; History is lost
  - PRO: may be easy to implement the cleanup logic, ark is retained
  - CON: history is lost, no provenance of change, no opportunity to preview 
- Collapse History and Reset object to new version (same ark); Purge orphaned files; History is documented but inaccessible
  - PRO: ark is retained, histoy is kept, need way to retain old history without items in cloud storage 
- Tombstone files in cloud storage to convey key deletions/key renames; History is documented but inaccessible

### Alter Object Hierarchy
- Change Owner
  - The latest mrt-owner.txt file will determine ownership for ALL versions of the object
  - Local id collions might make this impossible
- Change collection  
  - The latest mrt-membership.txt file will determine membership for ALL versions of the object
  - Collection changes could be incompatible with the primary storage node/secondary nodes for a collection

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

---

### Use Case: Depositor acceidentally uploads unwanted file

#### Examples
- Accidental PII ingest
- Very large Dryad files rejected by curators in subsequent version
- Storage cost saving opportunity

#### Scope: Case by Case


---

### Use Case: Excessive Object Versioning

#### Example
- escholarship metadata changes
- very granular metadata changes may not be meaningful to future users accessing preservation content


---

### Use Case: Incomplete Processing of Version addition

#### Scope: Rare, driven by system outage


---

### Use Case: Pathname Normalization

#### Issue
During the scope of a large ingest effort, a desire arises to normalize pathnames for a large batch of files that have already been ingested


---

### Use Case: Bulk delete files unsuitable for preservation

#### Issue
- thumbs.db files added for images
- .DS_store files
- __MACOSX files
- .git or .svn repository ingested with content


---

### Use Case: Storage Savings

#### Issue: Purge unwanted files from old object versions


---

## Implmentation Options

### Scenario
```yaml
ark: ark:/111/222
versions:
- num: 1
  files:
    producer/foo: { size: 10, digest: 'AAA', path: "1/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/cat: { size: 30, digest: 'AAC', path: "1/producer/cat" }
  size: 60
- num: 2
  files:
    producer/foo: { size: 40, digest: 'FFF', path: "2/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "2/producer/dog" }
  size: 70
- num: 3
  files:
    producer/foo: { size: 40, digest: 'EEE', path: "3/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "2/producer/dog" }
  size: 40
size: 170
```

### Option: Mark Current Version as the Reset Version

```yaml
ark: ark:/111/222
versions:
- num: 1
  files:
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" }
  size: 20
- num: 2
  files:
    producer/dog: { size: 30, digest: 'AAC', path: "2/producer/dog" }
  size: 30
- num: 3
  files:
    producer/foo: { size: 40, digest: 'EEE', path: "3/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "2/producer/dog" }
  size: 40
size: 90
```

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


---

### Option: Pull forward desired files using an ingest manifest exported from storage

#### Step 1: Pull Forward
```yaml
ark: ark:/111/222
versions:
- num: 1
  files:
    producer/foo: { size: 10, digest: 'AAA', path: "1/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/cat: { size: 30, digest: 'AAC', path: "1/producer/cat" }
  size: 60
- num: 2
  files:
    producer/foo: { size: 40, digest: 'FFF', path: "2/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "2/producer/dog" }
  size: 70
- num: 3
  files:
    producer/foo: { size: 40, digest: 'EEE', path: "3/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "1/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "2/producer/dog" }
  size: 40
- num: 4
  files:
    producer/foo: { size: 40, digest: 'EEE', path: "4/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "4/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "4/producer/dog" }
  size: 90
  reload: true
size: 260
```

#### Step 2: Purge Old Versions
```yaml
ark: ark:/111/222
versions:
- num: 4
  files:
    producer/foo: { size: 40, digest: 'EEE', path: "4/producer/foo" } 
    producer/bar: { size: 20, digest: 'AAB', path: "4/producer/bar" } 
    producer/dog: { size: 30, digest: 'AAC', path: "4/producer/dog" }
  size: 90
  reload: true
size: 90
```

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


---

### Option: Modify Merritt file paths to use content hash

```yaml
ark: ark:/111/222
versions:
- num: 1
  files:
    producer/foo: { size: 10, digest: 'AAA', path: "AAA/10" } 
    producer/bar: { size: 20, digest: 'AAB', path: "AAB/20" } 
    producer/cat: { size: 30, digest: 'AAC', path: "AAC/30" }
  size: 60
- num: 2
  files:
    producer/foo: { size: 40, digest: 'FFF', path: "FFF/40" } 
    producer/bar: { size: 20, digest: 'AAB', path: "AAB/20" } 
    producer/dog: { size: 30, digest: 'AAC', path: "AAC/30" }
  size: 40
- num: 3
  files:
    producer/foo: { size: 40, digest: 'EEE', path: "EEE/40" } 
    producer/bar: { size: 20, digest: 'AAB', path: "AAB/20" } 
    producer/dog: { size: 30, digest: 'AAC', path: "AAC/30" }
  size: 40
size: 140
```

#### Process
- Storage key should be `ark | hash | length` regardless of pathname/version
- Comment dloy - this only becomes needed if we allow a reset to preserve more than one version - preserving only current not needed

#### Pros
- Storage optimized solution - duplicate files are only stored once per object

#### Cons
- Loss of semantically meaningful key names (dloy-serious problem)

---

### Option: Reset Version should always become version 1

- _dloy : see below._

#### Process

####  Pros

#### Cons


---

### Option: Reset object using a new add version

#### Process
- a version add with reset request is received by ingest
- storage deletes the content for the specific ark
- all add version content is treated as new using the original ark
- inventory receives reset request
- inventory deletes all existing content on the ark
- inventory treats the added content as new

####  Pros
- same key architecture
- delete and add functions do not change for storage and inventory
- resulting storage sets all content as 1 so specific match of content to saved keys
- all changes in new add populate merritt inv without requesting hybrid processing
- preserving the ark alloww outside references to continue working

#### Cons
- all content will be written as version 1 so no earlier content is saved - redundant processing
- recovery of failed process may be issue

---

### Option: Reset object using existing current version
- Note this is similar to _Option: Reset Version should always become version 1_ above

#### Process
- a reset request is received by ingest - without action
- storage passed reset
- storage uses content S3 keys to copy (or leave alone) to a version 1 key. If current file uses previous version 10 then version 10 copied to version 1. Current architecture will not have collisions if only current is preserved
- storage delete all unused content for specific ark (key version > 1)
- inventory deletes all existing content on the ark
- inventory treats the added content as new

####  Pros
- same key architecture
- resulting storage sets all content as 1 so specific match of content to saved keys
- all changes in new add populate merritt inv without requesting hybrid processing
- preserving the ark alloww outside references to continue working
 
#### Cons
- new build copy logic required in storage
- new delete logic required for this special case
- Much content will be rewritten except for matching
- recovery of failed process may be issue
