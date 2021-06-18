---
title: "Storage Admin: Change Primary Node"
description: "Storage Admin: Change Primary Node for Collection"
prevpage: store-admin-force-audit
nextpage: integ-tests
chart: store-admin-change-primary-node.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Question

- Can this be done in the database without disruption?
  - What is the right sequence to apply the changes?
- Has this been done historically?

## Query

```

begin transaction

update 
  inv_nodes_inv_objects inio
set
  role='secondary'
where exists (
    select 1
    from 
      inv_collections_inv_objects icio
    where
      inio.inv_object_id = icio.inv_object_id
    and 
      icio.inv_collection_id = ?
)

update 
  inv_nodes_inv_objects
set
  role='primary'
where 
  inv_node_id = ?
and exists (
    select 1
    from 
      inv_collections_inv_objects icio
    where
      inio.inv_object_id = icio.inv_object_id
    and 
      icio.inv_collection_id = ?
)
;

commit transaction

```