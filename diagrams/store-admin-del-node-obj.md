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
  and 
    f.inv_version_id = a.inv_version_id
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
  o.ark = ?
```

## Question
- Is there an inventory function to perform the delete?

## Queries
```
delete from inv_objects
delete from inv_versions
delete from inv_files
delete from inv_collections_inv_objects
delete from inv_nodes_inv_objects
delete from inv_audit
delete from inv_duas
delete from inv_dublinkernels
delete from inv_embargoes
?? delete from inv_ingests
delete from inv_metadatas
```