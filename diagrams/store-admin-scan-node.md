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

## Crawl by keys (future)
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

## Generate a sorted inventory list for a storage node bucket

Iterate over the generated inventory

## Compare crawled keys to keys in inventory
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