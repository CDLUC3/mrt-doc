# Merritt Object Guidance

_Notes derived from [#1285](https://github.com/CDLUC3/mrt-doc/issues/1285)_

## End User Guidance 

### Object Size Limit 
- Recommended: 500GB
- Largest: 2.7TB
- Code Limit: None
- Note: Impacts ZFS file size in use, impacts the ability to download the full object or to replicate many of this size.
- Affects:
  - ZFS size
  - Replication instance type (i3en)
- [ ] TODO: Add limit in code  

### Object Size UI Upload Limit
- Recommended: 30GB
- Largest: 30GB
- Code Limit: [30GB](https://github.com/CDLUC3/mrt-dashboard/blob/main/config/app_config.yml#L23)
- Note: Need pre-signed upload option for larger files.
- Affects:
  - end user bandwidth
  - scratch space on UI servers (currently 100GB)
- [ ] TODO: create presigned upload solution for outliers.

### Nuxeo Upload Limit 
- Recommended: 20GB 
- Largest: 30GB
- Code Limit: 
- Note:  Nuxeo has problems above 20GB.
- [ ] TODO: set explicit limit in code.

### Object Assembly Limit 
- Recommended: 50GB 
- Largest: Dryad used to request larger sizes
- Code Limit: [214GB](https://github.com/CDLUC3/mrt-dashboard/blob/main/config/app_config.yml#L5)
- Affects:
  - Access Server Instance Type (i3en)
  - Assembly bucket temporary storage costs
- Note: Recently resized to adjust for Dryad migration

### File Count Limit 
- Recommended: 50K
- Largest: 360K
- Code Limit: Inventory service can be impacted even for a small metadata change due to the size of the manifest object that is rewritten. 
- Note:
- Affects:
  - inventory RAM
- [ ] TODO: TODO: evaluate impact of the 50K and 360K and determine optimal memory to accommodate each.

### Storage Manifest Size Limit (relates to file count limit or to excessive versioning) 
- Recommended: 30MB
- Largest: 222MB
- Code Limit: 
- Note: Calculated based on downloading a manifest with 50K files.
- Affects:
  - inventory RAM
- [ ] TODO: Could we solve this by adding RAM to INV tomcat or running slightly larger servers?

### File Listing Limit in the UI 
- Recommended: 1000
- Largest: 360K
- Code Limit: 
- Note:
- Affects:
  - UI memory
  - End user bandwidth
  - End user RAM 
- [ ] TODO: Limit and pagination should exist in the UI

### File Listing Limit in the Object API 
- Recommended: 2500
- Largest: 2500
- Code Limit: [maxfile](https://github.com/CDLUC3/mrt-dashboard/blob/prune/app/models/inv_object.rb#L131)
- Note:
- Affects:
  - UI memory
  - End user bandwidth
  - End user RAM 

### File Size Limit 
- Recommended: 
- Largest: 290G
- Code Limit: 
- Note: Affects space on storage server and possibly ZFS size
- Affects:
  - ZFS Size
  - Replication instance type (i3en)
  - Networking IO for Storage Servers (r6in) 
- [ ] TODO: ask David about S3 limitations or fixity check limitations

### Ingest Manifest Limit 
- Recommended: 5MB
- Largest: Eric has seen some as large as 8-9MB
- Code Limit: 
- Note:
- Affects

### Daily Ingest Limit 
- Recommended: 3.6TB
- Largest: 3.6TB
- Code Limit: 
- Affects:
  - ZFS Size
  - Number of ingest servers
  - Number of storage servers
  - Networking IO for Storage Servers (r6in) 

### Weekly Ingest Limit 
- Recommended: 14TB
- Largest: 14TB
- Code Limit: 
- Note:
- Affects:
  - ZFS Size
  - Number of ingest servers
  - Number of storage servers
  - Networking IO for Storage Servers (r6in) 

### Fixity Frequency
- Recommended: Every 60-90 Days
- Affects:
  - Number of Audit Servers
