---
title: "Storage Admin: Reroute UI for Collection/Node"
description: "Storage Admin: Reroute UI for Collection/Node"
prevpage: store-admin-change-primary-node
nextpage: integ-tests
chart: store-admin-reroute-ui.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## TODO

- Review the UI logic for sending requests to storage
- Design a new table to store re-routes
- Consider a mechanism to automatically re-direct from a primary node

## Actions

```
For OBJ in Collection
  Call Inventory::changePrimaryNode(object, node)
```

