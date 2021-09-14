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

## Pause Ingests for Collection

The mechanism for capturing the paused state is TBD.
- Ingest does not access the database
- Should this be set in SSM (as an operational control)?
- Should the state be managed in ZK?

