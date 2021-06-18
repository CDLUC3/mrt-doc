---
title: "Storage Admin: Add Replication Node for Collection"
description: "Storage Admin: Add Replication Node for Collection"
nextpage: store-admin-ui
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
_Will the replication service determine this automatically, or does it need an api event to trigger this?_

```
insert into inv_nodes_inv_objects...
```