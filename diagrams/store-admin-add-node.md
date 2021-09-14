---
title: "Storage Admin: Add Replication Node for Collection"
description: "Storage Admin: Add Replication Node for Collection"
prevpage: store-admin-pause-ing-for-coll
nextpage: store-admin-del-node
chart: store-admin-add-node.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Add Node for Collection
```
insert into inv_collections_inv_nodes (
  inv_collection_id,
  inv_node_id
)
values (
    ?,
    ?
)
```

## Trigger the replication of objects in the collection
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

## Design Questions

- Do any special provisions need to be made for collections with a very large number of objects (in order to complete within the lambda time limit)?