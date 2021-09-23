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
and
  role = 'primary'
```

