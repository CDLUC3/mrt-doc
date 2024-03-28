# Object Prune Design

_Presented as [Option 9 in README](README.md#option-9-use-existing-tools-to-make-current-version-correct-apply-a-prune-transaction-to-purge-files-that-are-not-in-the-current-version-of-the-object)_

## Summary

Use existing tools to make current version "correct". 
Apply a "PRUNE" transaction to purge files that are not in the current version of the object.

### PRO
- leverages existing tools
- depositor can preview purge candidates in the Merritt UI (and in an enhanced API)
- depositor initiates the PRUNE
- provenance can be recorded when the PRUNE is applied
  - should we record a new version to save this provenance information?

### CON:
- fix is a 2 step process  

## Process Description

<details>
<summary>Sample Storage Manifest</summary>

### Version 1: Add cat.txt
```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
```

### Version 2: Add dog.txt

```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
```

### Version 3: Update dog.txt

```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
- number: 3
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
```


</details>

### Repair option 1 (for depositors)
- use mrt-delete files to correct the current object

<details>
<summary>Sample Storage Manifest after mrt-delete.txt</summary>

### Merritt delete file
```
producer/cat.txt
```

### Version 4: Process Merritt Delete of cat.txt

```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
- number: 3
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
- number: 4
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    system/mrt-delete.txt:
```

</details>

### Repair option 2 (for depositors and Merritt Team) 
- run a Merritt ADD using a storage-generated ingest manifest for reconstruction
 - generate the baseline manifest from the current version
 - if we expose the storage manifest paths as an input format, what restrictions do we need to set on the use of these patterns?  Or, should the use of these paths be a privileged operation?
 - question - can the manifest be modified so that a rename effectively takes place?

<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

### Merritt ingest manifest generated from storage (iterated over all versions)
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|1|producer/cat.txt?presigned-params | sha256 | aaa | 111 | datetime | cat.txt | text/plain
https://storage.provider/ark:/test/foo|2|producer/dog.txt?presigned-params | sha256 | bbb | 112 | datetime | dog.txt | text/plain
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
```

</details>

### Repair option 3 (for Merritt Team) 
- run a Merritt ADD using a storage-generated ingest manifest for reconstruction
 - generate the baseline manifest from ALL versions
 - this would allow versioning mistakes to be created

<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

### Merritt ingest manifest generated from storage
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|1|producer/cat.txt?presigned-params | sha256 | aaa | 111 | datetime | cat.txt | text/plain
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
```

### Merritt ingest manifest generated from storage (edited to remove cat.txt)
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
```

### Version 4: Process ADD using manifest above
```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
- number: 3
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
- number: 4
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    system/mrt-ingest.txt:
```

</details>

## Submit the Repair manifest as a Merritt ADD

## Review the correction in the Merritt UI
- The Merritt Object API could add a JSON array of "prune candidates" from prior versions

## Apply a Merritt PRUNE transaction
      - Submit this through ingest with no payload
### Prune options
- prune any file key that has not been pulled forward to the current version
- prune any file key that has not been pulled forward to the current version AND that has a duplicate checksum on a different key

## Storage actions
- delete prune-able keys from primary storage
- remove pruned keys from the storage manifest (or mark them as pruned)
- trigger an inventory rebuild
- trigger a re-replication of the entire object

## Billing Process Implications
- The current billing process does not account for content deletion.  If a motivation for fixing content is to reduce cost, we will need to add features to decrement billing numbers
  - tombstone deleted file data to a new database table
  - run a monthy reconciliation process (as needed by collection?) to account for content removal
- Create a report to total prune-able counts at a collection level   
