---
title: "Storage Admin: Force Audit"
description: "Storage Admin: Force Audit of Object or Collection"
prevpage: store-admin-del-node-obj
nextpage: store-admin-change-primary-node
chart: store-admin-force-audit.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Force audit reset for object

```
update 
  inv_audits
set 
  status = 'unknown'
where
  inv_object_id = (
    select
      id 
    from
      inv_objects
    where
      ark = ?
  ) 
```

## Force audit reset for collection

```
update 
  inv_audits a
set 
  status = 'unknown'
where exists (
  select 1
  from 
    inv_collections_inv_objects icio
  where
    icio.inv_object_id = a.inv_object_id
  and
    icio.inv_collection_id = ?
)
```