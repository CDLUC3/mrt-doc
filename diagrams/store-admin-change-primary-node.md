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

## TODO

- Create new inventory method to alter the primary node for an object

## Actions

```
For OBJ in Collection
  Call Inventory::changePrimaryNode(object, node)
```

