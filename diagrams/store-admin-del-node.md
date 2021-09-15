---
title: "Storage Admin: Delete Replication Node for Collection"
description: "Storage Admin: Delete Replication Node for Collection"
prevpage: store-admin-add-node
nextpage: store-admin-scan-node
chart: store-admin-del-node.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Delete node for collection

```
delete from
  inv_collections_inv_nodes 
where
  inv_collection_id = ?
and
  inv_node_id = ?
```

## Delete Replicated Objects for Node

TODO: The following replication method is commented out.

```
For OBJ in Collection
  Call Replication::delete(node, object)
    https://github.com/CDLUC3/mrt-replic/blob/master/replication-src/src/main/java/org/cdlib/mrt/replic/basic/app/jersey/replic/JerseyReplication.java#L186-L197
```