# Object Prune Design

_Presented as [Option 9 in README](README.md#option-9-use-existing-tools-to-make-current-version-correct-apply-a-prune-transaction-to-purge-files-that-are-not-in-the-current-version-of-the-object)_

## Summary

Use existing tools to make current version "correct". 
Apply a "PRUNE" transaction to purge files that are not in the current version of the object.

### PRO
- leverages existing tools
- depositor can preview purge candidates in the Merritt UI (and in an enhanced API)
- depositor initiates the PRUNE
- provenance should be recorded when the PRUNE is applied

### CON:
- fix is a 2 step process  

## Process Description

<details>
<summary>Sample Storage Manifest</summary>

### Version 1: Add cat.txt and goat.txt
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
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
```

### Version 2: Add dog.txt; add kitty.txt which is identical to cat.txt

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
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
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
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 3
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
```


</details>

### Repair option 1 (for depositors)
- use mrt-delete files to correct the current object

<details>
<summary>Sample Storage Manifest after mrt-delete.txt</summary>

### Merritt delete file
```
producer/cat.txt
producer/goat.txt
```

### Version 4: Process Merritt Delete of cat.txt and goat.txt

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
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 3
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 4
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
    system/mrt-delete.txt:
```

</details>

### Repair option 2 (for depositors and Merritt Team) 
- run a Merritt ADD using a storage-generated ingest manifest for reconstruction
 - generate the baseline manifest from the current version

> [!CAUTION]
> Storage generated manifests will contain presigned URL's.  We will need to ensure that appropriate trust is in place before providing these URLs to end users.
> Manifests must be processed before the presigned URL's expire.  This might be complicated to offer to depositors.

<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

### Merritt ingest manifest generated from storage
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|1|producer/cat.txt?presigned-params | sha256 | aaa | 111 | datetime | cat.txt | text/plain
https://storage.provider/ark:/test/foo|1|producer/goat.txt?presigned-params | sha256 | ddd | 444 | datetime | goat.txt | text/plain
https://storage.provider/ark:/test/foo|2|producer/kitty.txt?presigned-params | sha256 | aaa | 111 | datetime | kitty.txt | text/plain
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
```

### Merritt ingest manifest generated from storage (edited to remove cat.txt)
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
https://storage.provider/ark:/test/foo|2|producer/kitty.txt?presigned-params | sha256 | aaa | 111 | datetime | kitty.txt | text/plain
```

</details>

> [!NOTE]
> By modifying the `nfo:fileName` column in the generated manifest, the user can process a file rename.  Storage will treat that file as an addition.

### Repair option 3 (for Merritt Team) 
- run a Merritt ADD using a storage-generated ingest manifest for reconstruction
 - generate the baseline manifest from ALL versions
 - this would allow versioning mistakes to be created

<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

### Merritt ingest manifest generated from storage (iterated over all versions)
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|1|producer/cat.txt?presigned-params | sha256 | aaa | 111 | datetime | cat.txt | text/plain
https://storage.provider/ark:/test/foo|1|producer/goat.txt?presigned-params | sha256 | ddd | 444 | datetime | goat.txt | text/plain
https://storage.provider/ark:/test/foo|2|producer/dog.txt?presigned-params | sha256 | bbb | 112 | datetime | dog.txt | text/plain
https://storage.provider/ark:/test/foo|2|producer/kitty.txt?presigned-params | sha256 | aaa | 111 | datetime | kitty.txt | text/plain
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
```

### Merritt ingest manifest generated from storage (edited to remove cat.txt and to select a specific version of dog.txt)
```
#%columns | nfo:fileURL | nfo:hashAlgorithm | nfo:hashValue | nfo:fileSize | nfo:fileLastModified | nfo:fileName | nie:mimeType
https://storage.provider/ark:/test/foo|3|producer/dog.txt?presigned-params | sha256 | ccc | 113 | datetime | dog.txt | text/plain
https://storage.provider/ark:/test/foo|2|producer/kitty.txt?presigned-params | sha256 | aaa | 111 | datetime | kitty.txt | text/plain
```

</details>

## Submit the Repair manifest as a Merritt ADD

> [!NOTE]
> Because the pathname, checksum, and file size are unchanged; the storage service will utilizie the existing storage keys rather than creating new files in version 4.


<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

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
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
- number: 2
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 3
  files:
    producer/cat.txt:
      key: ark:/test/foo|1|producer/cat.txt
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 4
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
    system/mrt-ingest.txt:
```

</details>

## Review the correction in the Merritt UI
- The Merritt Object API could add a JSON array of "prune candidates" from prior versions

## Apply a Merritt PRUNE transaction
Submit this through ingest with no payload

### Prune Alororithm 1: Prune any pathname ("fileid") not in the current version
- prune any pathname ("file id") that has not been pulled forward to the current version

<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

### Version 5: Process PRUNE (prune cat.txt and goat.txt)
```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      pruned: true
      size: 111
      digest: aaa
    producer/goat.txt:
      pruned: true
      size: 444
      digest: ddd
- number: 2
  files:
    producer/cat.txt:
      pruned: true
      size: 111
      digest: aaa
    producer/goat.txt:
      pruned: true
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 3
  files:
    producer/cat.txt:
      pruned: true
      size: 111
      digest: aaa
    producer/goat.txt:
      pruned: true
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 4
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
    system/mrt-ingest.txt:
- number: 5
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
    system/mrt-provenance.txt:
```
</details>

### Prune Algorithm 2: Prune any pathname ("fileid") not in the current version IF the file's checksum exists in the current version of the object
- prune any pathname ("fileid") that has not been pulled forward to the current version IF the file's checksum exists in the current version of the object under a different pathname ("fileid")
- this is a more conservative option that ensures no unique digital files will be purged

<details>
<summary>Sample Storage Manifest: ADD from ingest manfiest</summary>

### Version 5: Process PRUNE (prune only cat.txt)
```yaml
ark: ark:/test/foo
local_id: loc
versions:
- number: 1
  files:
    producer/cat.txt:
      pruned: true
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
- number: 2
  files:
    producer/cat.txt:
      pruned: true
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|2|producer/dog.txt
      size: 112
      digest: bbb
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 3
  files:
    producer/cat.txt:
      pruned: true
      size: 111
      digest: aaa
    producer/goat.txt:
      key: ark:/test/foo|1|producer/goat.txt
      size: 444
      digest: ddd
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
- number: 4
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
    system/mrt-ingest.txt:
- number: 5
  files:
    producer/dog.txt:
      key: ark:/test/foo|3|producer/dog.txt
      size: 113
      digest: ccc
    producer/kitty.txt:
      key: ark:/test/foo|2|producer/kitty.txt
      size: 111
      digest: aaa
    system/mrt-provenance.txt:
```

</details>

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


----
## Nuxeo Brainstorming

```
1 foo.pdf?change=1 dig=aaa
2 foo.pdf?change=2 dig=aaa
3 foo.pdf?change=3 dig=bbb
4 foo.pdf?change=4 dig=ccc
5 foo.pdf?change=5 dig=ccc
6 foo.pdf dig=ccc

After Prune algorithm 1 (deletes 5 files)
6 foo.pdf dig=ccc

After Prune algorithm 2 (deletes 2 files)
1 foo.pdf?change=1 dig=aaa
2 foo.pdf?change=2 dig=aaa # the algorithm does not catch that this is duplicated elsewhere
3 foo.pdf?change=3 dig=bbb
6 foo.pdf dig=ccc
```
