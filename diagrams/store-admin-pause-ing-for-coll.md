---
title: "Storage Admin: Pause Ingest and Replication for Collection"
description: "Storage Admin: Pause Ingest and Replication for Collection"
prevpage: store-admin-ui
nextpage: store-admin-add-node
chart: store-admin-pause-ing-for-coll.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Pause Ingest for a Collection

The following file pauses all ingest

```
.../ingest_home/queue/HOLD
```

The following file should be used to pause ingest for a collection

```
.../ingest_home/queue/HOLD.{mnemonic}_content
```

## Pause Replication for a Collection

```
update 
  collection 
set 
  paused = ? 
where 
  ark = ?
```

