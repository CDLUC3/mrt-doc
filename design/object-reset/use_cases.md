# Use Cases

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


