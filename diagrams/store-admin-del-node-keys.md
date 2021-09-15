---
title: "Storage Admin: Delete Keys from Cloud Storage"
description: "Storage Admin: Delete Keys from Cloud Storage"
prevpage: store-admin-scan-node
nextpage: store-admin-del-node-obj
chart: store-admin-del-node-keys.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Review List from scan results

```
select
  s3key,
  size,
  file_created,
  maint_ark
from
  inv_storage_maints
where
  inv_node_id = ?
and
  maint_status = 'review'
order by
  s3key
```

## Approve review list from scan results
_This may or may not include all of the items from the review list_

```
update
  inv_storage_maints
set 
  maint_status = 'delete'
where
  inv_node_id = ?
and
  s3key = ?
```

## Document exceptions from the review list

```
update
  inv_storage_maints
set 
  maint_status = 'note',
  note = ?
where
  inv_node_id = ?
and
  s3key = ?
```

## Record delete status to the database

```
update
  inv_storage_maints
set 
  maint_status = 'removed',
  file_removed = now()
where
  inv_node_id = ?
and
  s3key = ?
```