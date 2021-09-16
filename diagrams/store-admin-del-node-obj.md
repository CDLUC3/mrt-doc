---
title: "Storage Admin: Remove Secondary Object Copy"
description: "Storage Admin: Remove Secondary Object Copy"
prevpage: store-admin-del-obj
nextpage: store-admin-force-audit
chart: store-admin-del-node-obj.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Actions
- call Replic::objectDelete(node, ark)
## For all files in the object

_Check with David how to record an object delete vs a key delete_

```
insert into inv_storage_maints(
    inv_node_id,
	file_removed,
	maint_status,
	s3key,
	note
)
values (
  ?,
  now(),
  'removed',
  ?,
  ?
)
```