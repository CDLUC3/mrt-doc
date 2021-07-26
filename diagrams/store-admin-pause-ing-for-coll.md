---
title: "Storage Admin: Pause Ingest for Collection"
description: "Storage Admin: Pause Ingest for Collection"
prevpage: store-admin-ui
nextpage: store-admin-add-node
chart: store-admin-pause-ing-for-coll.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Puase Ingests for Collection
```
update 
  inv_collections 
set 
  paused = ?
where
  id = ?
```

