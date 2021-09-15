---
title: "Storage Admin UI Mockup"
description: "Storage Admin UI Mockup"
nextpage: store-admin-pause-ing-for-coll
---

{% include nav.html %}

# Proposed Database Changes

## Manage node level replication for a collection

```
ALTER TABLE inv_collections 
  add replication_paused boolean
```

```
ALTER TABLE inv_collections_inv_nodes 
  add decommissioned boolean
```

## Track deletions and scanning process

```
CREATE TABLE inv_storage_maints (
	id INT(11) NOT NULL AUTO_INCREMENT,
	inv_node_id SMALLINT(5) UNSIGNED NOT NULL,
	keymd5 CHAR(32) NOT NULL COLLATE 'utf8_general_ci',
	size BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
	file_created TIMESTAMP NULL DEFAULT NULL,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	file_removed TIMESTAMP NULL DEFAULT NULL,
	maint_status ENUM(
      'review',
      'hold',
      'delete',
      'removed',
      'objremoved',
      'admin',
      'note',
      'error',
      'unknown'
    ) NOT NULL DEFAULT 'unknown' COLLATE 'utf8_general_ci',
	maint_type ENUM(
      'non-ark',
      'missing-ark',
      'missing-file',
      'unknown'
    ) NOT NULL DEFAULT 'unknown' COLLATE 'utf8_general_ci',
	s3key TEXT(65535) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	note MEDIUMTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',

	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `keymd5_idx` (`inv_node_id`, `keymd5`) USING BTREE,
	INDEX `type_idx` (`maint_type`) USING BTREE,
	INDEX `status_idx` (`maint_status`) USING BTREE,
	CONSTRAINT `inv_scans_ibfk_1` FOREIGN KEY (`inv_node_id`) 
    REFERENCES `inv`.`inv_nodes` (`id`) 
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
;
```

## Track scanning jobs

This is TBD
```
CREATE TABLE inv_storage_scans (
	id INT(11) NOT NULL AUTO_INCREMENT,
	inv_node_id SMALLINT(5) UNSIGNED NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM(
      'started',
      'completed',
      'cancelled',
      'failed'
    ) NOT NULL DEFAULT 'unknown',
  key_count bigint,
  keys_processed bigint,
  last_s3_key TEXT(65535) NOT NULL COLLATE 'utf8mb4_unicode_ci'
)
```

## UI Storage Re-routing

This is TBD
```
CREATE TABLE inv_ui_reroute (

)
```


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
| primary | 1111 | S3 | n/a | <button>Re-audit</button> |
| secondary | 2222 | SDSC | 100% | <button>Delete Coll from Node</button> <button>Make Primary</button> <button>Re-audit</button> <button>Make UI Primary</button>|
| secondary | 3333 | Wasabi | 92% | <button>Delete Coll from Node</button> <button disabled='Y'>Make Primary</button> <button>Re-audit</button> <button>Make UI Primary</button>|

<button>Add Node</button>

---
### Use Case: Add Secondary Storage Node for a Collection
- Verify that node is not already in use for the collection
- Add node to inv_collections_inv_nodes
- Batch database update for all objects in the collection:
  - Force re-replication of primary node copy

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

### Use Case: Change the Primary UI Node for a Collection

- This feature is speculative and will not yet be designed

### Use Case: Re-audit the content for a collection
- Batch database update for all objects in the collection:
  - Force re-audit of node copy

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

### Use Case: Review Untracked files/keys
- Display untracked files/keys to user
- Allow removal of keys
- Allow notes to be added for a key
- Update status to reflect the keys that can be deleted

### Use Case: Record user note about an untracked file/key

- This is TBD

### Use Case: Delete Untracked files/keys

- Prerequistes
  - Scan has completed
- Notify replic to iterate through the list of keys to be deleted and peform delete

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
|My Coll| 111| ark:/13030/m5mmmmm | doi:1111| My Title |2021-04-04| <button>Delete Obj</button> <button>Trigger Replic</button> <button>Re-audit</button> <button>Nodes</button>|

### Action Table - Object/Node

|Role| Node | Node Desc | Actions |
|---------|-----|----------|---------|
| primary | 1111 | S3 | |
| secondary | 2222 | SDSC | <button>Delete Object from Node</button>|
| secondary | 3333 | Wasabi | <button>Delete Object from Node</button>|

---

### Use Case: Delete Object

- TBD enumerate the steps from the existing perl script
- Record the action in the inv_storage_maints table

### Use Case: Delete Object from a Storage Node

- TBD
### Use Case: Trigger re-audit of an object
- Force re-audit of node copy of an object

### Use Case Trigger re-replication of an object
- Force re-replication of primary node copy for the object

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
- Document that the filesystem will be used pause ingest at a collection level
- Incorporate warning messages into UI screens
- For audit/replic database queries, note the nde being updated
- Change ui primary details
- Object listing - include the owner (esp for localid query)
- Add note exception button to ui