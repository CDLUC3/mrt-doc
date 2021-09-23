---
title: "Storage Admin: Force Audit"
description: "Storage Admin: Force Audit of Object Node"
prevpage: store-admin-del-node-obj
nextpage: store-admin-force-replic
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
  verified = null
where
  inv_object_id = (
    select
      id 
    from
      inv_objects
    where
      ark = ?
  ) 
and
  inv_node_id = ?
```