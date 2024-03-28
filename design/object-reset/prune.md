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

### Repair option 1 (for depositors)
- use mrt-delete files to correct the current object

### Repair option 2 (for depositors and Merritt Team) 
- run a Merritt ADD using a storage-generated ingest manifest for reconstruction
 - generate the baseline manifest from the current version
 - if we expose the storage manifest paths as an input format, what restrictions do we need to set on the use of these patterns?  Or, should the use of these paths be a privileged operation?
 - question - can the manifest be modified so that a rename effectively takes place?

### Repair option 3 (for Merritt Team) 
- run a Merritt ADD using a storage-generated ingest manifest for reconstruction
 - generate the baseline manifest from ALL versions
 - this would allow versioning mistakes to be created

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
