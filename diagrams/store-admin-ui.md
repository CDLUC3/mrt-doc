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
| primary | 1111 | S3 | `[Re-audit]` |
| secondary | 2222 | SDSC | `[Delete Coll from Node]` `[Make Primary]` `[Re-audit]` |
| secondary | 3333 | Wasabi | `[Delete Coll from Node]` `[Make Primary]` `[Re-audit]` |
`[Add Node]`


---

# Manage Storage Nodes

## Action Table

|Node | Node Desc |Scan %|Last Scan |Num Delete TBD| Actions |
|---------|-----|---|----------|---------|-------|
| 1111 | S3 | 100%| 2021-05-01 | 0 | `[Queue Scan]`|
| 2222 | SDSC | 100%|2021-05-10 | 10 | `[Queue Scan]` `[Review Deletes]` |
| 3333 | Wasabi | 44%| 2021-06-01 | 0 | `[Queue Scan]`|

---

# Manage Object Storage

## Selector
```
<select>
  <option>Search by ark</option>
  <option>Search by localid</option>
  <option>Search by object_id</option>
</select>
<input type="text" value="ark:13030/m5mmmm"/>
<button>Search</button>
```
## Action Tables

|Collection|Object Id| Ark | Local Id | Title | Actions |
|---|---------|-----|----------|-------|---------|
|My Coll| 111| ark:/13030/m5mmmmm | doi:1111| My Title | `[Delete Obj]` `[Trigger Replic]`|


|Role| Node | Node Desc | Actions |
|---------|-----|----------|---------|
| primary | 1111 | S3 | `[Re-audit]`|
| secondary | 2222 | SDSC | `[Delete Object from Node]`|
| secondary | 3333 | Wasabi | `[Delete Object from Node]`|
`[Add Node]`


