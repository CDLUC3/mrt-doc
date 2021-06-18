---
title: "Storage Admin UI Mockup"
description: "Storage Admin UI Mockup"
nextpage: store-admin-add-node
chart: store-admin-ui.mmd
---

{% include mermaid.html %}
{% include start.html %}
{% include end.html %}
## Storage Admin Navigation

# Manage Collection Nodes

## Selector

<select>
  <option>Choose Collection</option>
</select>
<button>GO</button>

## Action Table

|Role| Node | Node Desc | Actions |
|---------|-----|----------|---------|
| primary | 1111 | S3 | <button>Re-audit</button>|
| secondary | 2222 | SDSC | <button>Delete Coll from Node</button><button>Make Primary</button><button>Re-audit</button>|
| secondary | 3333 | Wasabi | <button>Delete Coll from Node</button><button>Make Primary</button><button>Re-audit</button>|
<button>Add Node</button>


---

# Manage Storage Nodes

## Action Table

|Node | Node Desc |Scan %|Last Scan |Num Delete TBD| Actions |
|---------|-----|---|----------|---------|-------|
| 1111 | S3 | 100%| 2021-05-01 | 0 | <button>Queue Scan</button>|
| 2222 | SDSC | 100%|2021-05-10 | 10 | <button>Queue Scan</button><button>Review Deletes</button> |
| 3333 | Wasabi | 44%| 2021-06-01 | 0 | <button>Queue Scan</button>|

---

# Manage Object Storage

## Selector

<select>
  <option>Search by ark</option>
  <option>Search by localid</option>
  <option>Search by object_id</option>
</select>
<input type="text" value="ark:13030/m5mmmm"/>
<button>Search</button>

## Action Tables

|Collection|Object Id| Ark | Local Id | Title | Actions |
|---|---------|-----|----------|-------|---------|
|My Coll| 111| ark:/13030/m5mmmmm | doi:1111| My Title | <button>Delete Obj</button><button>Trigger Replic</button>|


|Role| Node | Node Desc | Actions |
|---------|-----|----------|---------|
| primary | 1111 | S3 | <button>Re-audit</button>|
| secondary | 2222 | SDSC | <button>Delete Object from Node</button>|
| secondary | 3333 | Wasabi | <button>Delete Object from Node</button>|
<button>Add Node</button>


