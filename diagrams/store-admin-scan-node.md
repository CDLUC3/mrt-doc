---
title: "Storage Admin: Scan Storage Node for untracked keys"
description: "Storage Admin: Scan Storage Node for untracked keys"
prevpage: store-admin-del-node
nextpage: store-admin-del-node-keys
chart: store-admin-scan-node.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Track status of scan in progress OR the last scan initiated

Gather the status of scans in process

```
select
  n.number,
  n.description,
  n.access_mode,
  iss.status,
  case
    when iss.key_count = 0 then 100
    else 100 * iss.keys_processed / key_count
  end,
  iss.created,
  (
    select 
      count(*) 
    from 
      inv_storage_maints ism
    where
      ism.inv_node_id = n.id
    and
      ism.maint_status = 'review'
  ) as review_count,
  (
    select 
      count(*) 
    from 
      inv_storage_maints ism
    where
      ism.inv_node_id = n.id
    and
      ism.maint_status = 'delete'
  ) as delete_count
from
  inv_nodes n
left join inv_storage_scans iss
  on n.id = iss.inv_node_id
where
  exists (
    select
      inv_node_id
    from
      inv_storage_scans issl
    where
      issl.id = iss.id
    group by
      inv_node_id
    having
      created = max(created)
  )
```

## Generate a sorted inventory list for a storage node bucket

### Start scan job

```
insert into inv_storage_scans(
  inv_node_id
  status,
  key_count,
  last_s3_key
)
values(
  ?,
  'started',
  ?,
  ''
)
```

Iterate over the generated inventory
### Obtain starting point for a scan iteration
```
select
  last_s3_key
from
  inv_storage_scans
where
  inv_node_id = ?
```

### Update status at the end of a scan iteration

```
update
  inv_storage_scans
set
  last_s3_key = ?,
  keys_processed = ?,
  status = ?
where
  status = 'started'
and
  inv_node_id = ?
```
### Compare crawled keys to keys in inventory
```
select 
  o.ark,
  v.number,
  f.pathname
from
  inv.inv_objects o
left join inv.inv_versions v
  on o.id = v.inv_object_id
left join inv.inv_files f
  on o.id = f.inv_object_id
  and v.id = f.inv_version_id
where 
  o.ark = ?
```

### Add mismatches to the review list

```
insert into inv_storage_maints(
  inv_node_id,
	keymd5,
	size,
	file_created,
  maint_status,
  maint_ark,
  s3key
)
values(
  ?,
  ?,
  ?,
  ?,
  'review',
  ?,
  ?
)
```

## Crawl by keys (using only API keys -- no inventory list)
_This is considered the optimal approach, but our content as SDSC cannot efficiently invoke these API calls_

Iterate over ark shoulders
```
aws s3 ls s3://{bucket}/ark:/
```

Iterate through object keys
```
aws s3 ls s3://{bucket}/ark:/{shoulder}/
```

Gather file keys for an object
```
aws s3 ls "s3://{bucket}/ark:/{shoulder}/{ark}|{ver}|producer"
aws s3 ls "s3://{bucket}/ark:/{shoulder}/{ark}|{ver}|system"
```
