---
title: "Storage Admin: Remove Object from Storage and Inventory"
description: "Storage Admin: Remove Object from Storage and Inventory"
prevpage: store-admin-del-node-keys
nextpage: store-admin-del-node-obj
chart: store-admin-del-obj.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}

## Actions
- For each secondary
  - call Replic::objectDelete(node, ark)
- For primary
  - call Storage::objectDelete(node, ark)
- Inventory::objectDelete(ark)
- Inventory::localIdDelete(owner, localid)

## For each copy of all files in the object

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