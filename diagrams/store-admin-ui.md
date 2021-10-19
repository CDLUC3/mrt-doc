---
title: "Storage Admin UI Mockup"
description: "Storage Admin UI Mockup"
nextpage: store-admin-pause-ing-for-coll
---

{% include nav.html %}

# Proposed Database Changes

[https://github.com/CDLUC3/mrt-doc/issues/827](https://github.com/CDLUC3/mrt-doc/issues/827)

## Task Status

### Completed
- Requeue audit for an object/node
- Requeue replic for an object
- Requeue audit batches in progress (not described below)

### In Progress
- Start Scan
- Show Scan progress
- Cancel Scan
- Review Scan Results
- Scan results: change to Delete, Hold, Note

### Next Steps
- Initiate Deletes (iterate from store admin)
  - Batch Invocation of Node/Key Delete in Replic

### TODO
- Add Secondary Storage Node for a Collection
- Remove Secondary Storage Node for a Collection
  - Batch Invocation of Replication::delete(node, object)
- Pause Ingest for a Collection
- Pause Replication for a Collection
- Change the Primary Node for a Collection
  - Batch Invocation of Inventory::changePrimaryNode(node, object)
- Delete Object
- Delete Object from a Storage Node
- Record Maintenance Node about an Object

### Undetermined
- Change the Primary UI Node for a Collection

# Storage Admin Use Cases

## Use Cases: Manage Collection Nodes

---

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
| primary | 1111 | S3 | n/a |  |
| secondary | 2222 | SDSC | 100% | <button>Delete Coll from Node</button> <button>Make Primary</button> <button>Make UI Primary</button>|
| secondary | 3333 | Wasabi | 92% | <button>Delete Coll from Node</button> <button disabled='Y'>Make Primary</button> <button>Make UI Primary</button>|

<button>Add Node</button>

---
### Use Case: Add Secondary Storage Node for a Collection
- Verify that node is not already in use for the collection
- Add node to inv_collections_inv_nodes
- Batch database update for all objects in the collection:
  - Force re-replication of primary node copy
- Components: Admin

### Use Case: Remove Secondary Storage Node for a Collection
- Prerequistes
  - Pause ingest for the collection (use filesystem)
  - Pause replication for the collection node 
    - set inv_collections.replication_paused = true
- Mark the storage node as decommissioned
  - set inv_collections_inv_nodes.decommissioned = true
- Peform Action:
  - Admin Queue Lambda:
    - Batch invocation of REPLIC endpoint for every object in the collection
      - Replication::delete(node, object)
  - Delete node from inv_collections_inv_nodes
- After completion
  - Manually unpause replication
  - Manually unpause ingest
- Components: Database, Ingest, Replic, Admin, Admin Queue Lambda

### Use Case: Change the Primary Node for a Collection
- Prerequistes Step 1
  - Pause ingest for the collection (use filesystem)
  - Target node must be 100% replicated
  - Pause replication for all nodes in the collection 
    - set inv_collections.replciation_paused = true
- Prerequisites Step 2    
  - Manually Change the primary node for the collection in the ingest profile
- Perform Action
  - Admin Queue Lambda:
    - Batch invocation of INV endpoint for every object in the collection
      - Inventory::changePrimaryNode(node, object)
- After completion
  - Manually unpause replication
  - Manually unpause ingest
- Components: Databse, Inventory, Admin, Admin Queue Lambda

### Use Case: Change the Primary UI Node for a Collection

- This feature is speculative and will not yet be designed
- Components: Databse, UI, Admin

## Use Cases: Scan Storage Nodes

---
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
### Use Case: Initiate the Scan of a Storage Node for Untracked files/keys
- Prerequistes
  - Can a new scan be initiated if there are action items from the prior scan?
- Create scan job (database details tbd)
  - set scan position to 0
- As Replic has spare processing cycles
  - perform scan of block of keys
  - update scan position
  - add deletes as they are found
- Components: Database, Replic, Admin

### Use Case: Review Untracked files/keys for deletion
- Display untracked files/keys to user
- Allow removal of keys from the list
- Allow notes to be added for a key
- Update status to reflect the keys that can be deleted
- Components: Database, Admin

### Use Case: Record user note about an untracked file/key
- Display untracked files/keys to user
- Allow removal of keys
- Allow notes to be added for a key
- Update status to reflect the keys that should have an exception note
- Components: Database, Admin


### Use Case: Delete Untracked files/keys

- Prerequistes
  - Scan has completed
- Notify replic to iterate through the list of keys to be deleted and peform delete
- Components: Database, Replic, Admin

## Use Cases: Manage Object Storage

---

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
|My Coll| 111| ark:/13030/m5mmmmm | doi:1111| My Title |2021-04-04| <button>Delete Obj</button> <button>Trigger Replic</button> <button>Nodes</button>|

### Action Table - Object/Node

|Role| Node | Node Desc | Actions |
|---------|-----|----------|---------|
| primary | 1111 | S3 | |
| secondary | 2222 | SDSC | <button>Delete Object from Node</button> <button>Re-audit</button>|
| secondary | 3333 | Wasabi | <button>Delete Object from Node</button> <button>Re-audit</button>|

---

### Use Case: Delete Object

- Admin notifies the following components about the delete
  - Replic
  - Store
  - Inventory
  - EZID?
- Record the action in the inv_storage_maints table
- Components: Database, Admin

### Use Case: Delete Object from a Storage Node

- Admin notifies replic to remove an object from a node
- Record the action in the inv_storage_maints table
- Components: Database, Admin

### Use Case: Trigger re-audit of an object (Done)
- Force re-audit of node copy of an object
- Components: Admin

### Use Case Trigger re-replication of an object (Done)
- Force re-replication of primary node copy for the object
- Components: Admin

# Admin Queue Lambda:

Purpose: Cycle through database to perform specific actions that require endpoint invocations.  Iteratively perform work until it is complete.

## Design options
  - Capture work in a queue or in the database?

## Tasks

### node_delete_for_collection(node, collection)

Iterate over the following query until no results are found
```
select
  inio.inv_object_is
from
  inv_nodes_inv_objects inio
inner join
  inv_collections_inv_object icio
on
  inio.inv_object_id = icio.inv_object_id
where
  icio.inv_collection_id = ?
and 
  inio.inv_node_id = ?
order by 
  inio.inv_object_id
limit ?
```
### change_primary_node_for_collection(node, collection)

Iterate over the following query until no results are found
```
select
  inio.inv_object_is
from
  inv_nodes_inv_objects inio
inner join
  inv_collections_inv_object icio
on
  inio.inv_object_id = icio.inv_object_id
where
  icio.inv_collection_id = ?
and 
  inio.inv_node_id = ?
and 
  inio.role = 'secondary'
order by 
  inio.inv_object_id
limit ?
```
## Potential Tasks
### storage_scan(node)
```
select
  inv_node_id
from 
  inv_storage_scans
where
  status = 'started'
order by
  modified
limit
  1
```

# Documentation TODOs
- Add online/nearline to node listings
- Distinguish untracked count from delete count
- Incorporate warning messages into UI screens
- Object listing - include the owner (esp for localid query)
- Add note exception button to ui