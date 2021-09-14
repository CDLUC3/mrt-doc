---
title: "Storage Admin: Force Replic"
description: "Storage Admin: Force Replic of Object or Collection"
prevpage: store-admin-force-audit
nextpage: store-admin-change-primary-node
chart: store-admin-force-replic.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Force replic reset for object

```
update 
  inv_nodes_inv_objects inio
set
  replicated = null
where 
  inv_object_id = ?
```

## Force replic reset for collection

_Mark all objects in the collection as unreplicated.  This will notify the replication service to perform replication._

```
update 
  inv_nodes_inv_objects inio
set
  replicated = null
where exists (
    select 
      1
    from 
      inv_collections_inv_objects icio
    where
      icio.inv_collection_id = ?
    and
      inio.inv_object_id = icio.inv_object_id
)
```