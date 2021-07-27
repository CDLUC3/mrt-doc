---
title: "Storage Admin UI Mockup"
description: "Storage Admin UI Mockup"
nextpage: store-admin-pause-ing-for-coll
---

{% include nav.html %}

# Storage Admin Navigation

## Manage Collection Nodes

### Selector

<fieldset>
<legend>Manage Collection Nodes</legend>
<select>
  <option>Choose Collection</option>
</select>
<button>GO</button>
</fieldset>

### Collection Status
**Status**: Ingest Paused <button title="Make primary is only permitted if ingest is paused for a collection">Unpause</button>

### Action Table

| Role | Node | Node Desc | Repl Status | Actions |
|---------|-----|----------|------|---------|
| primary | 1111 | S3 | n/a | <button>Re-audit</button> |
| secondary | 2222 | SDSC | 100% | <button>Delete Coll from Node</button> <button>Make Primary</button> <button>Re-audit</button> <button>Make UI Primary</button>|
| secondary | 3333 | Wasabi | 92% | <button>Delete Coll from Node</button> <button disabled='Y'>Make Primary</button> <button>Re-audit</button> <button>Make UI Primary</button>|

<button>Add Node</button>


---

## Manage Storage Nodes

### Action Table (Nodes)

|Node | Node Desc |Scan %|Last Scan |Num Delete TBD| Actions |
|---------|-----|---|----------|---------|-------|
| 1111 | S3 | 100%| 2021-05-01 | 0 | <button>Queue Scan</button>|
| 2222 | SDSC | 100%|2021-05-10 | 10 | <button>Queue Scan</button> <button>Review Deletes</button>|
| 3333 | Wasabi | 44%| 2021-06-01 | 0 | <button>Queue Scan</button> |
| 4444 | Glacier | 100%| 2021-07-01 | 0 | <button>Queue Scan</button>|

### Action Table (Review Deletes)

|Node | Node Desc | Ark | Version | File | Size | Date |
|------|------|-----|---|----------|---------|-------|
| 1111 | S3 | ark://13030/mmmm | 1| system/xyz.xml | 1,044 | 2021-05-01 |
| 2222 | SDSC | ark://13030/m2qq | 1| producer/zzz.jpg | 42,044 | 2021-05-01 |

<fieldset>
<legend>Confirm Deletes</legend>

Type `2 Deletes` to procede.

<input/><button>Confirm Delete</button>
</fieldset>
---

## Manage Object Storage

### Selector

<fieldset>
<legend>Manage Object Storage</legend>
<select>
  <option>Search by ark</option>
  <option>Search by localid</option>
  <option>Search by object_id</option>
</select>
<input type="text" value="ark:13030/m5mmmm"/>
<button title="enter a list of arks to process">...</button>
<button>Search</button>
</fieldset>

### Action Table - Object

|Collection|Object Id| Ark | Local Id | Title |Created| Actions |
|---|---------|-----|----------|-------|---------|
|My Coll| 111| ark:/13030/m5mmmmm | doi:1111| My Title |2021-04-04| <button>Delete Obj</button> <button>Trigger Replic</button> <button>Re-audit</button> <button>Nodes</button>|

### Action Table - Object/Node

|Role| Node | Node Desc | Actions |
|---------|-----|----------|---------|
| primary | 1111 | S3 | |
| secondary | 2222 | SDSC | <button>Delete Object from Node</button>|
| secondary | 3333 | Wasabi | <button>Delete Object from Node</button>|
