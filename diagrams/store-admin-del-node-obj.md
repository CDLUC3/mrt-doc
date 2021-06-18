---
title: "Storage Admin: Remove Object from Inventory"
description: "Storage Admin: Remove Object from Inventory, generate delete lists for all copies"
prevpage: store-admin-del-node-keys
nextpage: store-admin-force-audit
chart: store-admin-del-node-obj.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Create delete list
```
select
  n.number,
  o.ark,
  v.number,
  f.path
from
  inv_audits a
inner join 
  inv_files f
  on 
    f.id = a.inv_file_id
inner join
  inv_versions v
  on
    v.id = a.inv_version_id
inner join
  inv_objects o
  on
    o.id = a.inv_object_id
inner join
  inv_nodes n
  on
    n.id = a.inv_node_id
where
  inv_node_id = ?
and exists (
    select 1
    from 
      inv_collections_inv_objects icio
    where
      icio.inv_object_id =  a.inv_object_id
    and
      icio.inv_collection_id = ?
)

```
## Delete node for collection

```
delete from
  inv_collections_inv_nodes 
where
  inv_collection_id = ?
and
  inv_node_id = ?
```

## Question
- Is there an endpoint or a delete trigger to remove associated objects and files?

## Delete replicated object records
```
delete from 
  inv_nodes_inv_objects inio
where
  inv_node_id = ?
and exists (
    select 1
    from 
      inv_collections_inv_objects icio
    where
      icio.inv_object_id =  inio.inv_object_id
    and
      icio.inv_collection_id = ?
)
```

## Delete replicated file records
```
delete from 
  inv_audits a
where
  inv_node_id = ?
and exists (
    select 1
    from 
      inv_collections_inv_objects icio
    where
      icio.inv_object_id =  a.inv_object_id
    and
      icio.inv_collection_id = ?
)
```