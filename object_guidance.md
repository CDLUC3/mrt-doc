# Merritt Object Guidance

_Notes derived from [#1285](https://github.com/CDLUC3/mrt-doc/issues/1285)_

## Object Size Limit 
- Recommended: 500GB
- Largest: 2.7TB
- Code Limit: None
- Note: Impacts ZFS file size in use, impacts the ability to download the full object or to replicate many of this size.
- [ ] TODO: Add limit in code  

## Object Size UI Upload Limit
- Recommended: 30GB
- Largest: 30GB
- Code Limit: [30GB](https://github.com/CDLUC3/mrt-dashboard/blob/main/config/app_config.yml#L23)
- Note: Need pre-signed upload option for larger files.
- [ ] TODO: create presigned upload solution for outliers.

## Nuxeo Upload Limit 
- Recommended: 20GB 
- Largest: 30GB
- Code Limit: 
- Note:  Nuxeo has problems above 20GB.
- [ ] TODO: set explicit limit in code.

## Object Assembly Limit 
- Recommended: 50GB 
- Largest: Dryad used to request larger sizes
- Code Limit: [214GB](https://github.com/CDLUC3/mrt-dashboard/blob/main/config/app_config.yml#L5)
- Note:

## File Count Limit 
- Recommended: 50K
- Largest: 360K
- Code Limit: Inventory service can be impacted even for a small metadata change due to the size of the manifest object that is rewritten. 
- Note:
- [ ] TODO: TODO: evaluate impact of the 50K and 360K and determine optimal memory to accommodate each.

## Storage Manifest Size Limit (relates to file count limit or to excessive versioning) 
- Recommended: 30MB
- Largest: 222MB
- Code Limit: 
- Note: Affects inventory and object restoration from storage.  Calculated based on downloading a manifest with 50K files.

## File Listing Limit in the UI 
- Recommended: 1000
- Largest: 360K
- Code Limit: 
- Note:
- TODO: Limit and pagination should exist in the UI

## File Listing Limit in the Object API 
- Recommended: 2500
- Largest: 2500
- Code Limit: [maxfile](https://github.com/CDLUC3/mrt-dashboard/blob/prune/app/models/inv_object.rb#L131)
- Note: 

## File Size Limit 
- Recommended: 
- Largest: 290G
- Code Limit: 
- Note: Affects space on storage server and possibly ZFS size
- [ ] TODO: ask David about S3 limitations or fixity check limitations

## Ingest Manifest Limit 
- Recommended: 5MB
- Largest: Eric has seen some as large as 8-9MB
- Code Limit: 
- Note: 

## Daily Ingest Limit 
- Recommended: 3.6TB
- Largest: 3.6TB
- Code Limit: 
- Note: ZFS limits and storage server bandwidth limits

## Weekly Ingest Limit 
- Recommended: 14TB
- Largest: 14TB
- Code Limit: 
- Note: 

